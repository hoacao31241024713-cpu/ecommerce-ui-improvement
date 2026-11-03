/* Tương tác nhỏ ở phía trình duyệt; không có backend, không lưu/gửi dữ liệu. */
const searchForm = document.querySelector('#search-form');
const productCards = [...document.querySelectorAll('.product-card')];
const statusLine = document.querySelector('.search-result');
const normalize = s => s.toLocaleLowerCase('vi').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd');
searchForm.addEventListener('submit', event => {
  event.preventDefault();
  const term = normalize(document.querySelector('#site-search').value.trim());
  let visible = 0;
  productCards.forEach(card => {
    const matched = !term || normalize(card.dataset.name).includes(term);
    card.hidden = !matched;
    if (matched) visible++;
  });
  statusLine.hidden = !term;
  statusLine.textContent = term ? (visible ? `Tìm thấy ${visible} sản phẩm phù hợp trong danh sách demo.` : 'Không thấy sản phẩm trong danh sách demo. Hãy thử từ khóa khác.') : '';
  location.hash = 'products';
});
let toastTimer;
function showToast(text){const toast=document.querySelector('#toast');toast.textContent=text;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),3800)}
document.querySelectorAll('.voucher-button').forEach(button=>button.addEventListener('click',()=>showToast('Mã voucher chỉ để minh họa, chưa kết nối hệ thống khuyến mãi.')));
document.querySelector('#quote-form').addEventListener('submit',event=>{event.preventDefault();event.currentTarget.querySelector('.form-feedback').textContent='Đã tạo bản xem trước yêu cầu. Dữ liệu không được gửi hoặc lưu.'});
document.querySelector('#reorder-form').addEventListener('submit',event=>{event.preventDefault();event.currentTarget.querySelector('.form-feedback').textContent='Chế độ demo: không thể tra cứu đơn thật khi chưa có backend.'});
document.addEventListener('keydown',event=>{if(event.key==='Escape' && ['#quote','#reorder'].includes(location.hash))location.hash='top'});
