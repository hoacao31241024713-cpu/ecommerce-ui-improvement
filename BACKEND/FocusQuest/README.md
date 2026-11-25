# FocusQuest

**Make every minute a mission.** Ứng dụng TODO cá nhân cho sinh viên UEH. Bạn có thể xem việc hôm nay, thêm hoặc sửa việc, đánh dấu hoàn thành, tìm kiếm tiếng Việt không dấu và xem thống kê theo ngày.

## Chạy trên máy

Yêu cầu Node.js **22.13 trở lên** và npm. Mở terminal tại thư mục chứa `FocusQuest`.

```bash
cd FocusQuest
npm install
npm start
```

Mở **http://localhost:3000**. Server mặc định dùng địa chỉ loopback. Có thể đổi cổng bằng `PORT=3100 npm start`.

| Tiêu chí | Thư mục | Cách mở |
|---|---|---|
| GUI và Prompt Vibe Coding · 1,5 điểm | `01-GUI/`, `docs/PROMPTS.md` | `npm run gui` → http://localhost:3001 |
| Chương trình không có database · 1 điểm | `02-No-Database/` | `npm run mock` → http://localhost:3002. Dữ liệu lưu trong LocalStorage |
| Database · 1 điểm | `03-Database/` | `npm run db:init`, xem schema và truy vấn mẫu |
| Full-stack · 0,5 điểm | `04-Fullstack/` | `npm start` → http://localhost:3000 |

HTML, CSS và JavaScript thuần gọi REST API Express. Back-end dùng `node:sqlite`, truy vấn tham số hóa, khóa ngoại và giao dịch. Dữ liệu được lưu tại `04-Fullstack/data/focusquest.sqlite`; dữ liệu mẫu được tạo một lần khi cơ sở dữ liệu mới khởi tạo. Hai bản tĩnh chứa sẵn tài nguyên cần thiết. Bản GUI dùng dữ liệu trong bộ nhớ và đặt lại khi tải trang.

- `npm run dev` chạy server và tự khởi động lại khi sửa mã.
- `npm run db:seed` bảo đảm cơ sở dữ liệu có dữ liệu mẫu ở lần khởi tạo đầu tiên.
- `npm run db:reset -- --confirm` xóa dữ liệu SQLite hiện tại và tạo lại dữ liệu mẫu.
- `npm test` chạy kiểm thử trên cơ sở dữ liệu tạm.
- `npm run build:static` đồng bộ lại giao diện cho hai bản tĩnh sau khi sửa mã nguồn.

## Demo nhanh

Mở **Hôm nay** rồi thêm công việc ưu tiên **Cao**. Gõ từ khóa không dấu và lọc theo ưu tiên. Sửa tiêu đề, đánh dấu hoàn thành và mở **Thống kê → Hôm nay** để xem kết quả. Tại **Tất cả công việc**, lưu trữ rồi khôi phục từ tab **Lưu trữ**. Khởi động lại server để minh họa dữ liệu vẫn tồn tại.

## GitHub

Tạo repository trên GitHub rồi đẩy thư mục dự án từ máy của bạn. Nếu bắt đầu repository mới, mở terminal tại `FocusQuest`, chạy `git init -b main`, `git add .`, `git commit -m "Add FocusQuest"`, `git remote add origin <URL-repository>` và `git push -u origin main`. Nếu nộp trong repository môn học có sẵn, thêm thư mục `FocusQuest` vào repository đó.

Có thể đưa riêng nội dung `01-GUI` hoặc `02-No-Database` lên GitHub Pages. Bản Express và SQLite cần chạy bằng Node.js trên localhost hoặc máy chủ hỗ trợ Node.js.

[Xem prompt Vibe Coding](docs/PROMPTS.md) · [Thiết kế SQLite](03-Database/README.md)

## Pomodoro và trang trí phòng

Trong **Phòng tập trung**, chọn thời lượng và công việc trước khi bắt đầu. Đánh dấu công việc ngay trong phiên. Tổng kết phân biệt phiên đầy đủ với phiên kết thúc sớm. Thời lượng mặc định là 25 phút. Để demo nhanh, đặt phiên 1 phút, chọn một công việc có ước lượng ngắn và chờ hết giờ. Dùng Coins trong **Cửa hàng**, rồi mở **Phòng của tôi** để đặt vật phẩm tại một vị trí trống.

Các mục Kanban, lịch, trò chơi trong giờ nghỉ, song ngữ, heatmap và âm thanh nâng cao được hoãn theo phạm vi nộp bài rút gọn.

## Kiểm thử đã chạy

Hai bài kiểm thử tích hợp API đã qua. Chrome headless đã xác minh luồng công việc, trang thống kê, Pomodoro, mua và đặt vật phẩm, giao diện 320 px và cả hai bản tĩnh. Xem [báo cáo kiểm thử](docs/TEST_REPORT.md).
