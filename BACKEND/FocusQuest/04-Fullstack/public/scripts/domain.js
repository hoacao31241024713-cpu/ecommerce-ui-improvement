import {dayOf, shiftDay, slots, DAY} from './seed.js';
import {analytics, measures} from './stats.js';

export class RequestError extends Error {
  constructor(status,code,message) {
    super(message);
    Object.assign(this,{status,code});
  }
}
export const fail = (message,status=400,code='INVALID_INPUT') => { throw new RequestError(status,code,message); };
const uid = () => globalThis.crypto.randomUUID();
const statuses = ['todo','progress','completed'];
const priorities = ['low','medium','high','urgent'];
const normalize = value => value.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu,'').replace(/đ/g,'d');
const text = (value,max,optional=false) => {
  if (typeof value!=='string' || value.trim().length>max || (!optional && !value.trim())) fail('Nội dung không hợp lệ.');
  return value.trim();
};
const choice = (value,options) => options.includes(value)?value:fail('Lựa chọn không hợp lệ.');
const number = (value,min,max,integer=true) => {
  if (typeof value!=='number' || !Number.isFinite(value) || value<min || value>max || (integer && !Number.isInteger(value))) fail('Giá trị số nằm ngoài giới hạn.');
  return value;
};
const date = value => {
  if (typeof value!=='string' || !/^\d{4}-\d{2}-\d{2}$/.test(value) || !Number.isFinite(Date.parse(value)) || new Date(value).toISOString().slice(0,10)!==value) fail('Ngày không hợp lệ.');
  return value;
};
const find = (list,id) => list.find(row=>row.id===id) ?? fail('Không tìm thấy dữ liệu.',404,'NOT_FOUND');
const conflict = message => fail(message,409,'CONFLICT');
const active = db => db.focus_sessions.find(row=>['running','paused'].includes(row.status)) ?? null;
const links = (db,id) => db.focus_session_tasks.filter(row=>row.session_id===id).sort((a,b)=>a.position-b.position);
const localDay = (db,time) => dayOf(time,db.settings[0].timezone);

function reward(db,key,type,source,xp,coins,now) {
  if (db.reward_transactions.some(row=>row.event_key===key)) return;
  db.reward_transactions.push({id:uid(),user_id:1,event_key:key,source_type:type,source_id:String(source),xp_delta:xp,coin_delta:coins,created_at:now});
}
function unlock(db,now) {
  const snapshot = measures(db,now);
  for (const item of db.achievements) {
    if (snapshot[item.condition_type]>=item.condition_value && !db.user_achievements.some(row=>row.achievement_id===item.id)) {
      db.user_achievements.push({id:uid(),user_id:1,achievement_id:item.id,unlocked_at:now});
    }
  }
}
function setStatus(db,task,status,now) {
  if (task.status===status) return;
  const wasComplete = task.status==='completed';
  task.status=status;
  task.updated_at=now;
  if (status==='completed' || wasComplete) {
    const done = status==='completed';
    task.completed_at=done?now:null;
    const version = db.reward_transactions.filter(row=>row.source_type==='task' && row.source_id===task.id).length+1;
    reward(db,'task:'+task.id+':'+version,'task',task.id,done?10:-10,done?5:-5,now);
    const current = active(db);
    if (current?.phase==='focus') {
      const link=links(db,current.id).find(row=>row.task_id===task.id);
      if (link && (!done || current.status==='running')) {
        link.completed_in_session=done?1:0;
        link.completed_at=done?now:null;
      }
    }
    if (done && measures(db,now).daily>=3) {
      const today=localDay(db,now);
      reward(db,'daily:'+today,'daily',today,50,30,now);
    }
  }
}
function taskInput(db,body,base) {
  const result={};
  if ('title' in body || !base) result.title=text(body.title,160);
  if ('description' in body || !base) result.description=text(body.description??'',4000,true);
  if ('priority' in body || !base) result.priority=choice(body.priority??'medium',priorities);
  if ('due_date' in body || !base) result.due_date=date(body.due_date);
  if ('estimated_minutes' in body || !base) result.estimated_minutes=body.estimated_minutes==null?null:number(body.estimated_minutes,0,1440);
  if ('category_id' in body || !base) result.category_id=body.category_id?find(db.categories,body.category_id).id:null;
  return result;
}
function addSubtask(db,id,title,now) {
  const row={id:uid(),task_id:id,title:text(title,160),is_completed:0,created_at:now,updated_at:now};
  db.subtasks.push(row);
  return row;
}
function queryTasks(db,q,now) {
  const today=localDay(db,now);
  const scope=q.scope??'all';
  choice(scope,['all','today','overdue','upcoming','completed','archive']);
  const search=normalize(q.search??'');
  const rows=db.tasks.filter(row=>{
    if ((row.deleted_at!==null)!==(scope==='archive')) return false;
    if (scope==='today' && row.due_date!==today) return false;
    if (scope==='overdue' && (row.due_date>=today || row.status==='completed')) return false;
    if (scope==='upcoming' && row.due_date<=today) return false;
    if (scope==='completed' && row.status!=='completed') return false;
    return (!search || normalize(row.title+' '+row.description).includes(search))
      && (!q.date || row.due_date===q.date) && (!q.priority || row.priority===q.priority)
      && (!q.status || row.status===q.status) && (!q.category || row.category_id===q.category);
  });
  const sorts={deadline:(a,b)=>a.due_date.localeCompare(b.due_date),priority:(a,b)=>priorities.indexOf(b.priority)-priorities.indexOf(a.priority),
    created:(a,b)=>b.created_at-a.created_at,alphabetical:(a,b)=>a.title.localeCompare(b.title,'vi'),
    duration:(a,b)=>(a.estimated_minutes??Infinity)-(b.estimated_minutes??Infinity)};
  const sort=choice(q.sort??'deadline',Object.keys(sorts));
  return rows.sort(sorts[sort]).map(row=>({...row,subtasks:db.subtasks.filter(sub=>sub.task_id===row.id)}));
}

