# AI Usage Log – Bài tập cá nhân Buổi 2

**Môn học:** Phát triển ứng dụng Thương mại điện tử  
**Website thực hành:** Thế Giới In Ấn (giao diện tiếp tục từ Buổi 1)  

## 1. Công cụ AI đã sử dụng

- **Công cụ:** ChatGPT (OpenAI).
- **Mục đích:** Hỗ trợ rà soát mã HTML5/CSS3 hiện có, giải thích kỹ thuật, đề xuất chỉnh sửa có phạm vi nhỏ và hỗ trợ phân tích lỗi giao diện. AI không thay thế việc tự chạy website và kiểm tra kết quả.

## 2. Phạm vi thực hành

Tập trung cải tiến khu vực **“Ấn phẩm phổ biến”** của website đã xây dựng trong Buổi 1. Nội dung gồm: tổ chức thông tin sản phẩm bằng HTML5; CSS selector và Box Model; Flexbox bên trong Product Card; CSS Grid cho danh sách sản phẩm; hiệu ứng hover, focus-visible và transition; xem xét khả năng hiển thị trên điện thoại.

## 3. Các yêu cầu/prompt đã trao đổi với AI

Các trích dẫn dưới đây là những yêu cầu tiêu biểu đã sử dụng trong quá trình làm bài; không phải toàn bộ lịch sử trò chuyện.

**Prompt 1 – Kiểm tra và cải thiện mã nguồn theo từng bước**  
Yêu cầu AI dựa trên `index.html` và `style.css` hiện có, chỉ ra phần cần cải thiện và hướng dẫn chỉnh sửa tối thiểu; không viết lại toàn bộ website.

**Prompt 2 – Bước 5: Thực hành Flexbox**  
Yêu cầu giải thích và áp dụng `display: flex`, `flex-direction`, `justify-content`, `align-items` và `gap` cho nội dung bên trong các Product Card của khu vực “Ấn phẩm phổ biến”.

**Prompt 3 – Bước 6: Thực hành CSS Grid**  
Yêu cầu chỉ rõ sự khác nhau giữa Flexbox và Grid; thực hành thay đổi bố cục danh sách sản phẩm thành hai và ba cột, giải thích `grid-template-columns`, `repeat()`, `gap` và `object-fit: cover`.

**Prompt 4 – Bước 7: Hover, focus và transition**  
> “Tôi muốn bổ sung hiệu ứng hover và focus cho một nút bấm hoặc liên kết trong website… Tạo hiệu ứng hover nhẹ; sử dụng transition; bổ sung focus-visible; đảm bảo màu chữ và màu nền dễ nhìn; không làm thay đổi bố cục quá nhiều.”

Sau đó, em yêu cầu thẻ sản phẩm phóng to nhẹ khi rê chuột và chuyển dòng “Xem chi tiết” thành lớp phủ xuất hiện trực tiếp trên ảnh sản phẩm.

**Prompt 5 – Bước 8: Phân tích lỗi responsive**  
> “Tôi thấy 1 lỗi khá [đáng chú ý] khi hiển thị trên điện thoại: các box ấn phẩm phổ biến dài và chữ lại quá nhỏ.”

Yêu cầu AI phân biệt nguyên nhân xác định từ mã CSS với giả thuyết cần kiểm tra, đồng thời đề xuất sửa ít thay đổi nhất.

**Prompt 6 – Hoàn thiện báo cáo và README**  
Yêu cầu AI giải thích các thuộc tính CSS dựa trên mã nguồn thực tế, hỗ trợ viết phần tự đánh giá và cấu trúc README; không tự bịa đường dẫn repository, website triển khai hoặc kết quả kiểm thử.

## 4. Đề xuất của AI và lựa chọn/điều chỉnh

| Nội dung | Đề xuất AI | Quyết định hoặc điều chỉnh trong quá trình thực hành |
|---|---|---|
| HTML5 | Tổ chức danh mục và giá trong phần tử `p` riêng | Sử dụng `.product-category` và `.product-price` trong Product Card. |
| Box Model | Thêm `padding`, `border`, `border-radius` | Áp dụng cách trình bày có đường viền và khoảng đệm cho các thẻ sản phẩm. |
| Flexbox | Sắp xếp nội dung trong thẻ bằng `flex-direction: column`, `gap` | Lựa chọn thực hành trên Product Card thay vì menu điều hướng. |
| CSS Grid | Thử bố cục hai/ba cột và so sánh với năm cột trên desktop | Giữ cấu trúc `.products-grid` đã có; nội dung thử nghiệm và ảnh minh chứng cần đối chiếu với kết quả thực tế. |
| Hover/focus | Hiệu ứng nổi thẻ, nhãn “Xem chi tiết”, `transition` và `focus-visible` | Điều chỉnh nhãn từ cuối thẻ sang lớp phủ trên liên kết ảnh, kết hợp phóng to nhẹ khi hover. |
| Responsive | Giảm chiều cao Product Card và tăng chữ trên mobile | Đề xuất media query `max-width: 480px`; cần xác nhận đã đưa vào CSS cuối cùng và kiểm tra trên thiết bị. |

