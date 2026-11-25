import {request} from './api.js';
import {state,refreshBase,toast,button,iconButton,heading,field,minuteLabel} from './state.js';
import {icon,esc} from './ui.js';
import {navigation} from './locale.js';
import {tasksPage,updateTaskList,taskForm,taskPayload,subtaskInput} from './tasks-ui.js';
import {overviewPage,analyticsPage,dashboardData,drawCharts} from './dashboard.js';
import {focusPage,historyPage,reviewPage,plan,remaining,timerText,paintTimer,isLive} from './focus-ui.js';
import {roomPage,shopPage} from './room-ui.js';

const main=document.querySelector('#content');
const dialog=document.querySelector('#dialog');
const sidebar=document.querySelector('#sidebar');
const topbar=document.querySelector('#topbar');
const shell=document.querySelector('.shell');
const backdrop=document.querySelector('#backdrop');
const pages=new Set(['overview','today','tasks','analytics','settings','focus','history','room','shop']);
let renderVersion=0;
let busy=false;
let drawerFocus;
let expiryCheckAfter=0;

function currentPage() {
  const page=location.hash.slice(1);
  return pages.has(page)?page:'overview';
}
function drawer(open) {
  shell.classList.toggle('drawer',open);
  backdrop.hidden=!open;
  const trigger=topbar.querySelector('[data-action="menu"]');
  trigger?.setAttribute('aria-expanded',String(open));
  if (open) {
    drawerFocus=trigger;
    sidebar.querySelector('[aria-current]')?.focus();
  } else if (drawerFocus) {
    drawerFocus.focus();
    drawerFocus=null;
  }
}
function chrome() {
  const groups=navigation.map(([label,items])=>[label,items.filter(([id])=>pages.has(id))]).filter(([,items])=>items.length);
  const current=groups.flatMap(([,items])=>items).find(([id])=>id===state.page);
  sidebar.innerHTML='<a class="brand" href="#overview" aria-label="FocusQuest"><img src="./assets/mark.svg" alt=""><span>FocusQuest</span></a>'+
    '<nav aria-label="Điều hướng chính">'+groups.map(([[label],items])=>'<div class="nav-group"><p class="nav-label">'+label+'</p>'+
    items.map(([id,glyph,name])=>'<a class="nav-link" href="#'+id+'" aria-label="'+name+'" title="'+name+'" '+
      (id===state.page?'aria-current="page"':'')+'>'+icon(glyph,17)+'<span>'+name+'</span></a>').join('')+'</div>').join('')+'</nav>';
  const initials=state.profile.display_name.split(/\s+/).slice(-2).map(part=>part[0]??'').join('').toUpperCase();
  topbar.innerHTML='<div class="top-left">'+iconButton('Mở điều hướng','menu','menu','aria-controls="sidebar" aria-expanded="'+shell.classList.contains('drawer')+'"')+
    iconButton('Thu gọn hoặc mở thanh bên','rail','panel')+'<span class="crumb"><span class="crumb-root">FocusQuest / </span>'+current[2]+'</span></div>'+
    '<div class="actions"><span class="top-stat level purple">'+icon('bolt',16)+' Cấp '+state.rewards.level+'</span><span class="top-stat gold" title="Focus Coins">'+
    icon('coin',16)+' '+state.rewards.coins+'</span><span class="divider"></span><button class="btn primary" type="button" data-action="add" title="Thêm công việc (N)" aria-label="Thêm công việc">'+
    icon('plus',16)+'<span class="quick-label">Thêm nhanh</span></button>'+iconButton('Đổi giao diện sáng hoặc tối','theme',state.settings.theme==='dark'?'sun':'moon')+
    '<a href="#settings" class="avatar" aria-label="Hồ sơ">'+esc(initials)+'</a></div>';
  topbar.querySelector('[data-action="menu"]').classList.add('mobile-menu');
  topbar.querySelector('[data-action="rail"]').classList.add('rail-toggle');
}
function settingsPage() {
  return heading('Cài đặt','Cập nhật hồ sơ và giao diện của bạn.')+
    '<section class="card settings-form"><form id="settings-form" class="form-stack">'+field('Tên hiển thị','<input name="display_name" maxlength="60" required value="'+
    esc(state.profile.display_name)+'">')+field('Múi giờ','<input name="timezone" maxlength="80" required value="'+esc(state.settings.timezone)+'">')+
    '<div><button class="btn primary" type="submit">Lưu cài đặt</button></div></form></section>';
}
async function render({focus=false}={}) {
  const version=++renderVersion;
  for (const chart of state.charts.splice(0)) chart.destroy();
  const page=state.page=currentPage();
  chrome();
  main.setAttribute('aria-busy','true');
  try {
    if (page==='overview'||page==='analytics') {
      const data=await dashboardData(page);
      if (version!==renderVersion) return;
      main.innerHTML=page==='overview'?overviewPage(data):analyticsPage(data);
      drawCharts(page,data);
    } else if (page==='settings') main.innerHTML=settingsPage();
    else if (page==='focus') main.innerHTML=focusPage();
    else if (page==='history') {
      const row=state.sessions.find(item=>item.id===state.historyReview);
      main.innerHTML=row?reviewPage(row,{history:true}):historyPage();
    }
    else if (page==='room') main.innerHTML=roomPage();
    else if (page==='shop') main.innerHTML=shopPage();
    else {
      main.innerHTML=tasksPage();
      await updateTaskList();
    }
    if (focus && version===renderVersion) main.focus();
    if (version===renderVersion) paintTimer();
  } catch (error) {
    if (version!==renderVersion) return;
    main.innerHTML=heading('Không thể tải trang',error.message)+button('Thử lại','retry','primary');
  } finally {
    if (version===renderVersion) main.setAttribute('aria-busy','false');
  }
}
async function reload() {
  const active=state.active;
  await refreshBase();
  if (active && state.active?.id!==active.id) {
    const result=state.sessions.find(row=>row.id===active.id);
    if (result?.phase==='focus' && !isLive(result)) state.reviewId=result.id;
    if (result?.phase!=='focus' && !state.active) toast('Phiên nghỉ đã kết thúc.');
  }
  await render();
}
function openDialog(title,body,onSubmit,confirmLabel='Lưu',danger=false) {
  dialog.innerHTML='<div class="dialog-head"><h2 id="dialog-title">'+esc(title)+'</h2><button type="button" class="icon-btn" data-dialog-action="close" aria-label="Đóng">'+
    icon('x',18)+'</button></div><form class="form-stack">'+body+'<p class="form-error" role="alert" hidden></p><div class="dialog-footer">'+
    '<button type="button" class="btn subtle" data-dialog-action="close">Hủy</button><button class="btn '+(danger?'danger':'primary')+'" type="submit">'+
    esc(confirmLabel)+'</button></div></form>';
  dialog.querySelector('form').onsubmit=async event=>{
    event.preventDefault();
    const submit=dialog.querySelector('[type="submit"]');
    const error=dialog.querySelector('.form-error');
    submit.disabled=true;
    error.hidden=true;
    try {
      await onSubmit(event.currentTarget);
      dialog.close();
      await reload();
    } catch (failure) {
      if (dialog.open) {
        error.textContent=failure.message;
        error.hidden=false;
      } else toast(failure.message,true);
    } finally {submit.disabled=false;}
  };
  dialog.showModal();
}
function openTask(task,date) {
  openDialog(task?'Sửa công việc':'Thêm công việc',taskForm(task,date),async form=>{
    const saved=await request(task?'/tasks/'+task.id:'/tasks',task?'PATCH':'POST',taskPayload(form,Boolean(task)));
    if (!task && state.page==='focus' && !state.active && saved.status!=='completed') plan().ids.push(saved.id);
    toast(task?'Đã lưu công việc.':'Đã thêm công việc.');
  });
}
async function runAction(target) {
  const {action,id}=target.dataset;
  if (!action) return;
  if (action==='menu') return drawer(!shell.classList.contains('drawer'));
  if (action==='rail') {
    shell.classList.toggle('rail-small');
    localStorage.setItem('focusquest-rail',String(shell.classList.contains('rail-small')));
    return;
  }
  if (action==='add') return openTask(null,target.dataset.date);
  if (action==='edit-task') return openTask(await request('/tasks/'+id));
  if (action==='archive-task') {
    const task=state.tasks.find(row=>row.id===id);
    return openDialog('Lưu trữ công việc','<p>Ẩn “'+esc(task?.title)+'” khỏi danh sách hiện tại. Bạn có thể khôi phục trong mục Lưu trữ.</p>',
      async()=>{await request('/tasks/'+id,'DELETE');toast('Đã lưu trữ công việc.');},'Lưu trữ',true);
  }
  if (action==='task-scope') {
    state.scope=target.dataset.scope;
    return render();
  }
  if (action==='focus-preset') {
    Object.assign(plan(),{minutes:Number(target.dataset.minutes),breakMinutes:Number(target.dataset.break)});
    return render();
  }
  if (action==='view-review') {
    state.historyReview=id;
    return render();
  }
  if (action==='back-history') {
    state.historyReview=null;
    return render();
  }
  if (action==='new-focus') {
    const row=state.sessions.find(item=>item.id===id);
    const tasks=new Set(state.tasks.filter(task=>task.status!=='completed').map(task=>task.id));
    state.focusPlan={minutes:row?.focus_minutes??state.settings.focus_duration,breakMinutes:row?.break_minutes??state.settings.short_break_duration,
      ids:row?.tasks.filter(task=>!task.completed_in_session&&tasks.has(task.task_id)).map(task=>task.task_id)??[]};
    state.reviewId=null;
    state.historyReview=null;
    if (state.page==='focus') return render();
    location.hash='focus';
    return;
  }
  if (action==='end-focus' && state.active) {
    const row=state.active;
    return openDialog('Kết thúc phiên','<p>Thời gian đã tập trung sẽ được lưu. Phiên kết thúc sớm không nhận thưởng hoàn thành phiên.</p>',
      ()=>request('/focus/sessions/'+row.id+'/end','POST'),'Kết thúc',true);
  }
  if (action==='fullscreen') {
    if (document.fullscreenElement) await document.exitFullscreen();
    else await main.requestFullscreen();
    return;
  }
  if (action==='room-item') {
    for (const input of main.querySelectorAll('[data-placement]')) if (input.dataset.placement===id) input.focus();
    return;
  }
  if (action==='buy') {
    const item=state.shop.find(row=>row.id===id);
    if (!item) return;
    return openDialog('Mua vật phẩm','<p>Dùng <strong>'+item.price+' Coins</strong> để mua '+esc(item.name)+'.</p>',async()=>{
      await request('/shop/purchase','POST',{item_id:id});
      toast('Đã thêm vật phẩm vào kho đồ.');
    },'Mua');
  }
  if (action==='export') {
    const data=await request('/export');
    const url=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:'application/json'}));
    const anchor=Object.assign(document.createElement('a'),{href:url,download:'focusquest-export.json'});
    anchor.click();
    setTimeout(()=>URL.revokeObjectURL(url),1000);
    return;
  }
  if (busy) return;
  busy=true;
  try {
    if (action==='retry') await initialize();
    if (action==='theme') await request('/settings','PATCH',{theme:state.settings.theme==='dark'?'light':'dark'});
    if (action==='restore-task') {
      await request('/tasks/'+id+'/restore','POST');
      toast('Đã khôi phục công việc.');
    }
    if (action==='toggle-task') {
      const task=state.tasks.find(row=>row.id===id);
      await request('/tasks/'+id,'PATCH',{status:task?.status==='completed'?'todo':'completed'});
      toast(task?.status==='completed'?'Đã mở lại công việc.':'Đã hoàn thành công việc.');
    }
    if (['pause-focus','resume-focus'].includes(action) && state.active) {
      await request('/focus/sessions/'+state.active.id+'/'+(action==='pause-focus'?'pause':'resume'),'POST');
    }
    if (action==='start-break') {
      const row=state.sessions.find(item=>item.id===id);
      if (!row) return;
      await request('/focus/sessions','POST',{phase:'short',parent_id:row.id,focus_minutes:row.focus_minutes,break_minutes:row.break_minutes});
      state.reviewId=null;
      state.historyReview=null;
      if (state.page!=='focus') {
        await refreshBase();
        location.hash='focus';
        return;
      }
    }
    if (['theme','restore-task','toggle-task','pause-focus','resume-focus','start-break'].includes(action)) await reload();
  } finally {busy=false;}
}
function readFilters(form) {
  state.query=Object.fromEntries(new FormData(form));
  updateTaskList().catch(error=>toast(error.message,true));
}
function readPlan(form) {
  const data=new FormData(form);
  const draft=plan();
  draft.minutes=data.get('minutes')===''?NaN:Number(data.get('minutes'));
  draft.breakMinutes=data.get('breakMinutes')===''?NaN:Number(data.get('breakMinutes'));
  draft.ids=data.getAll('task');
  const selected=state.tasks.filter(task=>draft.ids.includes(task.id));
  const workload=selected.reduce((sum,task)=>sum+(task.estimated_minutes??0),0);
  const unknown=selected.filter(task=>task.estimated_minutes===null).length;
  const overload=form.querySelector('#focus-overload');
  overload.hidden=!(workload>draft.minutes);
  overload.querySelector('input').required=!overload.hidden;
  if (overload.hidden) overload.querySelector('input').checked=false;
  overload.querySelector('span').textContent='Vượt '+minuteLabel(workload-draft.minutes)+'. Tôi vẫn muốn bắt đầu.';
  form.querySelector('#focus-workload').textContent='Tổng dự kiến '+minuteLabel(workload)+(unknown?' · '+unknown+' việc chưa ước lượng':'');
  form.querySelector('#focus-selection').textContent=selected.length?selected.length+' công việc đã chọn':'Tập trung tự do';
  document.querySelector('#timer-value').textContent=timerText(Number.isFinite(draft.minutes)&&draft.minutes>0?draft.minutes*60000:0);
  for (const button of form.querySelectorAll('[data-action="focus-preset"]')) {
    button.classList.toggle('selected',Number(button.dataset.minutes)===draft.minutes&&Number(button.dataset.break)===draft.breakMinutes);
  }
}
document.addEventListener('click',event=>{
  const element=event.target.closest('[data-action]');
  if (element) runAction(element).catch(error=>toast(error.message,true));
  if (event.target.closest('.sidebar a')) drawer(false);
});
dialog.addEventListener('click',event=>{
  const target=event.target.closest('[data-dialog-action]');
  if (target?.dataset.dialogAction==='close') dialog.close();
  if (target?.dataset.dialogAction==='add-sub') {
    const fields=dialog.querySelector('#subtask-fields');
    fields.insertAdjacentHTML('beforeend',subtaskInput());
    fields.lastElementChild.querySelector('input[maxlength]').focus();
  }
  if (target?.dataset.dialogAction==='remove-sub') target.closest('[data-sub]').remove();
});
backdrop.addEventListener('click',()=>drawer(false));
main.addEventListener('input',event=>{
  if (event.target.name==='search' && event.target.form?.id==='task-filters') readFilters(event.target.form);
  if (event.target.form?.id==='focus-plan' && ['minutes','breakMinutes','task'].includes(event.target.name)) readPlan(event.target.form);
});
main.addEventListener('change',async event=>{
  const form=event.target.form;
  if (form?.id==='task-filters' && event.target.name!=='search') readFilters(form);
  if (form?.id==='analytics-filters' && event.target.name==='range') {
    state.analysisRange=event.target.value;
    render();
  }
  const {focusCheck,placement}=event.target.dataset;
  if ((!focusCheck&&!placement)||busy) return;
  busy=true;
  event.target.disabled=true;
  try {
    if (focusCheck && state.active) await request('/focus/sessions/'+state.active.id+'/tasks/'+focusCheck,'PATCH',{completed:event.target.checked});
    if (placement) await request('/inventory/'+placement,'PATCH',{placement_slot:event.target.value||null});
    await reload();
  } catch (error) {
    toast(error.message,true);
    await reload().catch(failure=>toast(failure.message,true));
  } finally {busy=false;event.target.disabled=false;}
});
main.addEventListener('submit',async event=>{
  const form=event.target;
  event.preventDefault();
  try {
    if (form.id==='task-filters') readFilters(form);
    if (form.id==='analytics-filters') {
      const data=Object.fromEntries(new FormData(form));
      if (data.from>data.to || Date.parse(data.to)-Date.parse(data.from)>365*86400000) {
        toast('Chọn khoảng thời gian hợp lệ, tối đa 366 ngày.',true);
        return;
      }
      Object.assign(state,{analysisFrom:data.from,analysisTo:data.to});
      await render();
    }
    if (form.id==='settings-form') {
      const data=Object.fromEntries(new FormData(form));
      await request('/settings','PATCH',{timezone:data.timezone});
      await request('/profile','PATCH',{display_name:data.display_name});
      await reload();
      toast('Đã lưu cài đặt.');
    }
    if (form.id==='focus-plan' && !busy) {
      busy=true;
      const submit=form.querySelector('[type="submit"]');
      submit.disabled=true;
      try {
        readPlan(form);
        const draft=plan();
        const data=new FormData(form);
        await request('/focus/sessions','POST',{focus_minutes:draft.minutes,break_minutes:draft.breakMinutes,
          task_ids:draft.ids,confirm_overload:data.get('confirm_overload')==='on'});
        state.reviewId=null;
        await reload();
      } finally {busy=false;submit.disabled=false;}
    }
  } catch (error) {toast(error.message,true);}
});
document.addEventListener('keydown',event=>{
  if (event.key==='Escape' && shell.classList.contains('drawer')) drawer(false);
  if (event.key.toLowerCase()==='n'&&!event.ctrlKey&&!event.metaKey&&!event.altKey&&!event.repeat&&!dialog.open&&
      !event.target.closest('input,select,textarea,[contenteditable]')) {
    event.preventDefault();
    openTask();
  }
});
window.addEventListener('hashchange',()=>{
  if (location.hash==='#content') return;
  state.query={};
  state.historyReview=null;
  render({focus:true});
});
async function initialize() {
  try {
    await refreshBase({initial:true});
    const latest=state.sessions.find(row=>row.phase==='focus'&&!row.is_sample);
    if (latest && !isLive(latest)) state.reviewId=latest.id;
    await render();
  } catch (error) {
    main.removeAttribute('aria-busy');
    main.innerHTML=heading('Không thể kết nối FocusQuest',error.message)+button('Thử lại','retry','primary');
  }
}
try {shell.classList.toggle('rail-small',localStorage.getItem('focusquest-rail')==='true');} catch {}
async function tick() {
  paintTimer();
  if (!state.active || state.active.status!=='running' || remaining(state.active)>0 || busy || Date.now()<expiryCheckAfter) return;
  busy=true;
  expiryCheckAfter=Date.now()+1500;
  try { await reload(); }
  catch (error) { toast(error.message,true); }
  finally {busy=false;}
}
setInterval(tick,500);
document.addEventListener('visibilitychange',()=>{if (!document.hidden) tick();});
initialize();
