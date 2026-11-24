# BÀI TẬP CÁ NHÂN BUỔI 4 – JAVASCRIPT LABS

**Học phần:** Phát triển ứng dụng Thương mại điện tử  
**Chủ đề:** JavaScript – Language Foundations, DOM & Events, jQuery

## 1. Thông tin sinh viên

| Thông tin | Nội dung |
|---|---|
| Họ và tên | Cao Thị Tuyết Hoa |
| Mã số sinh viên | 31241024713 *(theo nội dung báo cáo Word; cần đối chiếu với tên file nộp)* |
| Lớp học phần | [Cần bổ sung] |
| Giảng viên | TS. Nguyễn Mạnh Tuấn |
| GitHub Repository | [Cần bổ sung đường dẫn repository hiện có] |
| GitHub Pages | [Cần bổ sung đường dẫn website đã triển khai] |

> **Lưu ý trước khi nộp:** Tên file báo cáo được cung cấp ghi MSSV `31241024712`, trong khi mục Thông tin sinh viên bên trong ghi `31241024713`. Cần xác nhận MSSV đúng và thống nhất ở README, báo cáo và tên file nộp.

## 2. Giới thiệu và mục tiêu

Dự án tổng hợp bài thực hành **Lab 08, Lab 09 và Lab 10** trong học phần Phát triển ứng dụng Thương mại điện tử. Mục tiêu là củng cố nền tảng JavaScript, thực hành truy xuất và thay đổi nội dung trang web qua DOM, xử lý các sự kiện người dùng, đồng thời sử dụng thư viện jQuery để thao tác giao diện, tạo hiệu ứng và tải dữ liệu bất đồng bộ.

Các kiến thức này là cơ sở để xây dựng những chức năng thường gặp trên website thương mại điện tử như kiểm tra biểu mẫu đăng ký, cập nhật thông tin sản phẩm, tương tác với giỏ hàng và hiển thị dữ liệu được tải từ dịch vụ bên ngoài.

## 3. Cấu trúc thư mục

Thư mục `JavaScript-Labs` được tổ chức theo định hướng của đề bài:

```text
Existing-Repository/
└── JavaScript-Labs/
    ├── index.html              # Trang chủ giới thiệu và điều hướng
    ├── css/                    # CSS cho trang chủ (nếu có)
    ├── js/                     # JavaScript cho trang chủ (nếu có)
    ├── Lab08/
    │   ├── index.html          # Trang điều hướng Lab 08
    │   └── Exercise01/ ...     # Mã nguồn và tài nguyên các bài 8.1–8.11
    ├── Lab09/
    │   ├── index.html          # Trang điều hướng Lab 09
    │   └── ...                 # Mã nguồn và tài nguyên các bài 9.1–9.8
    ├── Lab10/
    │   ├── index.html          # Trang điều hướng Lab 10
    │   └── ...                 # Mã nguồn và tài nguyên các bài 10.1–10.10
    └── README.md
```

*Cấu trúc trên là sơ đồ định hướng theo đề bài, không phải bản kiểm kê đã xác minh trên GitHub. Các thư mục con của từng Lab có thể được sắp xếp theo bộ mã nguồn thực tế.*

## 4. Nội dung thực hành

### Lab 08 – JavaScript 1: Language Foundations

**11 Exercise (8.1–8.11).** Em thực hành bật/tắt JavaScript trong trình duyệt; sử dụng JavaScript nhúng và tệp JavaScript bên ngoài; tìm hiểu thẻ `noscript` và Browser Console; làm việc với các đối tượng dựng sẵn như `String`, `Date`, `Math`; sử dụng mảng, hàm, phạm vi biến, đối tượng và mảng đối tượng. Kết quả minh chứng trong báo cáo bao gồm hộp thoại `Hello World!`, bảng lịch, bảng tính tổng đơn hàng và danh sách quốc gia.

[Truy cập Lab 08](./Lab08/)

### Lab 09 – JavaScript 2: DOM and Events

**8 Exercise (9.1–9.8).** Em thực hành chọn và duyệt các nút DOM; thay đổi nội dung, thuộc tính và kiểu hiển thị; thêm và xóa phần tử; xử lý sự kiện `click`, `mouseover`, `mouseout`, `load`, `focus`, `blur`; sử dụng công cụ gỡ lỗi và kiểm tra các trường nhập trong biểu mẫu. Báo cáo có minh chứng về thay đổi giao diện, tương tác ẩn/hiện nội dung và thông báo khi biểu mẫu còn thiếu dữ liệu.

[Truy cập Lab 09](./Lab09/)

### Lab 10 – JavaScript 3: jQuery

**10 Exercise (10.1–10.10).** Em thực hành nạp thư viện jQuery; dùng các bộ chọn để truy xuất phần tử; xử lý sự kiện; chèn các phần tử DOM; tạo hiệu ứng `fade`, `slide` và `animate`; hiển thị ảnh xem trước; gửi yêu cầu GET lấy dữ liệu JSON và xử lý kết quả qua `jqXHR` với `.done()`, `.fail()`, `.always()`.

[Truy cập Lab 10](./Lab10/)

## 5. Truy cập và chạy bài thực hành

**Trên GitHub Pages:**

1. Mở trang chủ: **[Cần bổ sung URL GitHub Pages]**.
2. Chọn **Lab 08**, **Lab 09** hoặc **Lab 10** từ trang chủ.
3. Tại trang của từng Lab, chọn Exercise cần xem và thực hiện thao tác tương tác trên trình duyệt.

Đường dẫn dự kiến sau khi triển khai sẽ có dạng:

```text
https://<username>.github.io/<repository>/JavaScript-Labs/
https://<username>.github.io/<repository>/JavaScript-Labs/Lab08/
https://<username>.github.io/<repository>/JavaScript-Labs/Lab09/
https://<username>.github.io/<repository>/JavaScript-Labs/Lab10/
```

**Chạy cục bộ bằng VS Code:**

1. Tải hoặc clone repository về máy tính.
2. Mở thư mục `JavaScript-Labs` bằng Visual Studio Code.
3. Mở `index.html` bằng **Live Server** hoặc **Live Preview**.
4. Truy cập từng Lab và Exercise; nhấn `F12` để mở Developer Tools khi cần xem Console, Elements, Sources hoặc Network.
5. Với các bài GET Requests, cần kiểm tra kết nối mạng và phản hồi dịch vụ. Kết quả có thể khác khi API cũ không còn truy cập được.

## 6. Báo cáo kết quả

Báo cáo Word trình bày nội dung thực hiện và ảnh minh chứng của cả ba Lab, với các phần: Thông tin sinh viên, Lab 08, Lab 09, Lab 10 và Tổng kết.

**Tên file báo cáo sau khi xác nhận MSSV:** `<MSSV>_CaoThiTuyetHoa_JavaScript_Labs.docx`.

Bài thực hành được thực hiện trên cả máy tính để bàn Dell và MacBook, vì vậy một số ảnh chụp có sự khác biệt về giao diện. Khi kiểm tra sản phẩm, cần đối chiếu mã nguồn với kết quả thực tế trên trình duyệt.

---

*Tài liệu tham chiếu: `BaiTap_CaNhan_JS.pdf`, `Lab08.pdf`, `Lab09.pdf`, `Lab10.pdf` và báo cáo Word của sinh viên.*
