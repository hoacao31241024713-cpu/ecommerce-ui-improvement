import {DAY, dayOf, shiftDay} from './seed.js';

export function streak(days, today) {
  let end = days.has(today) ? today : shiftDay(today, -1);
  let count = 0;
  while (days.has(end)) {
    count++;
    end = shiftDay(end, -1);
  }
  return count;
}

export function measures(db, now) {
  const zone = db.settings[0].timezone;
  const today = dayOf(now,zone);
  const complete = db.focus_sessions.filter(row=>row.phase==='focus' && row.status==='completed');
  const days = new Set(complete.map(row=>dayOf(row.ended_at,zone)));
  const monday = shiftDay(today,-((new Date(today+'T12:00:00Z').getUTCDay()+6)%7));
  const productive = new Set(db.focus_session_tasks.filter(row=>row.completed_in_session).map(row=>row.session_id));
  const ledger = db.reward_transactions;
  const xp = Math.max(0,ledger.reduce((sum,row)=>sum+row.xp_delta,0));
  const coins = ledger.reduce((sum,row)=>sum+row.coin_delta,0);
  return {today,xp,coins,level:Math.floor(xp/100)+1,progress:xp%100,streak:streak(days,today),
    daily:db.tasks.filter(row=>!row.deleted_at && row.completed_at!==null && dayOf(row.completed_at,zone)===today).length,
    tasks:db.tasks.filter(row=>row.status==='completed' && !row.deleted_at).length,focus:complete.length,
    minutes:Math.floor(complete.reduce((sum,row)=>sum+row.actual_duration,0)/60000),
    placed:db.inventory.filter(row=>row.is_placed).length,purchases:ledger.filter(row=>row.source_type==='purchase').length,
    productive:complete.filter(row=>productive.has(row.id) && dayOf(row.ended_at,zone)>=monday && dayOf(row.ended_at,zone)<=today).length};
}

export function analytics(db, from, to, now) {
  const zone = db.settings[0].timezone;
  const summary = measures(db,now);
  const inRange = day => day>=from && day<=to;
  const tasks = db.tasks.filter(row=>!row.deleted_at && inRange(row.due_date));
  const distribution = Object.fromEntries(['todo','progress','completed'].map(status=>[status,tasks.filter(row=>row.status===status && (status!=='completed' || dayOf(row.completed_at,zone)<=to)).length]));
  distribution.todo += tasks.length - Object.values(distribution).reduce((sum,count)=>sum+count,0);
  const count = Math.round((Date.parse(to)-Date.parse(from))/DAY)+1;
  const days = Array.from({length:count},(_,i)=>({day:shiftDay(from,i),minutes:0,completed:0,sessions:0}));
  const dayIndex = new Map(days.map(row=>[row.day,row]));
  for (const task of db.tasks) {
    if (task.deleted_at || task.completed_at===null) continue;
    const day = dayIndex.get(dayOf(task.completed_at,zone));
    if (day) day.completed++;
  }
  const sessions = db.focus_sessions.filter(row=>row.phase==='focus' && ['completed','ended_early'].includes(row.status) && inRange(dayOf(row.ended_at,zone)));
  let planned = 0;
  let checked = 0;
  const categories = new Map();
  for (const row of sessions) {
    const day = dayIndex.get(dayOf(row.ended_at,zone));
    day.minutes += row.actual_duration/60000;
    if (row.status==='completed') day.sessions++;
    const links = db.focus_session_tasks.filter(link=>link.session_id===row.id);
    planned += links.length;
    checked += links.filter(link=>link.completed_in_session).length;
    const names = links.length ? links.map(link=>link.category_at_start) : [''];
    for (const name of names) categories.set(name,(categories.get(name)||0)+row.actual_duration/60000/names.length);
  }
  const ledger = db.reward_transactions.filter(row=>inRange(dayOf(row.created_at,zone)));
  const minutes = days.reduce((sum,row)=>sum+row.minutes,0);
  return {from,to,days,distribution,categories:[...categories].map(([name,minutes])=>({name,minutes})),sessions,
    tasks:tasks.length,completed:distribution.completed,completion:tasks.length?Math.round(100*distribution.completed/tasks.length):0,
    minutes,completed_sessions:sessions.filter(row=>row.status==='completed').length,average:sessions.length?minutes/sessions.length:0,
    checklist:planned?Math.round(100*checked/planned):0,streak:summary.streak,productive:summary.productive,
    xp:ledger.reduce((sum,row)=>sum+Math.max(0,row.xp_delta),0),coins:ledger.reduce((sum,row)=>sum+Math.max(0,row.coin_delta),0)};
}
