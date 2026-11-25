import {request} from './api.js';
import {shiftDay} from './seed.js';
import {statusLabels,priorityLabels} from './locale.js';
import {esc,icon,empty} from './ui.js';
import {state,t,localDate,dayLabel,minuteLabel,field,select,button,iconButton,heading,section,categoryName} from './state.js';

const pairs=labels=>Object.entries(labels).map(([key,label])=>[key,t(...label)]);
const statuses=()=>pairs(statusLabels);
const priorities=()=>pairs(priorityLabels);
const choices=()=>state.categories.map(category=>[category.id,categoryName(category)]);
const scopes=()=>[['all',t('Tất cả','All')],['today',t('Hôm nay','Today')],['overdue',t('Quá hạn','Overdue')],
  ['upcoming',t('Sắp tới','Upcoming')],['completed',t('Hoàn thành','Completed')],['archive',t('Lưu trữ','Archive')]];
const add=(extra='')=>button(t('Thêm công việc','Add task'),'add','primary','plus',extra);
let listRequest=0;
const list=(rows,params={})=>rows.length?rows.map(row=>taskRow(row,params)).join(''):empty(t('Không có công việc','No tasks'),t('Thử đổi bộ lọc hoặc tạo công việc mới.','Change your filters or create a task.'));
export function taskRow(task,{compact=false,board=false}={}) {
  const category=state.categories.find(row=>row.id===task.category_id);
  const id='data-id="'+esc(task.id)+'"';
  const completed=task.status==='completed';
  const overdue=task.due_date<localDate()&&!completed;
  const count=task.subtasks?.length??0;
  return '<div class="task-row '+task.status+'" '+(board?'draggable="true" '+id:'')+'>'+
    (task.deleted_at?icon('archive',18):'<button type="button" class="complete-toggle" data-action="toggle-task" '+id+' aria-label="'+
    esc(completed?t('Bỏ hoàn thành','Reopen task'):t('Đánh dấu hoàn thành','Complete task'))+'" aria-pressed="'+completed+'">'+(completed?icon('check',14):'')+'</button>')+
    '<div class="task-body"><button type="button" class="task-title" data-action="edit-task" '+id+' '+(task.deleted_at?'disabled':'')+'>'+esc(task.title)+'</button>'+
    '<div class="tags">'+(category?'<span class="badge"><span class="dot" style="--dot:'+esc(category.color)+'"></span>'+esc(categoryName(category))+'</span>':'')+
    (count?'<span class="badge">'+icon('list',13)+' '+task.subtasks.filter(row=>row.is_completed).length+'/'+count+'</span>':'')+
    (!compact?'<span class="badge '+(overdue?'overdue':'')+'">'+icon('calendar',13)+esc(dayLabel(task.due_date))+'</span>':'')+
    (!compact && task.estimated_minutes!==null?'<span class="badge">'+icon('timer',13)+esc(minuteLabel(task.estimated_minutes))+'</span>':'')+'</div></div>'+
    '<span class="badge priority-'+task.priority+'">'+esc(t(...priorityLabels[task.priority]))+'</span>'+
    (task.deleted_at?button(t('Khôi phục','Restore'),'restore-task','subtle','history',id):
      compact?'':board?select('status',statuses(),task.status,'data-board-status '+id+' aria-label="'+t('Trạng thái','Status')+'"'):
        iconButton(t('Lưu trữ công việc','Archive task'),'archive-task','archive',id))+'</div>';
}
export async function updateTaskList() {
  const version=++listRequest;
  const result=document.querySelector('#task-results');
  const scope=state.page==='today'?'today':state.scope;
  const rows=await request('/tasks','GET',undefined,{...state.query,scope});
  if (version!==listRequest || !result?.isConnected) return;
  result.innerHTML=list(rows);
  const count=document.querySelector('#task-result-count');
  if (count) count.textContent=rows.length+' '+t('công việc','tasks');
}
export function tasksPage() {
  const today=state.page==='today';
  const q=state.query;
  return heading(today?t('Hôm nay','Today'):t('Tất cả công việc','All tasks'),
    today?dayLabel(localDate(),{weekday:'long',day:'numeric',month:'long'}):t('Tìm kiếm, sắp xếp và quản lý công việc của bạn.','Search, sort and manage your tasks.'),add())+
    '<section class="card">'+(!today?'<div class="tabs">'+scopes().map(([scope,label])=>button(label,'task-scope',scope===state.scope?'selected':'subtle','',
      'data-scope="'+scope+'" aria-pressed="'+(scope===state.scope)+'"')).join('')+'</div>':'')+
    '<form class="filters" id="task-filters">'+field(t('Tìm kiếm','Search'),icon('search',18)+'<input type="search" name="search" value="'+esc(q.search??'')+
      '" placeholder="'+t('Tên hoặc mô tả công việc','Task name or description')+'">','search')+
    field(t('Trạng thái','Status'),select('status',[['',t('Mọi trạng thái','Any status')],...statuses()],q.status??''))+
    field(t('Ưu tiên','Priority'),select('priority',[['',t('Mọi mức','Any priority')],...priorities()],q.priority??''))+
    field(t('Danh mục','Category'),select('category',[['',t('Mọi danh mục','Any category')],...choices()],q.category??''))+
    (!today?field(t('Ngày','Date'),'<input type="date" name="date" value="'+esc(q.date??'')+'">'):'')+
    field(t('Sắp xếp','Sort'),select('sort',[['deadline',t('Ngày thực hiện','Due date')],['priority',t('Ưu tiên','Priority')],
      ['created',t('Mới tạo','Newest')],['alphabetical','A–Z'],['duration',t('Thời lượng','Duration')]],q.sort??'deadline'))+'</form>'+
    '<span class="meta" id="task-result-count" aria-live="polite"></span><div id="task-results"><p class="loading">'+t('Đang tải…','Loading…')+'</p></div></section>';
}
export function kanbanPage() {
  return heading(t('Bảng Kanban','Kanban'),t('Kéo công việc sang cột khác hoặc dùng ô trạng thái.','Drag tasks to another column or use the status menu.'),add())+
  '<div class="kanban">'+statuses().map(([status,label])=>{
    const rows=state.tasks.filter(row=>row.status===status);
    return '<section class="card kanban-col" data-drop="'+status+'">'+section(label,String(rows.length))+list(rows,{board:true})+'</section>';
  }).join('')+'</div>';
}
export function calendarPage() {
  const day=state.calendarDay??localDate();
  const month=state.calendarMonth??day.slice(0,7);
  const first=month+'-01';
  const offset=(new Date(first+'T12:00:00Z').getUTCDay()+6)%7;
  const labels=t('T2,T3,T4,T5,T6,T7,CN','Mon,Tue,Wed,Thu,Fri,Sat,Sun').split(',');
  const days=Array.from({length:42},(_,index)=>shiftDay(first,index-offset));
  const dateRows=state.tasks.filter(task=>task.due_date===day);
  return heading(t('Lịch','Calendar'),t('Xem công việc theo ngày thực hiện.','View tasks by due date.'))+
    '<div class="dashboard-grid"><section class="card">'+section(dayLabel(first,{month:'long',year:'numeric'}),'',
      '<div class="row-actions">'+iconButton(t('Tháng trước','Previous month'),'month-prev','left')+
      button(t('Hôm nay','Today'),'calendar-today')+iconButton(t('Tháng sau','Next month'),'month-next','right')+'</div>')+
    '<div class="calendar">'+labels.map(label=>'<span>'+label+'</span>').join('')+days.map(date=>{
      const rows=state.tasks.filter(task=>task.due_date===date);
      const late=rows.some(task=>task.status!=='completed'&&date<localDate());
      const desc=dayLabel(date,{day:'numeric',month:'long',year:'numeric'})+(rows.length?', '+rows.length+' '+t('công việc','tasks'):'')+
        (late?', '+t('có công việc quá hạn','includes overdue tasks'):'');
      return '<button type="button" data-action="calendar-day" data-date="'+date+'" aria-pressed="'+(day===date)+'" aria-label="'+esc(desc)+'" class="'+
        (date.slice(0,7)!==month?'other-month':'')+'"><span>'+Number(date.slice(-2))+'</span>'+(rows.length?'<small class="'+(late?'overdue':'')+'">'+rows.length+(late?' !':'')+'</small>':'')+'</button>';
    }).join('')+'</div></section><section class="card">'+section(dayLabel(day,{day:'numeric',month:'long'}),'',add('data-date="'+day+'"'))+
    list(dateRows)+'</section></div>';
}
export function changeMonth(offset) {
  const date=new Date((state.calendarMonth??(state.calendarDay??localDate()).slice(0,7))+'-01T12:00:00Z');
  date.setUTCMonth(date.getUTCMonth()+offset);
  state.calendarMonth=date.toISOString().slice(0,7);
  state.calendarDay=state.calendarMonth+'-01';
}
export const subtaskInput=(row={})=>'<div class="subtask-input" data-sub="'+esc(row.id??'')+'"><input type="checkbox" '+(row.is_completed?'checked':'')+
  ' aria-label="'+t('Hoàn thành việc nhỏ','Complete subtask')+'"><input maxlength="160" value="'+esc(row.title??'')+
  '" aria-label="'+t('Tên việc nhỏ','Subtask name')+'"><button type="button" class="icon-btn" data-dialog-action="remove-sub" aria-label="'+
  t('Xóa việc nhỏ','Remove subtask')+'">'+icon('x',16)+'</button></div>';
