import {phaseLabels,sessionLabels} from './locale.js';
import {esc,icon,empty,progress} from './ui.js';
import {state,heading,section,field,select,button,iconButton,link,minuteLabel,timeLabel} from './state.js';

export const isLive=row=>row && ['running','paused'].includes(row.status);
export function plan() {
  return state.focusPlan??={minutes:state.settings.focus_duration,breakMinutes:state.settings.short_break_duration,ids:[]};
}
export function remaining(session) {
  return Math.max(0,session.status==='paused'?session.planned_duration-session.actual_duration:session.deadline-Date.now());
}
export function timerText(time) {
  const seconds=Math.ceil(time/1000);
  return String(Math.floor(seconds/60)).padStart(2,'0')+':'+String(seconds%60).padStart(2,'0');
}
export function paintTimer() {
  const session=state.active;
  if (!session) {
    document.title='FocusQuest';
    return;
  }
  const left=remaining(session);
  const display=timerText(left);
  const value=document.querySelector('#timer-value');
  const stroke=document.querySelector('#timer-progress');
  if (value && value.textContent!==display) value.textContent=display;
  if (stroke) stroke.setAttribute('stroke-dashoffset',String(100-left/session.planned_duration*100));
  document.title=display+' · FocusQuest';
}
function stage(time,caption,controls='') {
  return '<section class="card focus-stage scenic"><div class="meta">'+esc(caption)+'</div>'+
    '<div class="timer-ring"><svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="45"/>'+
    '<circle id="timer-progress" cx="50" cy="50" r="45" pathLength="100" stroke-dasharray="100"/></svg>'+
    '<span id="timer-value" class="timer-value" aria-label="Thời gian còn lại">'+esc(time)+'</span></div>'+
    (controls?'<div class="actions focus-controls">'+controls+'</div>':'')+'</section>';
}
function planner() {
  const draft=plan();
  const openTasks=state.tasks.filter(task=>task.status!=='completed');
  const selected=openTasks.filter(task=>draft.ids.includes(task.id));
  const workload=selected.reduce((sum,row)=>sum+(row.estimated_minutes??0),0);
  const unknown=selected.filter(task=>task.estimated_minutes===null).length;
  const validMinutes=Number.isInteger(draft.minutes) && draft.minutes>=1 && draft.minutes<=180;
  return stage(timerText(validMinutes?draft.minutes*60000:0),'Phiên tập trung kế tiếp')+
    '<section class="card">'+section('Lập kế hoạch tập trung')+
    '<form class="form-stack" id="focus-plan"><p class="meta" id="focus-selection">'+(selected.length?selected.length+' công việc đã chọn':'Tập trung tự do')+
    '</p><div class="tabs">'+[[25,5],[50,10],[90,0]].map(([minutes,breakMinutes])=>
      button(minutes+'/'+breakMinutes,'focus-preset',draft.minutes===minutes&&draft.breakMinutes===breakMinutes?'selected':'subtle','',
        'data-minutes="'+minutes+'" data-break="'+breakMinutes+'"')).join('')+'</div>'+
    '<div class="form-grid">'+field('Tập trung (phút)','<input name="minutes" type="number" required min="1" max="180" value="'+
      esc(Number.isFinite(draft.minutes)?draft.minutes:'')+'">')+field('Nghỉ (phút)','<input name="breakMinutes" type="number" required min="0" max="60" value="'+
      esc(Number.isFinite(draft.breakMinutes)?draft.breakMinutes:'')+'">')+'</div>'+
    '<fieldset><legend>Công việc trong phiên</legend><div class="focus-task-picker">'+(openTasks.length?openTasks.map(task=>
      '<label class="focus-row"><input type="checkbox" name="task" value="'+esc(task.id)+'" '+(draft.ids.includes(task.id)?'checked':'')+
      '><span>'+esc(task.title)+'</span><small class="muted">'+esc(task.estimated_minutes===null?'Chưa ước lượng':minuteLabel(task.estimated_minutes))+'</small></label>').join(''):
      '<p class="meta">Bạn có thể bắt đầu một phiên tập trung tự do.</p>')+'</div></fieldset>'+
    '<p class="meta" id="focus-workload">Tổng dự kiến '+minuteLabel(workload)+(unknown?' · '+unknown+' việc chưa ước lượng':'')+'</p>'+
    '<label id="focus-overload" class="focus-row warning" '+(validMinutes&&workload>draft.minutes?'':'hidden')+
      '><input name="confirm_overload" type="checkbox" '+(validMinutes&&workload>draft.minutes?'required':'')+
      '><span>Vượt '+minuteLabel(workload-draft.minutes)+'. Tôi vẫn muốn bắt đầu.</span></label>'+
    '<div class="actions"><button type="submit" class="btn primary">'+icon('play',16)+' Bắt đầu</button>'+
    button('Thêm công việc','add','subtle','plus')+'</div></form></section>';
}
function activeView(row) {
  const focus=row.phase==='focus';
  const checked=row.tasks.filter(task=>task.completed_in_session).length;
  const controls=button(row.status==='paused'?'Tiếp tục':'Tạm dừng',row.status==='paused'?'resume-focus':'pause-focus','primary',
    row.status==='paused'?'play':'pause')+button('Kết thúc sớm','end-focus')+
    iconButton('Toàn màn hình','fullscreen','expand');
  const checklist=row.tasks.map(task=>{
    const item=state.tasks.find(item=>item.id===task.task_id);
    const blocked=row.status!=='running'||!item||(item.status==='completed'&&!task.completed_in_session);
    return '<label class="focus-row"><input type="checkbox" data-focus-check="'+esc(task.task_id)+'" '+(task.completed_in_session?'checked':'')+
      (blocked?' disabled':'')+'><span>'+esc(task.title_at_start)+'</span></label>';
  }).join('');
  return stage(timerText(remaining(row)),phaseLabels[row.phase][0]+' · '+sessionLabels[row.status][0],controls)+
    '<section class="card">'+(focus?section('Công việc trong phiên',checked+' / '+row.tasks.length+' hoàn thành')+
      (row.tasks.length?progress(100*checked/row.tasks.length,'Tiến độ checklist')+checklist:
        empty('Tập trung tự do','Phiên này không có checklist.','target')):
      section('Đang nghỉ','Khi sẵn sàng, quay lại lập kế hoạch cho phiên mới.'))+'</section>';
}
export function reviewPage(row,{history=false}={}) {
  const done=row.tasks.filter(task=>task.completed_in_session).length;
  const used=state.sessions.some(session=>session.parent_id===row.id);
  const canBreak=!row.is_sample&&!used&&!state.active&&row.break_minutes>0&&row.status!=='cancelled';
  return heading('Tổng kết phiên',sessionLabels[row.status][0]+' · '+timeLabel(row.ended_at??row.started_at),
    history?button('Quay về lịch sử','back-history'):link('Lịch sử','history'))+
    '<div class="two-grid"><section class="card">'+section('Kết quả tập trung')+
    [['Thời lượng kế hoạch',minuteLabel(row.planned_duration/60000)],['Thời gian thực tế',minuteLabel(row.actual_duration/60000)],
      ['Công việc hoàn thành',done+' / '+row.tasks.length],['Tỷ lệ checklist',(row.tasks.length?Math.round(done/row.tasks.length*100):0)+'%'],
      ['Phần thưởng','+'+row.xp+' XP · +'+row.coins+' Coins']].map(([title,value])=>
      '<div class="history-row"><span>'+title+'</span><strong>'+esc(value)+'</strong></div>').join('')+'</section>'+
    '<section class="card">'+section('Công việc đã lên kế hoạch')+
    (row.tasks.length?row.tasks.map(task=>'<div class="history-row"><span>'+esc(task.title_at_start)+'</span><small class="muted">'+
      (task.completed_in_session?'Hoàn thành':'Chưa xong')+'</small></div>').join(''):empty('Phiên tập trung tự do','','target'))+
    '<div class="actions">'+(canBreak?button('Nghỉ '+minuteLabel(row.break_minutes),'start-break','primary','coffee','data-id="'+esc(row.id)+'"'):'')+
    button('Lập phiên mới','new-focus','subtle','timer','data-id="'+esc(row.id)+'"')+'</div></section></div>';
}
export function focusPage() {
  const review=state.sessions.find(row=>row.id===state.reviewId);
  if (!state.active&&review?.phase==='focus'&&!isLive(review)) return reviewPage(review);
  return heading('Phòng tập trung','Chọn công việc, đặt thời lượng, rồi bắt đầu.',link('Lịch sử','history'))+
    '<div class="focus-grid">'+(state.active?activeView(state.active):planner())+'</div>';
}
export function historyPage() {
  const rows=state.sessions.filter(row=>row.phase==='focus'&&!isLive(row));
  return heading('Lịch sử tập trung','Thời lượng thực tế và kết quả của từng phiên.',link('Phòng tập trung','focus','primary','timer'))+
    '<section class="card history-list">'+(rows.length?rows.map(row=>'<div class="history-row"><div><h3>'+esc(timeLabel(row.started_at))+
    '</h3><p class="meta">'+esc(sessionLabels[row.status][0]+' · '+minuteLabel(row.actual_duration/60000)+(row.is_sample?' · Dữ liệu mẫu':''))+
    '</p></div>'+button('Tổng kết','view-review','subtle','','data-id="'+esc(row.id)+'"')+'</div>').join(''):
    empty('Chưa có phiên tập trung','Bắt đầu một phiên để xem lịch sử.','history'))+'</section>';
}
