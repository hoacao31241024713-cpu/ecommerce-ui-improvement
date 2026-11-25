const shapes={
  grid:'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/>',
  moon:'<path d="M20 15A8 8 0 0 1 9 4 8.5 8.5 0 1 0 20 15Z"/>',
  list:'<path d="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01"/>',
  kanban:'<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 8v8m6-8v5"/>',
  calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4m10-4v4M3 10h18m-13 5h2m4 0h2"/>',
  timer:'<circle cx="12" cy="13" r="8"/><path d="M10 2h4m-2 7v4l2 2m4-9 2-2"/>',
  history:'<path d="M3 12a9 9 0 1 1 2.6 6.4M3 7v5h5m4-5v5l3 2"/>',
  coffee:'<path d="M4 8h13v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zm13 1h2a2 2 0 0 1 0 4h-2M3 21h17M8 3v2m5-2v2"/>',
  room:'<path d="m3 10 9-7 9 7v10H3zm6 10v-7h6v7"/>',
  shop:'<path d="M4 10v10h16V10M3 10l2-6h14l2 6M3 10c0 3 4 3 4 0 0 3 5 3 5 0 0 3 5 3 5 0 0 3 4 3 4 0M9 20v-5h6v5"/>',
  box:'<path d="M3 7l9-4 9 4v10l-9 4-9-4zm0 0 9 4 9-4m-9 4v10m-5-16 10 4"/>',
  award:'<circle cx="12" cy="8" r="5"/><path d="m8 12-2 9 6-3 6 3-2-9"/>',
  chart:'<path d="M4 4v16h16M8 16v-3m5 3V9m5 7V6"/>',
  settings:'<circle cx="12" cy="12" r="3"/><path d="m10 3-1 3-2 1-3-1-2 4 3 2v2l-2 2 2 4 3-1 2 1 1 2h3l1-3 2-1 3 1 2-4-3-2v-2l2-2-2-4-3 1-2-1-1-2z"/>',
  plus:'<path d="M12 5v14M5 12h14"/>', search:'<circle cx="10" cy="10" r="5.5"/><path d="m14 14 5 5"/>',
  check:'<path d="m5 12 4 4L19 6"/>', circle:'<circle cx="12" cy="12" r="8"/>',
  flame:'<path d="M12 22c-5 0-8-3-8-7 0-3 2-5 4-7 0 3 2 4 2 4 3-3 4-6 3-10 5 3 7 7 7 13 0 4-3 7-8 7Z"/>',
  coin:'<circle cx="12" cy="12" r="9"/><path d="m9 9 3-2 3 2v6l-3 2-3-2z"/>',
  bolt:'<path d="m13 2-8 12h6l-1 8 9-12h-6z"/>', menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',
  panel:'<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/>',
  play:'<path d="m8 5 12 7-12 7z"/>', pause:'<path d="M9 5v14m6-14v14"/>',
  more:'<path d="M5 12h.01M12 12h.01M19 12h.01" stroke-width="3"/>',
  x:'<path d="m6 6 12 12m0-12L6 18"/>', edit:'<path d="m4 16 11-11 4 4L8 20H4zm9-9 4 4"/>',
  archive:'<rect x="3" y="4" width="18" height="4" rx="1"/><path d="M5 8v12h14V8m-10 5h6"/>',
  left:'<path d="m14 6-6 6 6 6"/>', right:'<path d="m10 6 6 6-6 6"/>',
  up:'<path d="m6 14 6-6 6 6"/>', down:'<path d="m6 10 6 6 6-6"/>',
  target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  expand:'<path d="M9 4H4v5m11-5h5v5M4 15v5h5m6 0h5v-5"/>',
  volume:'<path d="M3 9h4l5-4v14l-5-4H3zm13 0c2 2 2 4 0 6m2-9c4 4 4 8 0 12"/>',
  download:'<path d="M12 3v12m-4-4 4 4 4-4M4 17v4h16v-4"/>',
  leaf:'<path d="M5 20c2-8 5-10 12-13M5 16C1 5 13 2 21 3c0 9-6 15-16 13Z"/>',
  flag:'<path d="M5 21V4m0 1c5-4 9 4 14 0v10c-5 4-9-4-14 0"/>',
  sparkle:'<path d="M12 2c1 6 4 9 10 10-6 1-9 4-10 10-1-6-4-9-10-10 6-1 9-4 10-10Z"/>'
};
export const icon=(name,size=20)=>'<svg class="icon" width="'+size+'" height="'+size+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+(shapes[name]??shapes.sparkle)+'</svg>';
export const esc=value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
export const options=(pairs,value)=>pairs.map(([id,label])=>'<option value="'+esc(id)+'" '+(String(id)===String(value)?'selected':'')+'>'+esc(label)+'</option>').join('');
export const empty=(title,detail='',symbol='list')=>'<div class="empty">'+icon(symbol,27)+'<strong>'+esc(title)+'</strong><span>'+esc(detail)+'</span></div>';
export const progress=(value,label)=>'<progress value="'+value+'" max="100" aria-label="'+esc(label)+'"></progress>';