export function taskForm(task,date) {
  return '<div class="form-grid">'+field(t('Tiêu đề','Title'),'<input name="title" required maxlength="160" autofocus value="'+esc(task?.title)+'">','wide')+
    field(t('Mô tả','Description'),'<textarea name="description" rows="3" maxlength="4000">'+esc(task?.description)+'</textarea>','wide')+
    field(t('Ngày thực hiện','Due date'),'<input name="due_date" type="date" required value="'+esc(task?.due_date??date??localDate())+'">')+
    field(t('Thời lượng dự kiến (phút)','Estimated duration (minutes)'),'<input name="estimated_minutes" type="number" min="0" max="1440" value="'+esc(task?.estimated_minutes)+'">')+
    field(t('Danh mục','Category'),select('category_id',[['',t('Chưa phân loại','Uncategorized')],...choices()],task?.category_id??''))+
    field(t('Ưu tiên','Priority'),select('priority',priorities(),task?.priority??'medium'))+
    field(t('Trạng thái','Status'),select('status',statuses(),task?.status??'todo'))+
    '<fieldset class="wide"><legend>'+t('Việc nhỏ','Subtasks')+'</legend><div id="subtask-fields">'+(task?.subtasks??[]).map(subtaskInput).join('')+
    '</div><div><button type="button" class="btn subtle" data-dialog-action="add-sub">'+icon('plus',15)+t('Thêm việc nhỏ','Add subtask')+'</button></div></fieldset></div>';
}
export function taskPayload(form,editing) {
  const data=Object.fromEntries(new FormData(form));
  const subtasks=Array.from(form.querySelectorAll('[data-sub]')).map(row=>{
    const title=row.querySelector('input[maxlength]').value.trim();
    return editing&&row.dataset.sub?{id:row.dataset.sub,title,is_completed:Number(row.querySelector('input[type=checkbox]').checked)}:title;
  }).filter(row=>typeof row==='string'?row:row.title);
  return {...data,category_id:data.category_id||null,estimated_minutes:data.estimated_minutes===''?null:Number(data.estimated_minutes),subtasks};
}