function sessionDetails(db,row) {
  if (!row) return null;
  const transactions=db.reward_transactions.filter(tx=>tx.source_id===row.id && ['focus','checklist'].includes(tx.source_type));
  return {...row,tasks:links(db,row.id),distractions:db.distractions.filter(item=>item.session_id===row.id),
    xp:transactions.reduce((sum,tx)=>sum+tx.xp_delta,0),coins:transactions.reduce((sum,tx)=>sum+tx.coin_delta,0)};
}
function finish(db,row,status,now) {
  if (!['running','paused'].includes(row.status)) return;
  if (row.status==='running') row.actual_duration=Math.min(row.planned_duration,row.planned_duration-Math.max(0,row.deadline-now));
  if (row.status==='paused') row.paused_duration+=now-row.paused_at;
  Object.assign(row,{status,ended_at:now,deadline:null,paused_at:null});
  if (row.phase!=='focus' || status!=='completed') return;
  reward(db,'focus:'+row.id,'focus',row.id,row.focus_minutes,Math.floor(row.focus_minutes*.6),now);
  const plan=links(db,row.id);
  if (plan.length && plan.every(link=>link.completed_in_session)) reward(db,'checklist:'+row.id,'checklist',row.id,30,20,now);
  if (measures(db,now).streak>=7) reward(db,'streak:7','streak','7',100,50,now);
}
function start(db, body, now) {
  if (active(db)) conflict('Bạn đang có một phiên hoạt động.');
  const settings=db.settings[0];
  const focus_minutes=number(body.focus_minutes??settings.focus_duration,1,180);
  const break_minutes=number(body.break_minutes??settings.short_break_duration,0,60);
  const rounds=number(body.rounds??1,1,12);
  const phase=choice(body.phase??'focus',['focus','short','long']);
  let current_round=1;
  const parent=body.parent_id ? find(db.focus_sessions,body.parent_id) : null;
  if (parent) {
    if (['running','paused','cancelled'].includes(parent.status)) conflict('Phiên trước chưa kết thúc.');
    if (db.focus_sessions.some(row=>row.parent_id===parent.id)) conflict('Phiên tiếp theo đã được tạo.');
    if (phase!=='focus' && parent.phase!=='focus') conflict('Hãy bắt đầu một phiên tập trung trước khi nghỉ tiếp.');
    current_round=phase==='focus'?(parent.current_round%rounds)+1:parent.current_round;
    if (current_round>rounds) fail('Vòng Pomodoro không hợp lệ.');
  } else if (phase!=='focus') {
    conflict('Hãy kết thúc một phiên tập trung trước khi nghỉ.');
  }
  const ids=body.task_ids??[];
  if (!Array.isArray(ids) || ids.length>100 || new Set(ids).size!==ids.length || (phase!=='focus' && ids.length)) fail('Danh sách công việc không hợp lệ.');
  const plan=ids.map(id=>find(db.tasks,id));
  if (plan.some(row=>row.deleted_at!==null || row.status==='completed')) conflict('Kế hoạch có công việc đã hoàn thành hoặc lưu trữ.');
  const workload=plan.reduce((sum,row)=>sum+(row.estimated_minutes??0),0);
  if (workload>focus_minutes && body.confirm_overload!==true) conflict('Khối lượng dự kiến vượt thời lượng phiên.');
  if (phase==='short' && break_minutes===0) fail('Thời lượng nghỉ phải lớn hơn 0.');
  const duration=(phase==='focus'?focus_minutes:phase==='long'?settings.long_break_duration:break_minutes)*60000;
  const row={id:uid(),user_id:1,phase,status:'running',planned_duration:duration,actual_duration:0,started_at:now,ended_at:null,
    deadline:now+duration,paused_at:null,paused_duration:0,current_round,rounds,focus_minutes,break_minutes,parent_id:parent?.id??null,is_sample:0};
  db.focus_sessions.push(row);
  for (const [position,task] of plan.entries()) {
    db.focus_session_tasks.push({id:uid(),session_id:row.id,task_id:task.id,title_at_start:task.title,
      category_at_start:db.categories.find(item=>item.id===task.category_id)?.name??'',position,completed_in_session:0,completed_at:null});
  }
  return row;
}
export function reconcile(db,now) {
  const row=active(db);
  if (row?.status==='running' && now>=row.deadline) {
    const end=row.deadline;
    finish(db,row,'completed',end);
    unlock(db,end);
    if (row.phase==='focus' && db.settings[0].auto_start_break && row.break_minutes && now-end<60000) {
      start(db,{phase:row.current_round===row.rounds && row.rounds>1?'long':'short',parent_id:row.id,focus_minutes:row.focus_minutes,
        break_minutes:row.break_minutes,rounds:row.rounds},now);
    }
  }
}

