export const DAY = 86_400_000;
export const shiftDay = (day, offset) => new Date(Date.parse(day + 'T12:00:00Z') + offset * DAY).toISOString().slice(0, 10);
export function dayOf(timestamp, zone) {
  const parts = new Intl.DateTimeFormat('en-CA', { timeZone: zone, year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(timestamp);
  const get = type => parts.find(part => part.type === type).value;
  return [get('year'), get('month'), get('day')].join('-');
}

export const slots = {
  left: [25, 66], center: [50, 72], right: [74, 64], window: [67, 41],
  wall: [34, 39], floor: [55, 82], shelf: [20, 46], nook: [83, 77]
};

export function seed(now = Date.now(), zone = 'Asia/Ho_Chi_Minh') {
  const today = dayOf(now, zone);
  const categories = [
    ['study','Học tập','#a394f8'], ['work','Dự án','#71b8fc'], ['life','Cá nhân','#69d2a0'], ['health','Sức khỏe','#e8b86d']
  ].map(([id,name,color]) => ({id,user_id:1,name,color,created_at:now}));
  const titles = [
    'Hoàn thiện báo cáo thương mại điện tử','Ôn tập quản trị cơ sở dữ liệu','Lập kế hoạch học tập tuần này','Đọc 20 trang sách',
    'Tập thể dục buổi sáng','Phác thảo giao diện portfolio','Nộp bài thực hành Node.js','Kiểm tra email nhóm',
    'Soạn slide thuyết trình','Đọc tài liệu về SQLite','Tổng hợp kết quả khảo sát','Luyện nghe tiếng Anh',
    'Cập nhật CV','Chuẩn bị tài liệu cho buổi họp','Lên thực đơn tuần tới','Ôn lại thuật ngữ marketing',
    'Nghiên cứu hành vi mua hàng','Đi bộ sau giờ học','Tổ chức lại thư mục dự án','Xem lại mục tiêu tháng'
  ];
  const tasks = titles.map((title,i) => {
    const offset = [0,0,0,0,0,-2,-1,-3,1,2,-5,-6,3,4,5,-8,-9,-10,6,8][i];
    const status = [3,4,7,10,11,15,16,17].includes(i) ? 'completed' : [1,5].includes(i) ? 'progress' : 'todo';
    return {id:'t'+(i+1),user_id:1,category_id:['study','work','life','health'][i%4],title,description:'',status,
      priority:['high','urgent','medium','low'][i%4],due_date:shiftDay(today,offset),estimated_minutes:i===4?0:i===7?null:10+i%4*10,
      completed_at:status==='completed'?now+Math.min(0,offset)*DAY-1000:null,deleted_at:null,created_at:now-(12+i)*DAY,updated_at:now-1000};
  });
  const subtasks = ['Xem tiêu chí chấm điểm','Viết dàn ý','Rà soát ví dụ','Kiểm tra tài liệu tham khảo','Đọc lại phần chuẩn hóa',
    'Ôn phép JOIN','Tạo bộ dữ liệu nhỏ','Chọn ba mục tiêu','Dự kiến thời lượng','Đặt ngày thực hiện']
    .map((title,i)=>({id:'sub'+i,task_id:'t'+(1+Math.floor(i/4)),title,is_completed:i%3===0?1:0,created_at:now,updated_at:now}));
  const catalog = [
    ['desk','Bàn gỗ sồi','Oak desk','Mặt bàn rộng với vân gỗ ấm.','A broad, warm wood surface.',25,1],
    ['chair','Ghế nhung','Velvet chair','Ghế nhỏ cho góc đọc sách.','A small chair for your reading nook.',35,1],
    ['lamp','Đèn bàn hổ phách','Amber lamp','Ánh sáng dịu cho buổi tối.','Soft light for evening hours.',30,1],
    ['plant','Chậu Monstera','Monstera','Thêm một mảng xanh cho phòng.','A splash of green for your room.',25,1],
    ['computer','Máy tính để bàn','Desktop computer','Màn hình tím cho góc làm việc.','A violet screen for your desk.',55,2],
    ['bookshelf','Kệ sách gỗ','Bookshelf','Kệ dành cho sách và sổ tay.','A shelf for books and notebooks.',65,2],
    ['art','Tranh trăng lưỡi liềm','Moon print','Bức tranh treo tường màu tím.','A violet print for your wall.',20,1],
    ['pet','Mèo tam thể','Calico cat','Một bạn mèo nhỏ cạnh bàn.','A little cat by the desk.',95,3],
    ['clock','Đồng hồ tròn','Round clock','Đồng hồ với mặt số tối giản.','A clock with a minimal dial.',35,1],
    ['rug','Thảm dệt tím','Woven rug','Tấm thảm dành cho góc nghỉ.','A rug for your quiet corner.',45,1],
    ['window','Cửa sổ đêm','Night window','Cửa sổ nhìn ra bầu trời sao.','A window overlooking the stars.',110,3],
    ['radio','Radio cổ điển','Retro radio','Nút bật âm thanh trong phòng.','A switch for room ambience.',70,2]
  ];
  const shop_items = catalog.map(([id,name,name_en,description,description_en,price,required_level])=>({
    id,name,name_en,description,description_en,category:id,price,required_level,asset:id,is_active:1
  }));
  const inventory = [['desk','center'],['lamp','left'],['plant','right'],['clock','wall']].map(([item_id,placement_slot],i)=>({
    id:'starter'+i,user_id:1,item_id,is_placed:1,position_x:slots[placement_slot][0],position_y:slots[placement_slot][1],
    rotation:0,placement_slot,purchased_at:now
  }));
  const focus_sessions = Array.from({length:15},(_,i)=>{
    const planned_duration=(i%3===0?50:25)*60000;
    const ended_at=now-Math.floor((i+1)/2)*DAY-(i%2+1)*3600000;
    return {id:'sample'+i,user_id:1,phase:'focus',status:'completed',planned_duration,actual_duration:planned_duration,
      started_at:ended_at-planned_duration,ended_at,deadline:null,paused_at:null,paused_duration:0,current_round:1,
      rounds:1,focus_minutes:planned_duration/60000,break_minutes:5,parent_id:null,is_sample:1};
  });
  const focus_session_tasks = focus_sessions.slice(0,8).map((session,i)=>{
    const task = tasks.filter(item=>item.status==='completed')[i];
    return {id:'link'+i,session_id:session.id,task_id:task.id,title_at_start:task.title,category_at_start:categories.find(item=>item.id===task.category_id).name,
      position:0,completed_in_session:1,completed_at:session.ended_at-1000};
  });
  const reward = (event_key,source_type,source_id,xp_delta,coin_delta,created_at) => ({id:event_key,user_id:1,event_key,source_type,source_id,xp_delta,coin_delta,created_at});
  const reward_transactions = [
    reward('welcome','welcome','1',0,140,now),
    ...tasks.filter(task=>task.completed_at!==null).map(task=>reward('task:'+task.id+':1','task',task.id,10,5,task.completed_at)),
    ...focus_sessions.map(session=>reward('focus:'+session.id,'focus',session.id,session.focus_minutes,Math.floor(session.focus_minutes*.6),session.ended_at)),
    ...focus_session_tasks.map(link=>reward('checklist:'+link.session_id,'checklist',link.session_id,30,20,link.completed_at)),
    reward('streak:7','streak','7',100,50,focus_sessions[0].ended_at)
  ];
  const achievements = [
    ['quest','First Quest','Hoàn thành công việc đầu tiên.','tasks',1,'check'],
    ['focus','First Focus','Hoàn thành một phiên tập trung.','focus',1,'timer'],
    ['deep','Deep Worker','Tập trung đủ 300 phút.','minutes',300,'flame'],
    ['master','Task Master','Hoàn thành 20 công việc.','tasks',20,'check'],
    ['streak','Focus Streak','Đạt chuỗi 7 ngày.','streak',7,'flame'],
    ['designer','Room Designer','Đặt 5 vật phẩm trong phòng.','placed',5,'room'],
    ['buy','First Purchase','Mua vật phẩm đầu tiên.','purchases',1,'shop'],
    ['week','Productive Week','Có 5 phiên hoàn thành nhiệm vụ trong một tuần.','productive',5,'chart']
  ].map(([id,name,description,condition_type,condition_value,icon])=>({id,code:id,name,description,condition_type,condition_value,icon}));
  return {user_profile:[{id:1,display_name:'Tuyết Hoa',avatar:'',created_at:now,updated_at:now}],
    settings:[{id:1,theme:'dark',language:'vi',focus_duration:25,short_break_duration:5,long_break_duration:15,sound_volume:.35,sound:'off',
      auto_start_break:0,timezone:zone,background:'room'}],
    categories,tasks,subtasks,focus_sessions,focus_session_tasks,distractions:[],shop_items,inventory,reward_transactions,achievements,user_achievements:[]};
}
