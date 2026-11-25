import {slotLabels} from './locale.js';
import {esc,icon,empty} from './ui.js';
import {state,heading,section,select,button,link} from './state.js';

const art={
  desk:'<path d="M6 12h36v6H6zM9 18h4v17H9zm26 0h4v17h-4z" fill="#be8872"/><path d="M7 11h35" stroke="#efbfaa" stroke-width="2"/>',
  chair:'<rect x="12" y="6" width="24" height="22" rx="7" fill="#bd8bd0"/><rect x="10" y="23" width="28" height="8" rx="4" fill="#8f64aa"/><path d="M24 30v10m-10 2 10-3 10 3" stroke="#e9d2f0" stroke-width="3"/>',
  lamp:'<path d="M22 19h4v17h-4zM15 36h18v4H15z" fill="#bf8979"/><path d="m18 7-8 15h28L30 7z" fill="#f3b77d"/><path d="M12 23h24" stroke="#ffe2a6" stroke-width="3"/>',
  plant:'<path d="M15 28h18l-3 14H18z" fill="#d98f78"/><path d="M24 29V14m1 7c0-9 6-13 13-13-1 8-5 12-13 13zm-1-1c0-9-5-15-13-15 1 8 5 14 13 15Z" fill="#9cd495" stroke="#9cd495" stroke-width="2"/>',
  computer:'<rect x="6" y="8" width="36" height="24" rx="4" fill="#d6bafb"/><rect x="9" y="11" width="30" height="18" rx="2" fill="#65548c"/><path d="M24 32v7m-9 1h18" stroke="#e5d3fb" stroke-width="3"/>',
  bookshelf:'<rect x="8" y="6" width="32" height="35" rx="3" fill="#986976"/><path d="M11 21h26m-26 15h26" stroke="#e3a28d" stroke-width="3"/><path d="M15 10h4v10h-4zm7 3h4v7h-4zm9-2h4v9h-4zM15 25h5v10h-5zm10 3h8v7h-8z" fill="#c8a7ed"/>',
  art:'<rect x="12" y="7" width="24" height="34" rx="2" fill="#c38683"/><rect x="15" y="10" width="18" height="28" fill="#634e88"/><path d="M28 17a7 7 0 1 0 3 11 8 8 0 0 1-3-11Z" fill="#ffe0ad"/>',
  pet:'<path d="M9 24V10l10 7h10l10-7v14a15 15 0 1 1-30 0Z" fill="#ffd1a3"/><path d="M26 17h3l10-7v14c-6 4-12 1-13-7Z" fill="#c4816d"/><path d="M17 27h.1m14 0h.1m-9 6h4" stroke="#57354a" stroke-width="3" stroke-linecap="round"/>',
  clock:'<circle cx="24" cy="24" r="16" fill="#e2a58c"/><circle cx="24" cy="24" r="13" fill="#674b75"/><path d="M24 15v10l6 3" stroke="#fff2e6" stroke-width="2" stroke-linecap="round"/>',
  rug:'<ellipse cx="24" cy="25" rx="20" ry="12" fill="#8e6bc4"/><ellipse cx="24" cy="25" rx="16" ry="8" fill="none" stroke="#e3b9eb" stroke-dasharray="2 3"/>',
  window:'<rect x="7" y="7" width="34" height="33" rx="3" fill="#d5a0ba"/><rect x="10" y="10" width="28" height="27" fill="#5e507e"/><circle cx="30" cy="17" r="4" fill="#ffe3b5"/><path d="m10 31 9-8 8 7 11-6v13H10z" fill="#9673aa"/><path d="M24 10v27M10 24h28" stroke="#d5a0ba" stroke-width="2"/>',
  radio:'<rect x="6" y="15" width="36" height="22" rx="6" fill="#ad728c"/><circle cx="17" cy="26" r="6" fill="#6e526e"/><path d="M27 23h10m-10 5h10M30 15 39 6" stroke="#f1bdb2" stroke-width="2" stroke-linecap="round"/>'
};
const itemArt=asset=>'<svg viewBox="0 0 48 48" aria-hidden="true">'+(art[asset]??art.art)+'</svg>';
const itemOf=id=>state.shop.find(item=>item.id===id);
export function roomPage() {
  const placed=state.inventory.filter(row=>row.is_placed);
  const slots=[['','Cất vào kho'],...Object.entries(slotLabels).map(([id,[label]])=>[id,label])];
  return heading('Phòng của tôi','Dùng Coins để sưu tầm vật phẩm và chọn vị trí trang trí.',link('Cửa hàng','shop','primary','shop'))+
    '<div class="focus-grid"><section class="card">'+section('Không gian của bạn',placed.length+' vật phẩm đã đặt')+
    '<div class="room-scene" aria-label="Phòng làm việc dưới ánh trăng">'+placed.map(row=>{
      const item=itemOf(row.item_id);
      return '<button class="room-item" style="left:'+row.position_x+'%;top:'+row.position_y+'%" data-action="room-item" data-id="'+esc(row.id)+
        '" type="button" aria-label="'+esc(item?.name)+'" title="'+esc(item?.name)+'">'+itemArt(item?.asset)+'</button>';
    }).join('')+'</div></section><section class="card">'+section('Kho đồ','Chọn một vị trí trống để đặt vật phẩm.')+
    (state.inventory.length?state.inventory.map(row=>{
      const item=itemOf(row.item_id);
      const available=slots.filter(([slot])=>!slot||row.placement_slot===slot||!placed.some(other=>other.placement_slot===slot));
      return '<div class="inventory-row">'+itemArt(item?.asset)+'<span>'+esc(item?.name)+'</span>'+
        select('placement_slot',available,row.placement_slot??'','data-placement="'+esc(row.id)+'" aria-label="Vị trí '+esc(item?.name)+'"')+'</div>';
    }).join(''):empty('Kho đồ trống','Mua vật phẩm ở cửa hàng.','box'))+'</section></div>';
}
export function shopPage() {
  return heading('Cửa hàng','Chọn vật phẩm cho căn phòng của bạn.',link('Phòng của tôi','room','subtle','room'))+
    '<div class="shop-grid">'+state.shop.map(item=>{
      const locked=state.rewards.level<item.required_level;
      const poor=state.rewards.coins<item.price;
      const label=item.owned?'Đã sở hữu':locked?'Cần cấp '+item.required_level:poor?'Thiếu Coins':'Mua';
      return '<article class="card shop-card"><div class="shop-art">'+itemArt(item.asset)+'</div><h2>'+esc(item.name)+'</h2><p class="meta">'+
        esc(item.description)+'</p><div class="section-head"><span class="gold">'+icon('coin',17)+' '+item.price+' Coins</span>'+
        button(label,'buy','primary','','data-id="'+esc(item.id)+'" '+(item.owned||locked||poor?'disabled':''))+'</div></article>';
    }).join('')+'</div>';
}