function handleTasks(db,method,path,body,q,now) {
  const [,id,action]=path;
  if (!id && method==='GET') return queryTasks(db,q,now);
  if (!id && method==='POST') {
    const draft=taskInput(db,{due_date:localDay(db,now),...body});
    const row={id:uid(),user_id:1,...draft,status:'todo',completed_at:null,deleted_at:null,created_at:now,updated_at:now};
    db.tasks.push(row);
    if ('subtasks' in body) {
      if (!Array.isArray(body.subtasks) || body.subtasks.length>50) fail('Danh sách việc nhỏ không hợp lệ.');
      body.subtasks.forEach(title=>addSubtask(db,row.id,title,now));
    }
    if ('status' in body) setStatus(db,row,choice(body.status,statuses),now);
    return row;
  }
  if (!id) return;
  const row=find(db.tasks,id);
  if (!action && method==='GET') return {...row,subtasks:db.subtasks.filter(sub=>sub.task_id===id)};
  if (action==='restore' && method==='POST') {
    row.deleted_at=null;
    row.updated_at=now;
    return row;
  }
  if (!action && method==='DELETE') {
    row.deleted_at??=now;
    row.updated_at=now;
    return row;
  }
  if (row.deleted_at!==null) conflict('Công việc đã lưu trữ.');
  if (!action && method==='PATCH') {
    Object.assign(row,taskInput(db,body,row),{updated_at:now});
    if ('status' in body) setStatus(db,row,choice(body.status,statuses),now);
    if ('subtasks' in body) {
      if (!Array.isArray(body.subtasks) || body.subtasks.length>50) fail('Danh sách việc nhỏ không hợp lệ.');
      const previous=db.subtasks.filter(sub=>sub.task_id===id);
      const next=body.subtasks.map(item=>typeof item==='string'?addSubtask(db,id,item,now):Object.assign(find(previous,item?.id),{
        title:text(item.title,160),is_completed:number(item.is_completed,0,1),updated_at:now}));
      db.subtasks=db.subtasks.filter(sub=>sub.task_id!==id || next.includes(sub));
    }
    return row;
  }
  if (action==='subtasks' && method==='POST') return addSubtask(db,id,body.title,now);
}

