# Kiểm thử FocusQuest

| Kiểm thử | Kết quả |
|---|---|
| Khởi động Express, API health, phục vụ HTML | PASS |
| CRUD công việc, tiêu đề rỗng, xóa mềm và khôi phục | PASS |
| Tìm kiếm tiếng Việt bỏ dấu kết hợp ngày, ưu tiên, trạng thái | PASS |
| Thống kê thay đổi khi hoàn thành công việc | PASS |
| SQLite bật khóa ngoại, dữ liệu tồn tại sau khi đóng và mở lại server cùng tệp DB | PASS |
| Pomodoro 25 phút, xác nhận vượt tải, pause/resume sau khi mở lại DB, timer hết giờ bằng đồng hồ giả | PASS |
| Checklist đồng bộ và giữ nguyên việc chưa hoàn thành, thưởng đúng một lần, lưu phiên kết thúc sớm | PASS |

Chạy lại bằng `npm test`. Bộ kiểm thử dùng SQLite trong thư mục tạm và cổng loopback ngẫu nhiên.

| Kiểm thử Chrome headless bằng Playwright | Kết quả |
|---|---|
| Full-stack: thêm, sửa, hoàn thành, lưu trữ, tìm kiếm và lọc; mở ba biểu đồ thống kê | PASS |
| Pomodoro: bắt đầu, tạm dừng, tải lại khi tạm dừng, tiếp tục, kết thúc sớm và xem tổng kết | PASS |
| Cửa hàng: mua ghế, đặt vào góc phòng, giữ vị trí sau khi tải lại | PASS |
| Rộng 320 px: phòng cá nhân, menu di động và trang Hôm nay không cuộn ngang | PASS |
| Bản GUI tĩnh hiển thị việc mẫu, không gọi REST API | PASS |
| Bản LocalStorage thêm việc, giữ dữ liệu sau khi tải lại, không gọi REST API | PASS |

Phạm vi kiểm thử trình duyệt tập trung vào các luồng nộp bài. Bài test trình duyệt chạy với Chrome cài sẵn và database thử riêng. Các kịch bản nâng cao ngoài danh sách trên chưa được xác minh.
