import {request} from './api.js';
import {shiftDay} from './seed.js';
import {esc,icon,empty,progress} from './ui.js';
import {state,t,localDate,dayLabel,minuteLabel,heading,field,select,button,link,section} from './state.js';
import {taskRow} from './tasks-ui.js';

function metric(name,value,glyph,tone='') {
  return '<article class="metric"><div class="sigil '+tone+'">'+icon(glyph,18)+'</div><strong>'+esc(value)+'</strong><small>'+esc(name)+'</small></article>';
}
function chart(name,title,detail='',compact=false) {
  return '<section class="card">'+section(title,detail)+'<div class="chart-wrap '+(compact?'compact':'')+
    '"><canvas id="'+name+'" role="img" aria-label="'+esc(title)+'"></canvas></div></section>';
}
export async function dashboardData(page) {
  const today=localDate();
  if (page==='overview') return Promise.all([
    request('/analytics/overview','GET',undefined,{from:today,to:today}),
    request('/analytics/overview','GET',undefined,{from:shiftDay(today,-6),to:today})
  ]);
  const from=state.analysisRange==='custom'?state.analysisFrom||today:shiftDay(today,{today:0,week:-6,month:-29}[state.analysisRange]);
  const to=state.analysisRange==='custom'?state.analysisTo||today:today;
  return request('/analytics/overview','GET',undefined,{from,to});
}
export function overviewPage([today,week]) {
  const reward=state.rewards;
  const tasks=state.tasks.filter(row=>row.due_date===localDate() && row.status!=='completed').sort((a,b)=>
    ['urgent','high','medium','low'].indexOf(a.priority)-['urgent','high','medium','low'].indexOf(b.priority));
  return '<div class="page-head"><div><div class="date-kicker">'+icon('calendar',16)+esc(dayLabel(localDate(),{weekday:'long',day:'numeric',month:'long'}))+
    '</div><h1>Chào '+esc(state.profile.display_name)+'!</h1><p class="subtitle">Sẵn sàng cho những công việc hôm nay?</p></div>'+
    button('Thêm công việc','add','subtle','plus')+'</div>'+
    '<section class="hero"><div class="hero-copy"><div class="hero-tag">'+icon('sparkle',16)+' FocusQuest</div><h2>Make every minute<br>a mission.</h2>'+
    '<p>Lập kế hoạch cho hôm nay và dành thời gian cho những việc quan trọng.</p>'+link('Bắt đầu tập trung','focus','primary','play')+'</div></section>'+
    '<div class="metrics">'+metric('Công việc hôm nay',today.tasks,'list')+metric('Đã hoàn thành',today.completed+'/'+today.tasks,'check','green')+
    metric('Tập trung hôm nay',minuteLabel(today.minutes),'timer','blue')+metric('Chuỗi tập trung',reward.streak+' ngày','flame','gold')+'</div>'+
    '<div class="dashboard-grid"><div class="stack"><section class="card">'+section('Công việc ưu tiên','',link('Xem hôm nay','today'))+
    (tasks.length?tasks.slice(0,4).map(task=>taskRow(task,{compact:true})).join(''):empty('Đã xong việc hôm nay','Bạn có thể thêm một công việc mới.','check'))+
    '</section>'+chart('focus-chart','Thời gian tập trung','7 ngày gần nhất',true)+'</div><div class="stack">'+
    '<section class="card mission"><div class="mission-head"><div class="sigil">'+icon('target',19)+'</div><div><h2>Nhiệm vụ mỗi ngày</h2>'+
    '<span class="meta">Hoàn thành 3 công việc</span></div></div><p class="meta">'+Math.min(reward.daily,3)+' / 3 công việc</p>'+
    progress(Math.min(100,reward.daily/3*100),'Tiến độ nhiệm vụ')+'</section><section class="card">'+section('Phòng cá nhân','',link('Trang trí phòng','room'))+
    '<a href="#room" class="room-preview" aria-label="Mở phòng làm việc dưới ánh trăng"></a></section>'+
    '<section class="card mission">'+section('Cấp '+reward.level,reward.xp+' XP tích lũy')+progress(reward.progress,'Tiến độ cấp độ')+
    '<p class="meta">'+reward.progress+' / 100 XP đến cấp tiếp theo</p></section></div></div>';
}
export function analyticsPage(data) {
  return heading('Thống kê','Theo dõi công việc và thời gian tập trung theo ngày.',button('Xuất JSON','export','subtle','download'))+
    '<form id="analytics-filters" class="filters">'+field('Khoảng thời gian',select('range',[['today','Hôm nay'],['week','7 ngày gần nhất'],['month','30 ngày gần nhất'],['custom','Tùy chỉnh']],state.analysisRange))+
    (state.analysisRange==='custom'?field('Từ ngày','<input type="date" name="from" required value="'+esc(state.analysisFrom||data.from)+'">')+
      field('Đến ngày','<input type="date" name="to" required value="'+esc(state.analysisTo||data.to)+'">')+'<button class="btn primary">Áp dụng</button>':'')+'</form>'+
    '<div class="metrics">'+metric('Công việc theo hạn',data.tasks,'list')+metric('Tỷ lệ hoàn thành',data.completion+'%','check','green')+
    metric('Thời gian tập trung',minuteLabel(data.minutes),'timer','blue')+metric('Phiên tập trung đầy đủ',data.completed_sessions,'flag','gold')+'</div>'+
    '<div class="two-grid"><div class="stack">'+chart('focus-chart','Thời gian tập trung theo ngày','Tổng số phút thực tế')+
    chart('task-chart','Công việc hoàn thành theo ngày','Theo thời điểm đánh dấu hoàn thành')+
    '</div><div class="stack">'+chart('status-chart','Phân bố trạng thái','Các công việc có hạn trong khoảng đã chọn')+
    '<section class="card">'+section('Tổng kết khoảng thời gian')+'<div class="history-row"><span>Thời lượng trung bình mỗi phiên</span><strong>'+minuteLabel(data.average)+'</strong></div>'+
    '<div class="history-row"><span>Tỷ lệ việc hoàn thành trong phiên</span><strong>'+data.checklist+'%</strong></div>'+
    '<div class="history-row"><span>XP nhận được</span><strong>'+data.xp+'</strong></div><div class="history-row"><span>Coins nhận được</span><strong>'+data.coins+
    '</strong></div></section></div></div>';
}
export function drawCharts(page,data) {
  if (!globalThis.Chart) return;
  const stats=page==='overview'?data[1]:data;
  const getColor=name=>getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const accent=getColor('--accent');
  const grid=getColor('--border');
  const color=getColor('--muted');
  const labels=stats.days.map(row=>dayLabel(row.day,{day:'numeric',month:'numeric'}));
  function plot(id,type,values,{title,colors,labels:customLabels}={}) {
    const element=document.getElementById(id);
    if (!element) return;
    if (type==='doughnut' && values.every(value=>!value)) {
      element.parentElement.innerHTML=empty('Chưa có công việc trong khoảng này','','chart');
      return;
    }
    const options={responsive:true,maintainAspectRatio:false,animation:false,plugins:{legend:{display:type==='doughnut',position:'bottom',labels:{color}}}};
    if (type!=='doughnut') options.scales={
      x:{grid:{display:false},ticks:{color,maxTicksLimit:12,maxRotation:0}},
      y:{beginAtZero:true,suggestedMax:1,border:{display:false},grid:{color:grid},ticks:{color,precision:0}}
    };
    state.charts.push(new globalThis.Chart(element,{type,options,data:{labels:customLabels??labels,datasets:[{
      label:title,data:values,backgroundColor:colors??accent,borderColor:accent,borderWidth:type==='line'?2:0,borderRadius:4,tension:.3,maxBarThickness:33
    }]}}));
  }
  plot('focus-chart','bar',stats.days.map(row=>Math.round(row.minutes*10)/10),{title:'Phút tập trung'});
  plot('task-chart','line',stats.days.map(row=>row.completed),{title:'Công việc hoàn thành'});
  plot('status-chart','doughnut',Object.values(stats.distribution),{title:'Trạng thái',
    labels:['Cần làm','Đang làm','Hoàn thành'],colors:[accent,getColor('--info'),getColor('--success')]});
}