function handleFocus(db,method,path,body,now) {
  const [,group,id,action,taskId]=path;
  if (group==='active' && method==='GET') return sessionDetails(db,active(db));
  if (group!=='sessions') return;
  if (!id && method==='GET') return [...db.focus_sessions].sort((a,b)=>b.started_at-a.started_at).map(row=>sessionDetails(db,row));
  if (!id && method==='POST') return sessionDetails(db,start(db,body,now));
  if (!id) return;
  const row=find(db.focus_sessions,id);
  if (!action && method==='GET') return sessionDetails(db,row);
  if (method==='POST' && action==='pause') {
    if (row.status!=='running') conflict('Phiên không đang chạy.');
    row.actual_duration=row.planned_duration-(row.deadline-now);
    Object.assign(row,{status:'paused',paused_at:now,deadline:null});
  } else if (method==='POST' && action==='resume') {
    if (row.status!=='paused') conflict('Phiên không đang tạm dừng.');
    Object.assign(row,{status:'running',deadline:now+row.planned_duration-row.actual_duration,paused_duration:row.paused_duration+now-row.paused_at,paused_at:null});
  } else if (method==='POST' && action==='complete') {
    if (row.status!=='completed') conflict('Phiên chưa hết giờ hoặc đã kết thúc sớm.');
  } else if (method==='POST' && ['end','cancel'].includes(action)) {
    finish(db,row,action==='cancel'?'cancelled':'ended_early',now);
  } else if (method==='PATCH' && action==='tasks') {
    if (row.status!=='running' || row.phase!=='focus') conflict('Checklist chỉ thay đổi trong phiên tập trung đang chạy.');
    const link=links(db,id).find(item=>item.task_id===taskId)??fail('Công việc không có trong kế hoạch.',404,'NOT_FOUND');
    const task=find(db.tasks,link.task_id);
    if (task.deleted_at!==null) conflict('Công việc đã lưu trữ.');
    if (typeof body.completed!=='boolean') fail('Trạng thái checklist không hợp lệ.');
    if (body.completed && task.status==='completed' && !link.completed_in_session) conflict('Công việc đã hoàn thành ngoài thời gian tập trung.');
    setStatus(db,task,body.completed?'completed':'todo',now);
  } else if (method==='POST' && action==='distractions') {
    if (row.status!=='running' || row.phase!=='focus') conflict('Phiên tập trung không đang chạy.');
    db.distractions.push({id:uid(),session_id:id,note:text(body.note,240),created_at:now});
  } else return;
  return sessionDetails(db,row);
}

