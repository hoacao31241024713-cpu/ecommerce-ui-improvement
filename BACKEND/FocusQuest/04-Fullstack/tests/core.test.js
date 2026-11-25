import assert from 'node:assert/strict';
import {test} from 'node:test';
import {once} from 'node:events';
import {mkdtemp,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {createApp} from '../server/server.js';
import {dayOf} from '../public/scripts/seed.js';

async function start(database,clock) {
  const {app,db}=createApp({database,clock});
  const server=app.listen(0,'127.0.0.1');
  await once(server,'listening');
  const base='http://127.0.0.1:'+server.address().port;
  return {
    db,base,
    async request(path,method='GET',body,expected=200) {
      const res=await fetch(base+'/api'+path,{method,headers:body?{'Content-Type':'application/json'}:undefined,body:JSON.stringify(body)});
      const result=await res.json();
      assert.equal(res.status,expected,JSON.stringify(result));
      assert.equal(result.success,expected<400);
      return result.data;
    },
    async close() {
      await new Promise((resolve,reject)=>server.close(error=>error?reject(error):resolve()));
      db.close();
    }
  };
}

test('Express, CRUD, tìm kiếm/lọc, thống kê và dữ liệu SQLite sau khởi động lại',async t=>{
  const dir=await mkdtemp(join(tmpdir(),'focusquest-test-'));
  const database=join(dir,'test.sqlite');
  const now=Date.UTC(2026,10,25,4);
  const today=dayOf(now,'Asia/Ho_Chi_Minh');
  let api;
  t.after(async()=>{
    if (api) await api.close();
    await rm(dir,{force:true,recursive:true});
  });
  api=await start(database,()=>now);
  assert.deepEqual(await api.request('/health'),{status:'ok'});
  const html=await (await fetch(api.base)).text();
  assert.match(html,/data-mode="api"/);
  assert.equal(api.db.sql.prepare('PRAGMA foreign_keys').get().foreign_keys,1);
  await api.request('/tasks','POST',{title:'   '},400);
  const task=await api.request('/tasks','POST',{title:'Đọc tài liệu thử nghiệm',priority:'high',due_date:today,estimated_minutes:0},201);
  const matches=await api.request('/tasks?scope=today&search=DOC+TAI+LIEU+THU&priority=high&status=todo');
  assert.deepEqual(matches.map(row=>row.id),[task.id]);
  assert.equal(matches[0].estimated_minutes,0);
  const path='/tasks/'+task.id;
  await api.request(path,'PATCH',{title:'Báo cáo kiểm thử'});
  assert.equal((await api.request(path)).title,'Báo cáo kiểm thử');
  const range='/analytics/overview?from='+today+'&to='+today;
  const before=await api.request(range);
  await api.request(path,'PATCH',{status:'completed'});
  assert.equal((await api.request(range)).completed,before.completed+1);
  await api.request(path,'DELETE');
  assert.ok((await api.request('/tasks?scope=archive')).some(row=>row.id===task.id));
  await api.request(path+'/restore','POST');
  assert.equal(api.db.sql.prepare('SELECT title FROM tasks WHERE id=?').get(task.id).title,'Báo cáo kiểm thử');
  await api.close();
  api=null;
  api=await start(database,()=>now);
  assert.equal((await api.request(path)).status,'completed');
  assert.equal(api.db.sql.prepare('SELECT COUNT(*) AS n FROM categories').get().n,4);
});

test('Pomodoro, checklist, pausa, khôi phục và thưởng một lần',async t=>{
  const dir=await mkdtemp(join(tmpdir(),'focusquest-timer-'));
  const database=join(dir,'timer.sqlite');
  let now=Date.UTC(2026,10,25,4);
  let api;
  t.after(async()=>{
    if (api) await api.close();
    await rm(dir,{force:true,recursive:true});
  });
  api=await start(database,()=>now);
  const a=await api.request('/tasks','POST',{title:'Việc A',estimated_minutes:10},201);
  const b=await api.request('/tasks','POST',{title:'Việc B',estimated_minutes:20},201);
  const settings={focus_minutes:25,break_minutes:5,task_ids:[a.id,b.id]};
  await api.request('/focus/sessions','POST',settings,409);
  const session=await api.request('/focus/sessions','POST',{...settings,confirm_overload:true},201);
  const path='/focus/sessions/'+session.id;
  await api.request('/focus/sessions','POST',{},409);
  await api.request(path+'/complete','POST',undefined,409);
  now+=12000;
  await api.request(path+'/tasks/'+a.id,'PATCH',{completed:true});
  assert.equal((await api.request('/tasks/'+a.id)).status,'completed');
  await api.request(path+'/pause','POST');
  now+=110000;
  await api.close();
  api=null;
  api=await start(database,()=>now);
  const paused=await api.request('/focus/active');
  assert.equal(paused.status,'paused');
  assert.equal(paused.actual_duration,12000);
  const resumed=await api.request(path+'/resume','POST');
  assert.equal(resumed.deadline-now,25*60000-12000);
  now=resumed.deadline+1000;
  assert.equal(await api.request('/focus/active'),null);
  const summary=await api.request(path+'/complete','POST');
  assert.equal(summary.actual_duration,25*60000);
  assert.equal(summary.xp,25);
  assert.equal(summary.coins,15);
  assert.deepEqual(summary.tasks.map(row=>row.completed_in_session),[1,0]);
  assert.equal((await api.request('/tasks/'+b.id)).status,'todo');
  assert.deepEqual(await api.request(path+'/complete','POST'),summary);
  const rest=await api.request('/focus/sessions','POST',{phase:'short',parent_id:session.id,break_minutes:5},201);
  assert.equal(rest.planned_duration,300000);
  assert.equal((await api.request('/focus/sessions/'+rest.id+'/end','POST')).status,'ended_early');
  const next=await api.request('/focus/sessions','POST',{focus_minutes:1},201);
  now+=9000;
  const early=await api.request('/focus/sessions/'+next.id+'/end','POST');
  assert.equal(early.actual_duration,9000);
  assert.equal(early.xp,0);
});
