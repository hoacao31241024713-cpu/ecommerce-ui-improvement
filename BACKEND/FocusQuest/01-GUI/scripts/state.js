import {dayOf} from './seed.js';
import {request} from './api.js';
import {esc,icon,options} from './ui.js';
export const state={
  page:'overview',settings:{language:'vi',theme:'dark',timezone:'Asia/Ho_Chi_Minh'},profile:{display_name:''},
  rewards:{level:1,coins:0},tasks:[],categories:[],sessions:[],active:null,inventory:[],shop:[],achievements:[],
  scope:'all',query:{},calendarDay:null,calendarMonth:null,focusPlan:null,reviewId:null,analysisRange:'week',analysisFrom:'',analysisTo:'',
  charts:[],memory:null
};
export const t=(vi,en)=>state.settings.language==='en'?en:vi;
export const localDate=()=>dayOf(Date.now(),state.settings.timezone);
export const dayLabel=(date,settings={day:'numeric',month:'short'})=>new Intl.DateTimeFormat(t('vi-VN','en-GB'),{timeZone:'UTC',...settings}).format(new Date(date+'T12:00:00Z'));
export const timeLabel=timestamp=>new Intl.DateTimeFormat(t('vi-VN','en-GB'),{timeZone:state.settings.timezone,dateStyle:'medium',timeStyle:'short'}).format(timestamp);
export const minuteLabel=value=>Math.round(value*10)/10+' '+t('phút','min');
export const field=(label,html,classes='')=>'<label class="field '+classes+'"><span>'+esc(label)+'</span>'+html+'</label>';
export const select=(name,pairs,value,extra='')=>'<select name="'+name+'" '+extra+'>'+options(pairs,value)+'</select>';
export const button=(label,action,style='subtle',glyph='',extra='')=>'<button type="button" class="btn '+style+'" data-action="'+action+'" '+extra+'>'+(glyph?icon(glyph,16):'')+esc(label)+'</button>';
export const iconButton=(label,action,glyph,extra='')=>'<button type="button" class="icon-btn" data-action="'+action+'" aria-label="'+esc(label)+'" title="'+esc(label)+'" '+extra+'>'+icon(glyph,17)+'</button>';
export const heading=(title,subtitle='',actions='')=>'<div class="page-head"><div><h1>'+esc(title)+'</h1>'+(subtitle?'<p class="subtitle">'+esc(subtitle)+'</p>':'')+'</div>'+actions+'</div>';
export const link=(label,page,style='subtle',glyph='')=>'<a class="btn '+style+'" href="#'+page+'">'+(glyph?icon(glyph,16):'')+esc(label)+'</a>';
export const section=(title,detail='',actions='')=>'<div class="section-head"><div><h2>'+esc(title)+'</h2>'+(detail?'<p class="meta">'+esc(detail)+'</p>':'')+'</div>'+actions+'</div>';
export function categoryName(category) {
  if (!category) return t('Chưa phân loại','Uncategorized');
  const sample={study:'Study',work:'Projects',life:'Personal',health:'Health'};
  const original={study:'Học tập',work:'Dự án',life:'Cá nhân',health:'Sức khỏe'};
  return category.name===original[category.id]?t(category.name,sample[category.id]):category.name;
}
export function toast(message,error=false) {
  const item=document.createElement('div');
  item.className='toast'+(error?' error':'');
  item.textContent=message;
  document.querySelector('#toasts').append(item);
  setTimeout(()=>item.remove(),4200);
}

export async function refreshBase({initial=false}={}) {
  const previous=state.rewards.level;
  const keys={settings:'/settings',profile:'/profile',rewards:'/rewards',tasks:'/tasks',categories:'/categories',
    sessions:'/focus/sessions',active:'/focus/active',shop:'/shop/items',inventory:'/inventory',achievements:'/achievements'};
  await request('/focus/active'); // Reconcile elapsed time before dependent reads.
  const values=await Promise.all(Object.values(keys).map(path=>request(path)));
  Object.assign(state,Object.fromEntries(Object.keys(keys).map((key,index)=>[key,values[index]])));
  document.documentElement.dataset.theme=state.settings.theme;
  document.documentElement.lang=state.settings.language;
  if (!initial && state.rewards.level>previous) toast(t('Lên cấp '+state.rewards.level+'!','Level '+state.rewards.level+' reached!'));
}
