# SQLite

Chạy `npm run db:init` từ FocusQuest. Trình khởi tạo chạy `schema.sql` và tạo dữ liệu mẫu theo ngày hiện tại. Mở tệp `04-Fullstack/data/focusquest.sqlite` bằng công cụ SQLite hoặc sử dụng `sqlite3 04-Fullstack/data/focusquest.sqlite` nếu đã cài CLI. Xem `queries.sql` để thử truy vấn.

Công việc thuộc danh mục và được liên kết nhiều-nhiều với phiên tập trung qua `focus_session_tasks`. Xóa công việc dùng dấu thời gian `deleted_at` để giữ lịch sử. Sổ phần thưởng `reward_transactions` có khóa sự kiện duy nhất. Thời điểm lưu bằng epoch milliseconds. Hạn công việc lưu theo ngày của người dùng.