**Ví dụ điều chỉnh đề xuất AI:** Ban đầu, nhãn “Xem chi tiết” được tạo bằng `::after` ở cuối Product Card. Sau khi xem lại bố cục, em yêu cầu đổi thành lớp phủ trên hình ảnh, xuất hiện khi hover hoặc focus bằng `opacity`, `transform` và `transition`. Điều này phù hợp hơn với kiểu tương tác mong muốn. Lớp phủ là pseudo-element của liên kết ảnh, không phải nút HTML độc lập; đích liên kết vẫn phụ thuộc vào `href` trong `index.html`.

## 5. Kiểm tra và giới hạn xác nhận

**Các bước kiểm tra cần thực hiện/đối chiếu với ảnh minh chứng:**

1. Chạy `index.html` trên trình duyệt hoặc Live Server; kiểm tra CSS được tải đúng.
2. Quan sát danh sách sản phẩm ở desktop; thử số cột Grid và khoảng cách `gap`.
3. Rê chuột vào Product Card và hình ảnh để kiểm tra phóng to, lớp phủ “Xem chi tiết” và chuyển động `transition`.
4. Sử dụng phím **Tab** để kiểm tra trạng thái `focus-visible` của liên kết hình ảnh.
5. Kiểm tra giao diện trên điện thoại hoặc Chrome DevTools ở các chiều rộng nhỏ; so sánh kích thước chữ, độ dài thẻ, tỷ lệ ảnh và tình trạng tràn nội dung.

**Điều đã xác định từ mã nguồn:** CSS có bố cục Grid, Flexbox cho Product Card, hiệu ứng hover/focus và lớp phủ ảnh. Quy tắc mobile ban đầu sử dụng hai cột ở `max-width: 480px`, chữ danh mục nhỏ, đồng thời có các khoảng cách/chiều cao tối thiểu trong thẻ.

**Điều cần xác nhận trước khi nộp:** [Ghi kích thước màn hình/thiết bị đã kiểm tra], [Ảnh trước–sau], [Đã áp dụng bản sửa mobile hay chỉ thử nghiệm], [Lỗi còn tồn tại nếu có]. Không ghi “đã kiểm thử thành công” khi chưa đối chiếu trên website thực tế.

## 6. Những kiến thức em có thể giải thích từ bài làm

- **HTML5:** `section`, `article`, `h2`, `h3`, `p`, `img`, `a` và ý nghĩa của `alt`.
- **CSS selector:** `.product-card`, `.products-grid > .product-card` và selector cho các phần tử bên trong.
- **Box Model:** `margin` là khoảng cách bên ngoài; `padding` là khoảng đệm bên trong; `border` tạo đường viền.
- **Flexbox:** `display: flex` và `flex-direction: column` tổ chức nội dung theo chiều dọc; `justify-content` căn theo trục chính, `align-items` căn theo trục phụ; `gap` tạo khoảng cách giữa các phần tử.
- **CSS Grid:** `display: grid` tổ chức danh sách theo hàng và cột; `grid-template-columns`, `repeat()` và `gap` điều khiển bố cục.
- **Hình ảnh:** `object-fit: cover` giữ tỷ lệ nhưng có thể cắt bớt ảnh để lấp đầy khung.
- **Tương tác và tiếp cận:** `:hover` phản hồi khi rê chuột; `:focus-visible` thể hiện focus khi điều hướng bằng bàn phím; `transition` làm chuyển đổi mượt hơn.

> **Nguyên tắc sử dụng AI:** Chỉ sử dụng gợi ý phù hợp với mã nguồn hiện có; đọc và giải thích được phần chỉnh sửa; kiểm tra lại giao diện trước khi kết luận kết quả. Các mô tả về kiểm thử và mức độ hoàn thành phải phản ánh đúng những gì đã thực hiện.