export function dispatch(db,method,path,body={},query={},now=Date.now()) {
  if (!body || typeof body!=='object' || Array.isArray(body)) fail('Yêu cầu phải chứa một đối tượng JSON.');
  const parts=path.replace(/^\/?api\//,'').split('/').filter(Boolean);
  const [group,id,action]=parts;
  let data;
  if (group==='tasks') data=handleTasks(db,method,parts,body,query,now);
  if (group==='focus') data=handleFocus(db,method,parts,body,now);
  if (group==='subtasks' && id && ['PATCH','DELETE'].includes(method)) {
    const row=find(db.subtasks,id);
    if (find(db.tasks,row.task_id).deleted_at!==null) conflict('Công việc đã lưu trữ.');
    if (method==='DELETE') db.subtasks=db.subtasks.filter(sub=>sub!==row);
    else {
      if ('title' in body) row.title=text(body.title,160);
      if ('is_completed' in body) row.is_completed=number(body.is_completed,0,1);
      row.updated_at=now;
    }
    data=row;
  }
  if (group==='categories') {
    if (method==='GET' && !id) data=db.categories;
    if ((method==='POST' && !id) || (method==='PATCH' && id)) {
      const row=id?find(db.categories,id):{id:uid(),user_id:1,created_at:now};
      const name=text(body.name??row.name,40);
      const color=body.color??row.color??'#a394f8';
      if (typeof color!=='string' || !/^#[0-9a-f]{6}$/i.test(color)) fail('Màu không hợp lệ.');
      if (db.categories.some(item=>item!==row && normalize(item.name)===normalize(name))) conflict('Danh mục đã tồn tại.');
      data=Object.assign(row,{name,color});
      if (!id) db.categories.push(row);
    }
    if (method==='DELETE' && id) {
      data=find(db.categories,id);
      db.categories=db.categories.filter(item=>item!==data);
      db.tasks.filter(task=>task.category_id===id).forEach(task=>{task.category_id=null;});
    }
  }
  if (group==='analytics' && method==='GET') {
    const today=localDay(db,now);
    if (['overview','focus','tasks'].includes(id)) {
      const from=query.from===undefined?shiftDay(today,-6):date(query.from);
      const to=query.to===undefined?today:date(query.to);
      if (from>to || Date.parse(to)-Date.parse(from)>365*DAY) fail('Khoảng thống kê phải có tối đa 366 ngày.');
      data=analytics(db,from,to,now);
    }
  }
  if (group==='rewards' && method==='GET') data={...measures(db,now),transactions:[...db.reward_transactions].sort((a,b)=>b.created_at-a.created_at)};
  if (group==='shop' && id==='items' && method==='GET') {
    data=db.shop_items.filter(item=>item.is_active).map(item=>({...item,owned:db.inventory.some(row=>row.item_id===item.id)}));
  }
  if (group==='shop' && id==='purchase' && method==='POST') {
    const item=find(db.shop_items,body.item_id);
    const summary=measures(db,now);
    if (!item.is_active || db.inventory.some(row=>row.item_id===item.id)) conflict('Vật phẩm không còn khả dụng hoặc đã sở hữu.');
    if (summary.level<item.required_level || summary.coins<item.price) conflict('Chưa đủ cấp độ hoặc Coins.');
    data={id:uid(),user_id:1,item_id:item.id,is_placed:0,position_x:0,position_y:0,rotation:0,placement_slot:null,purchased_at:now};
    db.inventory.push(data);
    reward(db,'purchase:'+item.id,'purchase',item.id,0,-item.price,now);
  }
  if (group==='inventory' && method==='GET' && !id) data=db.inventory;
  if (group==='inventory' && method==='PATCH' && id) {
    const row=find(db.inventory,id);
    const slot=body.placement_slot;
    if (slot!==null && !Object.hasOwn(slots,slot)) fail('Vị trí không hợp lệ.');
    if (slot && db.inventory.some(item=>item!==row && item.placement_slot===slot)) conflict('Vị trí đã có vật phẩm.');
    const [x,y]=slot?slots[slot]:[0,0];
    data=Object.assign(row,{is_placed:slot?1:0,placement_slot:slot,position_x:x,position_y:y,rotation:choice(body.rotation??row.rotation,[0,90,180,270])});
  }
  if (group==='achievements' && method==='GET') {
    const summary=measures(db,now);
    data=db.achievements.map(row=>({...row,progress:summary[row.condition_type],unlocked_at:db.user_achievements.find(item=>item.achievement_id===row.id)?.unlocked_at??null}));
  }
  if (group==='profile' && ['GET','PATCH'].includes(method)) {
    data=db.user_profile[0];
    if (method==='PATCH') {
      if ('display_name' in body) data.display_name=text(body.display_name,60);
      if ('avatar' in body) data.avatar=text(body.avatar,4,true);
      data.updated_at=now;
    }
  }
  if (group==='settings' && ['GET','PATCH'].includes(method)) {
    data=db.settings[0];
    if (method==='PATCH') {
      const choices={language:['vi','en'],theme:['light','dark'],sound:['off','rain','white'],background:['room','quiet']};
      for (const [key,options] of Object.entries(choices)) if (key in body) data[key]=choice(body[key],options);
      const limits={focus_duration:[1,180],short_break_duration:[1,60],long_break_duration:[1,60],sound_volume:[0,1,false],auto_start_break:[0,1]};
      for (const [key,limit] of Object.entries(limits)) if (key in body) data[key]=number(body[key],...limit);
      if ('timezone' in body) {
        const zone=text(body.timezone,80);
        try { dayOf(now,zone); } catch { fail('Múi giờ không hợp lệ.'); }
        data.timezone=zone;
      }
    }
  }
  if (group==='export' && method==='GET') data={exported_at:new Date(now).toISOString(),tasks:db.tasks,subtasks:db.subtasks,focus_sessions:db.focus_sessions,focus_session_tasks:db.focus_session_tasks};
  if (group==='health' && method==='GET') data={status:'ok'};
  if (data===undefined || (action && !['tasks','focus'].includes(group))) fail('Không tìm thấy API.',404,'NOT_FOUND');
  if (method!=='GET') unlock(db,now);
  return data;
}

export function initialize(db,now) { unlock(db,now); }
