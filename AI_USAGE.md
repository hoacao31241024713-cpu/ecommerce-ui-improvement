# AI Usage Log

## 1. Công cụ AI

- **Tên công cụ:** ChatGPT (OpenAI).
- **Phạm vi:** Hỗ trợ phân tích, đề xuất thiết kế và tạo mã nguồn giao diện cho bài tập cá nhân Chương 1.

## 2. Mục đích sử dụng

Sử dụng AI để phân tích website tham khảo **Thế Giới In Ấn** (https://thegioiinan.com/), xác định phương án cải tiến mục **Yêu cầu báo giá**, đề xuất bố cục UI/UX và hỗ trợ tạo, giải thích mã nguồn HTML5/CSS3. Mục tiêu là cho khách hàng lựa chọn **thông tin tài khoản giả lập hoặc thông tin liên hệ khác**, với kênh nhận báo giá ưu tiên là **Email, Điện thoại hoặc Zalo**.

## 3. Prompt đã sử dụng

**Prompt 1 – Phân tích website:**

Bạn là chuyên gia phân tích nghiệp vụ và thiết kế trải nghiệm người dùng
cho website thương mại điện tử.
Tôi đang khảo sát website:  thegioiinan.com (https://thegioiinan.com/).  
Hãy giúp tôi lập bảng phân tích các khu vực:
1. Trang chủ.
2. Danh mục sản phẩm.
3. Chi tiết sản phẩm.
4. Tìm kiếm.
5. Giỏ hàng.
6.Yêu cầu báo giá
Với mỗi khu vực, hãy nêu:
- Mục đích của chức năng.
- Thành phần giao diện cần có.
- Điểm thuận tiện đối với khách hàng.
- Một vấn đề có thể phát sinh.
- Một đề xuất cải tiến.
Không khẳng định những tính năng chưa được kiểm chứng.
Phân biệt rõ nhận xét dựa trên quan sát và đề xuất của AI.

**Prompt 2 – Đề xuất phương án thiết kế:**
Tôi đang thực hiện bài tập phát triển giao diện website thương mại điện tử
bằng HTML5 và CSS3.

Tôi muốn cải tiến khu vực: Theo ghi nhận khảo sát ban đầu của tôi, khu vực Yêu cầu báo giá hiện tại sử dụng thông tin liên hệ lấy từ tài khoản đăng nhập của khách hàng, chưa cung cấp lựa chọn để khách hàng chủ động nhập thông tin liên hệ khác hoặc lựa chọn kênh nhận báo giá mong muốn.
Điều này có thể gây bất tiện khi khách hàng muốn nhận báo giá qua một số điện thoại, địa chỉ email hoặc tài khoản liên hệ khác với thông tin đã đăng ký..

Đối tượng sử dụng: khách hàng mua sắm trực tuyến tại Việt Nam.

Hãy đề xuất:
1. Bố cục giao diện.
2. Các thành phần HTML cần sử dụng.
3. Cách tổ chức CSS.
4. Cách hiển thị trên máy tính và điện thoại.
5. Những điểm cần kiểm tra về khả năng sử dụng.

Trước tiên, hãy giải thích phương án thiết kế.
Chưa tạo toàn bộ mã nguồn cho đến khi tôi yêu cầu.

**Prompt 3 – Tạo mã nguồn:**
Dựa trên phương án đã thống nhất, hãy tạo một trang giao diện **Yêu cầu báo giá** cho website Thế Giới In Ấn (https://thegioiinan.com/) bằng HTML5 và CSS3.

Yêu cầu:
- Giao diện có tiêu đề, thông tin sản phẩm in ấn mẫu và khu vực yêu cầu báo giá.
- Bổ sung mục **“Phương thức liên hệ nhận báo giá”**.
- Cho phép lựa chọn sử dụng thông tin tài khoản giả lập hoặc nhập thông tin liên hệ khác.
- Có 3 phương thức nhận báo giá: Email, Điện thoại và Zalo.
- Hiển thị trường nhập thông tin phù hợp với phương thức liên hệ được chọn.
- Có nút gửi yêu cầu báo giá (chỉ mô phỏng giao diện, không gửi dữ liệu thực tế).
- Bố cục phù hợp với màn hình máy tính và điện thoại.
- Mã HTML có cấu trúc rõ ràng.
- CSS được tách thành file riêng.
- Không sử dụng backend hoặc cơ sở dữ liệu.
- Không đưa thư viện hoặc thành phần không cần thiết vào dự án.

Giải thích cách chạy trang web và những phần tôi cần kiểm tra.
## 4. Kết quả AI đề xuất

- **Phân tích:** Nhận diện các khu vực trên website và đề xuất cải tiến biểu mẫu báo giá; phân biệt nhận xét từ khảo sát với giả thuyết/đề xuất của AI.
- **Thiết kế:** Giữ thông tin tài khoản làm lựa chọn mặc định, cho phép dùng thông tin khác; chọn một kênh nhận báo giá ưu tiên (Email, Điện thoại, Zalo).
- **Mã nguồn:** AI đã tạo `index.html` và `style.css` cho giao diện minh họa có thông tin ấn phẩm mẫu, lựa chọn bằng nút radio, các trường liên hệ và bố cục thích ứng máy tính/điện thoại. CSS sử dụng `:has()` để hiện/ẩn phần thông tin theo lựa chọn.
- **Giới hạn:** Dữ liệu tài khoản chỉ là mẫu; nút gửi không gửi hay lưu báo giá thực tế; không có backend hoặc cơ sở dữ liệu.

## 5. Kiểm tra và điều chỉnh

 **Sinh viên tự hoàn thiện sau khi chạy thử.** Chưa có kết quả kiểm thử hoặc chỉnh sửa thực tế được xác nhận trong cuộc trò chuyện.

- **Trình duyệt và thiết bị/kích thước đã kiểm tra:** Google chrome, máy tính và điện thoại di động
- **Đã kiểm tra các lựa chọn tài khoản/thông tin khác và Email/Điện thoại/Zalo:** [Chưa bổ sung]
- **Kết quả hiển thị trên máy tính và điện thoại:** [Chưa bổ sung]
- **Vấn đề tự phát hiện:** [Chưa bổ sung]
- **Ít nhất một điểm tự chỉnh sửa, lý do và file/dòng liên quan:** [Chưa bổ sung]
- **Đề xuất AI không sử dụng hoặc đã thay đổi (nếu có):** [Chưa bổ sung]
- **Ảnh minh chứng / commit GitHub (nếu có):** [Chưa bổ sung]

## 6. Phần tôi hiểu và có thể giải thích

Các nội dung dưới đây là **gợi ý để tự ôn tập và xác nhận**, chưa phải tuyên bố rằng sinh viên đã hiểu hoặc giải thích được toàn bộ:

| Thành phần | Vai trò cần nắm |
|---|---|
| `<form>` | Bao bọc biểu mẫu; trong bài này không xử lý gửi dữ liệu thật. |
| `<fieldset>`, `<legend>` | Nhóm các lựa chọn liên hệ và đặt tên nhóm. |
| `<label>` | Gắn mô tả với lựa chọn hoặc ô nhập để thao tác rõ ràng hơn. |
| `<input type="radio">` | Cho phép chọn một nguồn thông tin và một kênh liên hệ ưu tiên. |
| `<input type="email">`, `<input type="tel">` | Nhập email hoặc số điện thoại; `tel` không tự kiểm tra đầy đủ định dạng số Việt Nam. |
| CSS Grid và Flexbox | Sắp xếp nhóm lựa chọn, biểu mẫu và nội dung hỗ trợ. |
| `:has()` | Hiển thị đúng phần thông tin liên hệ theo radio đã chọn, không cần JavaScript. |
| Media queries | Chuyển bố cục phù hợp giữa máy tính và điện thoại. |

**Nội dung tôi đã tự kiểm tra và có thể giải thích:** [Sinh viên xác nhận/bổ sung sau khi đọc mã và chạy thử]
