# E-commerce UI Improvement

## 1. Giới thiệu

Bài tập cá nhân cải tiến giao diện **Yêu cầu báo giá** dựa trên website **Thế Giới In Ấn**. Giao diện minh họa giúp khách hàng chủ động lựa chọn thông tin và kênh liên hệ để nhận báo giá sản phẩm in ấn.

Đây là **bản thực hành HTML5/CSS3**, không phải website chính thức và không kết nối hệ thống báo giá thực tế.

## 2. Website tham khảo

- **Tên website:** Thế Giới In Ấn
- **URL:** https://thegioiinan.com/
- **Khu vực đã khảo sát:** Yêu cầu báo giá

## 3. Chức năng

- Hiển thị biểu mẫu yêu cầu báo giá với thông tin **danh thiếp mẫu**.
- Chọn **sử dụng thông tin tài khoản giả lập** hoặc **thông tin liên hệ khác**.
- Chọn kênh nhận báo giá ưu tiên: **Email, Điện thoại hoặc Zalo**.
- Hiển thị thông tin hoặc trường nhập tương ứng bằng HTML/CSS.
- Hỗ trợ bố cục trên màn hình máy tính và điện thoại.
- Có nút **Gửi yêu cầu báo giá** để minh họa; **không gửi hoặc lưu dữ liệu**.

## 4. Công nghệ

- **HTML5:** Cấu trúc trang và biểu mẫu.
- **CSS3:** Trình bày giao diện, lựa chọn trạng thái và bố cục responsive.

Không sử dụng JavaScript, backend hoặc cơ sở dữ liệu.

## 5. Cách chạy

1. Đặt `index.html` và `style.css` trong cùng một thư mục.
2. Mở file `index.html` bằng trình duyệt (ví dụ Chrome hoặc Edge).
3. Thử chọn nguồn thông tin liên hệ và kênh Email/Điện thoại/Zalo để xem các trường hiển thị.
4. Thay đổi kích thước cửa sổ hoặc dùng công cụ kiểm tra chế độ điện thoại của trình duyệt để xem bố cục responsive.

## 6. Cải tiến đã thực hiện

**Vấn đề khảo sát ban đầu:** Theo ghi nhận của người thực hiện, khu vực Yêu cầu báo giá sử dụng thông tin liên hệ từ tài khoản đăng nhập và chưa có lựa chọn rõ ràng để nhập thông tin liên hệ khác hoặc chọn kênh nhận báo giá.

**Phương án giao diện đã xây dựng:** Bổ sung mục **Phương thức liên hệ nhận báo giá**, cho phép chọn thông tin tài khoản giả lập hoặc nhập thông tin khác, đồng thời chọn **Email, Điện thoại hoặc Zalo** làm kênh ưu tiên. Các trường được hiển thị tương ứng bằng CSS.

**Giới hạn:** Trang chỉ mô phỏng giao diện; không đăng nhập, kiểm tra dữ liệu đầy đủ, gửi yêu cầu hay nhận báo giá thật.

## 7. Hỗ trợ từ AI

- **Công cụ:** ChatGPT.
- **AI đã hỗ trợ:** Phân tích khu vực Yêu cầu báo giá, đề xuất bố cục UI/UX, gợi ý các thành phần HTML/CSS và hỗ trợ tạo mã nguồn `index.html`, `style.css`.
- **Phần người thực hiện tự kiểm tra:** [Bổ sung sau khi chạy thử thực tế].
- **Phần người thực hiện tự điều chỉnh hoặc bổ sung:** [Ghi rõ thay đổi do bản thân thực hiện; chưa có thông tin xác nhận].

Chi tiết việc sử dụng AI được ghi trong file [`AI_USAGE.md`](AI_USAGE.md) nếu file này được đưa vào cùng repository.

