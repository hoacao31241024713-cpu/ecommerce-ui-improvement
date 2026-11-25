import {DatabaseSync} from 'node:sqlite';
import {mkdirSync,readFileSync} from 'node:fs';
import {dirname,resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {seed} from '../public/scripts/seed.js';
import {dispatch,initialize,reconcile} from '../public/scripts/domain.js';

const schema = readFileSync(new URL('../../03-Database/schema.sql',import.meta.url),'utf8');
export const defaultDatabase = fileURLToPath(new URL('../data/focusquest.sqlite',import.meta.url));
const tables = ['user_profile','settings','categories','tasks','subtasks','focus_sessions','focus_session_tasks','distractions',
  'shop_items','inventory','reward_transactions','achievements','user_achievements'];

export function openDatabase(path=process.env.DB_PATH||defaultDatabase,clock=Date.now) {
  if (path!==':memory:') mkdirSync(dirname(resolve(path)),{recursive:true});
  const sql=new DatabaseSync(path);
  sql.exec('PRAGMA foreign_keys=ON; PRAGMA busy_timeout=5000; PRAGMA journal_mode=WAL;');
  const version=sql.prepare('PRAGMA user_version').get().user_version;
  if (version>1) {
    sql.close();
    throw new Error('Phiên bản SQLite mới hơn ứng dụng.');
  }
  const upserts=new Map();
  const load=()=>Object.fromEntries(tables.map(table=>[table,sql.prepare('SELECT * FROM '+table+' ORDER BY rowid').all()]));
  function sync(previous,next) {
    // Apply removals in FK order, then persist changed rows in parent-first order.
    for (const table of [...tables].reverse()) {
      const ids=new Set(next[table].map(row=>row.id));
      for (const row of previous[table]??[]) if (!ids.has(row.id)) sql.prepare('DELETE FROM '+table+' WHERE id=?').run(row.id);
    }
    for (const table of tables) {
      const before=new Map((previous[table]??[]).map(row=>[row.id,row]));
      for (const row of next[table]) {
        if (before.has(row.id) && Object.keys(row).every(key=>row[key]===before.get(row.id)[key])) continue;
        if (!upserts.has(table)) {
          const columns=Object.keys(row);
          const update=columns.filter(key=>key!=='id').map(key=>key+'=excluded.'+key);
          upserts.set(table,{columns,statement:sql.prepare('INSERT INTO '+table+' ('+columns.join(',')+') VALUES ('+
            columns.map(()=>'?').join(',')+') ON CONFLICT(id) DO UPDATE SET '+update.join(','))});
        }
        const {columns,statement}=upserts.get(table);
        statement.run(...columns.map(key=>row[key]));
      }
    }
  }
  function transaction(work) {
    sql.exec('BEGIN IMMEDIATE');
    try {
      const result=work();
      sql.exec('COMMIT');
      return result;
    } catch (error) {
      sql.exec('ROLLBACK');
      throw error;
    }
  }
  transaction(()=>{
    if (!version) sql.exec(schema);
    if (!sql.prepare('SELECT id FROM user_profile WHERE id=1').get()) {
      const now=clock();
      const sample=seed(now);
      initialize(sample,now);
      sync({},sample);
    }
  });
  return {
    sql,
    execute(method,path,body,query) {
      const now=clock();
      const transition=transaction(()=>{
        const previous=load();
        const next=structuredClone(previous);
        reconcile(next,now);
        let data;
        try { data=dispatch(next,method,path,body,query,now); }
        catch (error) {
          const recovered=structuredClone(previous);
          reconcile(recovered,now);
          sync(previous,recovered);
          return {error};
        }
        sync(previous,next);
        return {data};
      });
      if (transition.error) throw transition.error;
      return transition.data;
    },
    close:()=>sql.close(),
    reset() {
      transaction(()=>{
        for (const table of [...tables].reverse()) sql.exec('DELETE FROM '+table);
        const now=clock();
        const sample=seed(now);
        initialize(sample,now);
        sync({},sample);
      });
    }
  };
}

if (process.argv[1] && resolve(process.argv[1])===fileURLToPath(import.meta.url)) {
  const reset=process.argv.includes('--reset');
  if (reset && !process.argv.includes('--confirm')) {
    console.error('Lệnh sẽ xóa dữ liệu hiện tại. Xác nhận bằng npm run db:reset -- --confirm');
    process.exitCode=1;
  } else {
    const db=openDatabase();
    if (reset) db.reset();
    db.close();
    console.log(process.env.DB_PATH||defaultDatabase);
  }
}
