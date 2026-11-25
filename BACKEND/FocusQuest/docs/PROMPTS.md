MASTER PROMPT — FOCUSQUEST V1.0
1. ROLE — VAI TRÒ
Bạn là một đội ngũ phát triển sản phẩm phần mềm cấp Senior, đồng thời đảm nhiệm các vai trò:
Product Manager.
Product Designer.
UI/UX Designer.
Front-end Developer.
Back-end Developer.
Database Engineer.
Game Developer.
Quality Assurance Engineer.
Technical Writer.
Bạn có quyền thực hiện các quyết định kỹ thuật nhỏ cần thiết để hoàn thiện sản phẩm, miễn là không làm thay đổi định hướng, phạm vi, yêu cầu nghiệp vụ và tiêu chí nghiệm thu được quy định trong prompt này.
Nhiệm vụ của bạn là trực tiếp thiết kế, lập trình, tích hợp, kiểm thử và hoàn thiện ứng dụng Full-stack trong workspace hiện tại.
Không chỉ đưa ra kế hoạch, hướng dẫn hoặc các đoạn mã rời rạc. Hãy trực tiếp tạo, chỉnh sửa và tổ chức các file cần thiết.
2. CONTEXT — BỐI CẢNH
Tôi là sinh viên ngành Thương mại điện tử tại Đại học Kinh tế Thành phố Hồ Chí Minh (UEH), đang thực hiện bài tập môn Phát triển ứng dụng Thương mại điện tử.
Bài tập cơ bản hiện có hai file:
Bai1.html: thực hành CSS Animation, hiệu ứng chữ và logo UEH.
HelloWorld.js: thực hành khởi tạo HTTP Server bằng Node.js trên port 8080.
Hai file này thuộc phần bài tập cơ bản. Không chỉnh sửa, ghi đè hoặc xóa chúng.
Giảng viên yêu cầu phát triển thêm một TODO App quản lý công việc cá nhân với các chức năng bắt buộc:
Hiển thị công việc trong ngày hôm nay.
Tìm kiếm và lọc công việc.
Thêm, sửa, xóa công việc.
Trang thống kê.
Có thể sử dụng Mock Data.
Đưa mã nguồn lên GitHub.
Có README mô tả các chức năng của hệ thống.
Thang điểm bổ sung:
GUI và Prompt Vibe Coding: 1,5 điểm.
Chương trình không có cơ sở dữ liệu: 1 điểm.
Database: 1 điểm.
Chương trình Full-stack: 0,5 điểm.
Tôi không muốn chỉ hoàn thành các yêu cầu tối thiểu. Tôi muốn phát triển sản phẩm có giao diện chuyên nghiệp, sáng tạo, có chiều sâu về nghiệp vụ và đủ chất lượng để sử dụng trong portfolio cá nhân.
3. PRODUCT VISION
Tên sản phẩm: FocusQuest.
Tagline: Make every minute a mission.
Product Category: Personal Productivity & Gamified Focus Workspace.
Đối tượng sử dụng: sinh viên, người học tập và người làm việc cá nhân.
FocusQuest là ứng dụng quản lý năng suất cá nhân, kết hợp:
Task Management.
Task-driven Pomodoro.
Productivity Analytics.
Gamification.
Virtual Workspace Customization.
Product Loop:
PLAN → FOCUS → COMPLETE → REWARD → GROW → REFLECT.
Người dùng lập danh sách công việc, lựa chọn nhiệm vụ cho phiên tập trung, thực hiện trong khoảng thời gian đã định, nhận phần thưởng dựa trên kết quả thực tế và sử dụng phần thưởng để xây dựng không gian cá nhân.
North Star Metric: Số phiên tập trung hoàn thành ít nhất một nhiệm vụ đã lên kế hoạch mỗi tuần.
Nguyên tắc quan trọng:
Người dùng không chơi game để trì hoãn công việc. Người dùng hoàn thành công việc để tiến triển trong game.
4. PRODUCT REFERENCES
Tham khảo định hướng chức năng và thiết kế từ các sản phẩm:
Shinmei: https://shinmei.ai/room — Focus Room và trải nghiệm tập trung theo nhiệm vụ như mô tả trong prompt.
TickTick: https://ticktick.com/ — quản lý task, lịch, Pomodoro.
Linear: https://linear.app/ — giao diện SaaS chuyên nghiệp.
Notion: https://www.notion.com/ — bố cục và tổ chức thông tin.
Forest: https://www.forestapp.cc/ — phần thưởng từ thời gian tập trung.
Habitica: https://habitica.com/ — Gamification.
LifeAt: https://www.lifeat.com/ — không gian tập trung.
Nếu có khả năng truy cập các website tham khảo, hãy nghiên cứu nhanh trải nghiệm và chọn lọc các design pattern phù hợp.
Nếu không truy cập được, tiếp tục thực hiện theo bản đặc tả này, không để việc nghiên cứu đối thủ trở thành blocker.
Không sao chép nguyên bản giao diện, thương hiệu, hình ảnh, mã nguồn hoặc tài nguyên có bản quyền của đối thủ.
5. TECHNICAL STACK
Sử dụng kiến trúc đơn giản, dễ chạy, dễ bảo trì và phù hợp với sinh viên.
Front-end:
HTML5.
CSS3.
Vanilla JavaScript ES6+.
JavaScript Modules khi phù hợp.
CSS Grid.
Flexbox.
CSS Custom Properties.
Lucide Icons hoặc hệ thống SVG icon thống nhất.
Chart.js cho biểu đồ.
SVG, CSS hoặc HTML5 Canvas cho game.
Web Audio API hoặc HTML Audio API cho âm thanh.
Back-end:
Node.js.
Express.js.
RESTful API.
Database:
SQLite thực sự.
Ưu tiên thư viện SQLite tương thích với phiên bản Node.js hiện có.
Kiểm tra phiên bản Node.js trước khi lựa chọn thư viện.
Có thể sử dụng node:sqlite nếu môi trường hỗ trợ phù hợp.
Bật Foreign Key Constraints.
Sử dụng Prepared Statements hoặc Parameterized Queries.
Có schema, seed data và migration hoặc cơ chế khởi tạo Database.
Testing:
Node.js Test Runner hoặc công cụ kiểm thử nhẹ tương đương.
API Integration Testing.
Browser Testing bằng Playwright nếu môi trường hỗ trợ.
Không sử dụng React, Next.js, TypeScript, Docker, microservices hoặc các framework phức tạp không cần thiết.
Không yêu cầu API key, dịch vụ trả phí, Cloud Database hoặc tài khoản bên thứ ba để chạy các chức năng chính.
Ứng dụng phải chạy được trên localhost.
Ưu tiên sử dụng port 3000 và hỗ trợ cấu hình bằng biến môi trường PORT để không xung đột với HelloWorld.js đang sử dụng port 8080.
6. WORKSPACE SAFETY RULES
Trước khi lập trình:
Kiểm tra workspace và các file hiện có.
Kiểm tra phiên bản Node.js, npm và các công cụ khả dụng.
Kiểm tra trạng thái Git nếu workspace là repository.
Xác định các file bài tập cũ cần bảo vệ.
Tạo thư mục FocusQuest riêng biệt.
Không được:
Xóa hoặc ghi đè Bai1.html.
Xóa hoặc ghi đè HelloWorld.js.
Chỉnh sửa các bài tập không liên quan.
Ghi đè toàn bộ repository.
Sử dụng git reset --hard.
Sử dụng git push --force.
Tự động push hoặc publish lên GitHub khi chưa được người dùng yêu cầu.
Tự động ghi đè các thay đổi chưa commit của người dùng.
Cài đặt package toàn cục nếu không cần thiết.
Đưa thông tin bí mật hoặc credentials vào mã nguồn.
Tự động tạo repository Git lồng nhau nếu workspace đã là một Git repository.
Chỉ tạo và chỉnh sửa file trong thư mục FocusQuest, trừ khi được người dùng cho phép rõ ràng.
7. PROJECT STRUCTURE
Tổ chức sản phẩm theo từng giai đoạn tương ứng với thang điểm giảng viên.
Cấu trúc tham khảo:
FocusQuest/
├── README.md
├── package.json
├── package-lock.json
├── .gitignore
│
├── 01-GUI/
│   ├── index.html
│   ├── styles/
│   ├── assets/
│   └── README.md
│
├── 02-No-Database/
│   ├── index.html
│   ├── styles/
│   ├── scripts/
│   ├── assets/
│   └── README.md
│
├── 03-Database/
│   ├── schema.sql
│   ├── seed.sql
│   ├── queries.sql
│   ├── ERD.md
│   └── README.md
│
├── 04-Fullstack/
│   ├── public/
│   │   ├── index.html
│   │   ├── styles/
│   │   ├── scripts/
│   │   └── assets/
│   ├── server/
│   │   ├── server.js
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── middleware/
│   │   └── database/
│   ├── data/
│   └── tests/
│
└── docs/
    ├── PRD.md
    ├── PROMPTS.md
    ├── DESIGN_SYSTEM.md
    ├── USER_FLOW.md
    ├── API.md
    ├── TEST_REPORT.md
    ├── DEMO_GUIDE.md
    ├── IMPLEMENTATION_LOG.md
    └── THIRD_PARTY_LICENSES.md
Có thể điều chỉnh cấu trúc chi tiết để phù hợp với kỹ thuật thực tế, nhưng phải bảo toàn bốn giai đoạn đánh giá độc lập.
Mỗi giai đoạn phải có README riêng và có thể được giảng viên kiểm tra.
Không để phiên bản không có Database vô tình phụ thuộc vào SQLite hoặc API của phiên bản Full-stack.
Có thể sử dụng data adapter chung trong quá trình phát triển để giảm mã nguồn trùng lặp, nhưng phải bảo đảm các phiên bản bàn giao hoạt động độc lập.
8. DESIGN SYSTEM
8.1. Visual Direction
Thiết kế theo định hướng:
Premium Minimal SaaS × Immersive Focus × Cozy Gamification.
Sản phẩm phải có cảm giác như một ứng dụng thương mại thực sự, không phải một template dashboard cơ bản hoặc bài tập HTML/CSS.
Tham khảo sự tinh tế về UI của Linear, Notion và các sản phẩm productivity hiện đại.
8.2. Color Palette
Dark Mode mặc định:
Background: #101114.
Surface: #191B20.
Elevated Surface: #22242B.
Primary Accent: #A394F8.
Primary Text: #F4F4F5.
Secondary Text: #989AA5.
Border: #2B2D35.
Success: #4ADEA0.
Warning/Reward: #E8B86D.
Danger: #F87171.
Info: #60A5FA.
Xây dựng Light Mode với màu tương ứng và đảm bảo độ tương phản.
Sử dụng CSS Variables làm design tokens. Không khai báo màu tùy tiện rải rác trong toàn bộ mã nguồn.
8.3. Typography
Ưu tiên Inter hoặc Manrope có hỗ trợ đầy đủ tiếng Việt.
Có system font fallback khi không có Internet.
Phân cấp typography rõ ràng.
Sử dụng tabular numbers cho Timer và các chỉ số thống kê.
Hạn chế chữ in hoa và font-weight quá đậm.
8.4. Layout
Desktop-first.
Sidebar bên trái có khả năng thu gọn.
Main content được bố trí cân đối, sử dụng khoảng trắng hợp lý.
Top bar bao gồm:
Breadcrumb hoặc tên trang.
Quick Add.
Theme switcher.
Thông tin level và Coins.
User profile.
Responsive:
Desktop: full sidebar.
Tablet: collapsed sidebar.
Mobile: drawer hoặc bottom navigation.
Focus Room phải hoạt động tốt trên điện thoại.
Không có horizontal overflow ở kích thước 320px trở lên.
8.5. UI Components
Xây dựng hệ thống component đồng nhất:
Buttons.
Input fields.
Search box.
Select.
Dropdown.
Modal.
Drawer.
Tooltip.
Toast notifications.
Tabs.
Task cards.
Progress bars.
Empty states.
Loading states.
Error states.
Confirmation dialogs.
Keyboard shortcuts.
Các thành phần cần có hover, active, focus-visible và disabled states.
8.6. Motion Design
Sử dụng animation có mục đích:
Hover transitions.
Task completion animation.
Progress animations.
Timer ring animation.
Reward reveal.
Level-up animation.
Page transitions nhẹ.
Tương tác với vật phẩm trong phòng.
Hỗ trợ prefers-reduced-motion.
Không lạm dụng gradient, neon glow, hiệu ứng glassmorphism, shadow quá mạnh hoặc card bo tròn quá mức.
Không sử dụng emoji làm icon điều hướng chính.
Không sử dụng chữ placeholder Lorem ipsum hoặc hình ảnh không liên quan.
8.7. Language
Tiếng Việt là ngôn ngữ mặc định.
Hỗ trợ chuyển sang tiếng Anh thông qua một dictionary i18n đơn giản.
Không trộn ngôn ngữ tùy tiện trong cùng một giao diện.
Lưu lựa chọn theme, ngôn ngữ và cài đặt cá nhân.
9. INFORMATION ARCHITECTURE
Xây dựng các trang hoặc view sau:
WORKSPACE
Overview.
Today.
All Tasks.
Kanban.
Calendar.
FOCUS
Focus Room.
Focus History.
Break Room.
QUEST WORLD
My Room.
Item Shop.
Inventory.
Achievements.
INSIGHTS
Analytics.
SYSTEM
Settings.
Có thể sử dụng SPA nhẹ bằng Vanilla JavaScript và hash-based routing hoặc kiến trúc nhiều trang phù hợp.
Các mục điều hướng phải hoạt động thực sự.
Hỗ trợ browser back/forward và khôi phục view phù hợp khi reload.
10. FUNCTIONAL REQUIREMENTS
10.1. Overview Dashboard
Hiển thị:
Lời chào người dùng.
Ngày hiện tại theo múi giờ địa phương.
Tổng số công việc hôm nay.
Số task hoàn thành.
Tỷ lệ hoàn thành.
Tổng thời gian tập trung hôm nay.
Số phiên tập trung.
Daily Streak.
Daily Mission.
Level và XP Progress.
Focus Coins.
Các công việc ưu tiên.
Biểu đồ năng suất 7 ngày gần nhất.
Nút Quick Add Task.
Nút Start Focus Session.
Preview căn phòng cá nhân.
Không hardcode số liệu vào Dashboard sau khi đã tích hợp dữ liệu.
10.2. Task Management
Hỗ trợ đầy đủ CRUD:
CREATE:
Thêm công việc.
Tiêu đề bắt buộc.
Mô tả.
Ngày thực hiện hoặc deadline.
Category.
Priority.
Estimated duration.
Subtasks.
READ:
Hiển thị công việc hôm nay mặc định.
Xem toàn bộ công việc.
Xem công việc quá hạn.
Xem công việc sắp tới.
Xem công việc đã hoàn thành.
Tìm kiếm không phân biệt chữ hoa, chữ thường.
Ưu tiên hỗ trợ tìm kiếm tiếng Việt không dấu.
UPDATE:
Chỉnh sửa nội dung.
Thay đổi trạng thái.
Thay đổi priority.
Thay đổi deadline.
Đánh dấu hoàn thành.
Khôi phục trạng thái chưa hoàn thành.
Chỉnh sửa subtasks.
DELETE:
Xác nhận trước khi xóa.
Soft delete để bảo toàn lịch sử.
Có thể khôi phục từ Archive nếu phù hợp.
Trạng thái:
Todo.
In Progress.
Completed.
Mức độ ưu tiên:
Low.
Medium.
High.
Urgent.
Bộ lọc:
Date.
Status.
Category.
Priority.
Search keyword.
Sắp xếp:
Deadline.
Priority.
Date created.
Alphabetical.
Estimated duration.
Các bộ lọc có thể sử dụng kết hợp.
Hỗ trợ Quick Add và phím tắt phù hợp, không kích hoạt phím tắt khi người dùng đang nhập nội dung.
10.3. Kanban Board
Xây dựng ba cột:
Todo.
In Progress.
Completed.
Hỗ trợ kéo thả task giữa các cột.
Khi thả task:
Cập nhật trạng thái.
Lưu thay đổi vào data layer.
Đồng bộ với Today, All Tasks, Overview và Analytics.
Áp dụng đúng quy tắc phần thưởng.
Có thao tác thay thế bằng menu hoặc button để hỗ trợ người dùng mobile và keyboard.
10.4. Calendar
Xây dựng Monthly Calendar.
Cho phép:
Chuyển tháng.
Quay về ngày hôm nay.
Chọn ngày.
Hiển thị danh sách task theo ngày.
Tạo task trực tiếp từ ngày được chọn.
Hiển thị task quá hạn phù hợp.
Calendar phải sử dụng dữ liệu thực từ Task Manager, không sử dụng một bộ dữ liệu riêng biệt.
11. FOCUS ROOM — CORE FEATURE
Focus Room là tính năng trọng tâm và phải được đầu tư đặc biệt về giao diện, logic và trải nghiệm.
11.1. Session Planning
Trước khi bắt đầu phiên tập trung, người dùng có thể:
Chọn chế độ 25 phút tập trung / 5 phút nghỉ.
Chọn chế độ 50 phút tập trung / 10 phút nghỉ.
Chọn chế độ 90 phút tập trung.
Tùy chỉnh thời gian tập trung và thời gian nghỉ.
Cấu hình số vòng Pomodoro.
Chọn task từ Task Manager.
Tạo task mới ngay trong Focus Room.
Sắp xếp thứ tự nhiệm vụ.
Xem tổng thời gian dự kiến.
Ví dụ:
Thời gian phiên tập trung: 25 phút.
Task A: 10 phút.
Task B: 10 phút.
Task C: 10 phút.
Hiển thị cảnh báo rằng tổng thời gian dự kiến vượt quá thời gian phiên 5 phút.
Cho phép người dùng điều chỉnh kế hoạch hoặc xác nhận tiếp tục.
Phân biệt task chưa có ước lượng thời gian với task có thời gian ước lượng bằng 0.
Không cho phép bắt đầu một phiên có thời lượng bằng 0 hoặc giá trị không hợp lệ.
Cho phép chế độ Free Focus không có task, nhưng phân biệt rõ với Task-driven Focus và không cấp thưởng hoàn thành checklist cho phiên không có task.
11.2. Active Focus Session
Giao diện tập trung gồm:
Countdown timer kích thước lớn.
Circular progress indicator.
Session 01/04.
Session checklist.
Progress công việc.
Play/Pause.
Resume.
Reset với xác nhận.
End Session.
Fullscreen.
Ambient sound.
Volume control.
Distraction log.
Background theme.
Trong phiên tập trung, người dùng có thể tick hoàn thành từng nhiệm vụ.
Khi một task hoàn thành:
Cập nhật trạng thái ngay.
Đồng bộ với Task Manager.
Cập nhật số liệu.
Ghi nhận thời điểm hoàn thành.
Hiển thị micro-interaction tinh tế.
Không tự động đánh dấu tất cả task hoàn thành khi timer kết thúc.
11.3. Timer Accuracy
Không xây dựng timer bằng cách chỉ giảm một biến đi 1 sau mỗi setInterval.
Sử dụng timestamp, elapsed time và deadline để tính thời gian thực tế.
Timer phải:
Chính xác khi chuyển tab.
Khôi phục sau reload.
Giữ trạng thái khi chuyển trang trong ứng dụng.
Không tính thời gian paused.
Không tạo nhiều interval chồng lên nhau.
Không cho phép nhiều phiên tập trung active cùng lúc.
Không hoàn thành hoặc cấp thưởng hai lần.
Lưu trạng thái tối thiểu gồm:
Session ID.
Started at.
Target duration.
Current phase.
Paused duration.
Accumulated focused time.
Current round.
Associated tasks.
Session status.
Khi người dùng quay lại sau thời điểm hết giờ, xử lý hoàn thành phiên một cách nhất quán dựa trên timestamp đã lưu.
Không tự động tính hàng loạt phiên Pomodoro mà người dùng không thực sự bắt đầu.
Cập nhật document.title để hiển thị thời gian còn lại trên tab trình duyệt.
11.4. Session State Machine
Quản lý trạng thái rõ ràng:
Idle.
Running.
Paused.
Completed.
Ended Early.
Cancelled.
Tách riêng phase:
Focus.
Short Break.
Long Break.
Không trộn trạng thái phiên với trạng thái công việc.
Mọi transition phải có quy tắc hợp lệ.
11.5. Session Review
Khi phiên kết thúc, hiển thị:
Planned duration.
Actual focused duration.
Number of planned tasks.
Number of completed tasks.
Completion rate.
XP earned.
Coins earned.
Session status.
Công việc chưa hoàn thành.
Cho phép:
Bắt đầu thời gian nghỉ.
Chuyển task chưa hoàn thành sang phiên tiếp theo.
Quay về Dashboard.
Xem lịch sử phiên tập trung.
Chỉ hiển thị phần thưởng thực tế đã được ghi nhận.
Không gọi một phiên kết thúc sớm là phiên hoàn thành đầy đủ.
12. GAMIFICATION
12.1. Game Concept
Game chính: Build Your Dream Room.
Người dùng sở hữu một căn phòng ảo ban đầu.
Thông qua việc hoàn thành công việc và phiên tập trung, người dùng kiếm XP và Focus Coins để mua nội thất, trang trí và nâng cấp căn phòng.
Căn phòng có thể được sử dụng làm không gian trực quan trong Focus Room.
Thiết kế theo hướng cozy, minimalist, isometric hoặc 2D có chiều sâu.
Ưu tiên sử dụng SVG, CSS hoặc Canvas và tài nguyên tự tạo để đảm bảo độ đồng nhất.
Không cần WebGL hoặc 3D engine phức tạp.
12.2. Reward System
Quy tắc mặc định:
Hoàn thành một task: +10 XP, +5 Coins.
Hoàn thành phiên tập trung 25 phút: +25 XP, +15 Coins.
Hoàn thành toàn bộ task trong một phiên focus đầy đủ: +30 XP, +20 Coins.
Hoàn thành Daily Mission: +50 XP, +30 Coins.
Đạt streak 7 ngày lần đầu: +100 XP, +50 Coins.
Phần thưởng phiên focus tính theo thời lượng kế hoạch thực sự hoàn thành:
Focus XP = floor(planned minutes × 25 / 25).
Focus Coins = floor(planned minutes × 15 / 25).
Mức thưởng tối thiểu bằng 0.
Phiên kết thúc sớm vẫn lưu thời gian tập trung thực tế nhưng không nhận phần thưởng hoàn thành phiên đầy đủ.
Phần thưởng checklist chỉ áp dụng khi phiên có ít nhất một task đã được lên kế hoạch trước khi bắt đầu và toàn bộ các task này được hoàn thành trong phiên.
Không cấp thưởng dựa trên task đã hoàn thành từ trước.
Không cho phép tạo task trùng hoặc thay đổi danh sách cuối phiên để khai thác phần thưởng checklist.
Quy tắc Daily Mission:
Hoàn thành ít nhất 3 task trong ngày.
Daily Mission chỉ nhận thưởng một lần cho mỗi ngày địa phương.
Streak được tính theo các ngày có ít nhất một phiên focus đầy đủ.
Không yêu cầu người dùng phải tập trung liên tục hàng ngày bằng cơ chế trừng phạt.
12.3. Reward Integrity
Toàn bộ logic phần thưởng của phiên bản Full-stack phải được xử lý ở Back-end.
Không tin giá trị Coins hoặc XP được gửi từ Front-end.
Sử dụng reward_transactions để lưu lịch sử.
Áp dụng unique event key hoặc idempotency key.
Không được nhận thưởng nhiều lần từ cùng một sự kiện.
Khi undo task completion:
Thu hồi phần thưởng tương ứng đã ghi nhận cho task.
Đảm bảo re-complete không nhân đôi phần thưởng.
Không cho phép mua vật phẩm với số dư không đủ.
Nếu Coins đã được sử dụng trước khi undo, cho phép số dư tạm thời âm để phản ánh khoản cần bù và không cho mua thêm cho đến khi đủ số dư.
Không để XP âm.
Không âm thầm sửa lịch sử phiên đã kết thúc.
Phần thưởng Daily Mission và Session Completion là các mốc đã đạt tại thời điểm ghi nhận, không tự cấp lại khi undo/re-complete task.
Lưu quy tắc rõ ràng trong tài liệu nghiệp vụ.
Sử dụng Database Transaction khi thực hiện các thao tác cập nhật số dư và tạo giao dịch phần thưởng.
12.4. Level System
Level = floor(total XP / 100) + 1.
Progress to next level = total XP modulo 100.
Hiển thị:
Current level.
Total XP.
Progress bar.
Next level requirement.
Có animation và toast nhẹ khi lên cấp.
12.5. Item Shop
Tạo ít nhất 12 vật phẩm thuộc các nhóm:
Desk.
Chair.
Lamp.
Plant.
Computer.
Bookshelf.
Wall Decoration.
Pet.
Clock.
Rug.
Window Theme.
Ambient Decoration.
Mỗi vật phẩm có:
ID.
Name.
Description.
Category.
Price.
Required level.
Asset.
Ownership status.
Giá đề xuất trong khoảng 15–200 Coins.
Cửa hàng phải:
Hiển thị giá.
Hiển thị vật phẩm đã sở hữu.
Kiểm tra điều kiện level.
Kiểm tra số dư.
Xác nhận giao dịch.
Cập nhật Inventory.
Không mua trùng vật phẩm không hỗ trợ nhiều bản.
Có phản hồi thành công hoặc thất bại.
Việc mua vật phẩm phải là giao dịch nguyên tử trong Database, không xảy ra trường hợp trừ tiền nhưng không thêm vật phẩm.
12.6. Room Customization
Xây dựng căn phòng có thể tương tác thực tế.
Yêu cầu:
Căn phòng mặc định có một số nội thất cơ bản.
Hiển thị Inventory.
Chọn vật phẩm để đặt trong phòng.
Kéo thả vật phẩm hoặc chọn vị trí bằng điều khiển tương ứng.
Giới hạn vị trí hợp lệ.
Có chức năng tháo vật phẩm về Inventory.
Lưu tọa độ và trạng thái bố trí.
Khôi phục căn phòng sau reload.
Có hiệu ứng tương tác với vật phẩm.
Các hotspot:
Đồng hồ: mở Focus Room.
Máy tính: mở Task Manager.
Kệ sách: mở Achievements.
Radio hoặc đèn: thay đổi âm thanh hoặc môi trường.
Không làm chức năng trang trí chỉ là một danh sách emoji. Cần có không gian phòng trực quan với các tài nguyên đồ họa nhất quán.
Nếu kéo thả tự do gây quá nhiều lỗi, được phép sử dụng placement slots hoặc lưới bố trí có giới hạn để bảo đảm trải nghiệm ổn định.
12.7. Break Room Mini-game
Game được chọn: Memory Match.
Yêu cầu:
Lưới 4×4.
8 cặp thẻ.
Shuffle khi bắt đầu ván mới.
Flip animation.
Matching logic.
Move counter.
Elapsed time.
Best score hoặc best time.
Restart.
Victory state.
Chỉ mở trò chơi khi đang trong một phiên nghỉ hợp lệ.
Khi thời gian nghỉ kết thúc, tự động dừng game và thông báo cho người dùng.
Không cấp Focus Coins hoặc XP từ mini-game.
Không để game gây gián đoạn timer chính.
Nếu người dùng chuyển trang, phải quản lý trạng thái và dọn event listeners phù hợp.
12.8. Achievements
Tạo ít nhất 8 thành tích:
First Quest.
First Focus.
Deep Worker.
Task Master.
Focus Streak.
Room Designer.
First Purchase.
Productive Week.
Mỗi achievement cần có điều kiện mở khóa rõ ràng và chỉ được mở khóa một lần.
Hiển thị cả thành tích đã mở khóa và tiến độ các thành tích chưa đạt.
13. ANALYTICS
Tạo một trang Analytics chuyên nghiệp.
Bộ lọc:
Today.
Last 7 days.
Last 30 days.
Custom date range.
KPI:
Total tasks.
Completed tasks.
Task completion rate.
Total focus time.
Completed focus sessions.
Average focus duration.
Session task completion rate.
Current streak.
Total XP earned.
Total Coins earned.
Biểu đồ:
Focus time by day: Bar Chart.
Task completion trend: Line Chart.
Task status distribution: Doughnut Chart.
Focus time by category.
Productivity heatmap.
Focus session history.
Quy định:
Toàn bộ thống kê Full-stack phải dựa trên dữ liệu thực trong SQLite.
Không hardcode biểu đồ hoặc số liệu.
Xử lý trường hợp không có dữ liệu.
Không chia cho 0.
Không hiển thị NaN hoặc Infinity.
Bộ lọc thời gian phải thống nhất với định nghĩa các KPI.
Phân biệt thời gian dự kiến và thực tế.
Không cộng toàn bộ thời lượng một phiên cho từng task nếu một phiên có nhiều task.
Với phân bổ focus time theo category, phải sử dụng phương pháp phân bổ có giải thích rõ, bảo đảm tổng phân bổ không vượt tổng focus time.
Không tạo số liệu tăng trưởng giả.
Nếu có seed data lịch sử, đánh dấu rõ đó là dữ liệu mẫu.
Tạo một nút hoặc chức năng export dữ liệu task và focus sessions dưới dạng JSON.
14. DATABASE DESIGN
Sử dụng SQLite thực sự.
Thiết kế tối thiểu các bảng:
user_profile
id
display_name
avatar
created_at
updated_at
categories
id
user_id
name
color
created_at
tasks
id
user_id
category_id
title
description
status
priority
due_date
estimated_minutes
completed_at
deleted_at
created_at
updated_at
subtasks
id
task_id
title
is_completed
created_at
updated_at
focus_sessions
id
user_id
planned_duration
actual_duration
started_at
ended_at
accumulated_pause_duration
status
phase
created_at
updated_at
session_tasks
id
session_id
task_id
task_title_snapshot
category_snapshot
was_completed_at_start
completed_in_session
completed_at
shop_items
id
name
description
category
price
required_level
asset
is_active
inventory
id
user_id
item_id
is_placed
position_x
position_y
rotation
placement_slot
purchased_at
reward_transactions
id
user_id
event_key
source_type
source_id
xp_delta
coin_delta
created_at
achievements
id
code
name
description
condition_type
condition_value
icon
user_achievements
id
user_id
achievement_id
unlocked_at
settings
id
user_id
theme
language
focus_duration
short_break_duration
long_break_duration
sound_volume
auto_start_break
timezone
Có thể bổ sung bảng cần thiết cho distraction log, mini-game scores hoặc timer recovery.
Được phép điều chỉnh tên trường và kiểu dữ liệu để bảo đảm tính nhất quán kỹ thuật.
Tổng XP và Coins có thể được tính từ reward_transactions hoặc duy trì dưới dạng số dư cache có cập nhật transaction nhất quán.
Không duy trì nhiều nguồn dữ liệu mâu thuẫn.
Database phải có:
Primary Key.
Foreign Key.
NOT NULL.
UNIQUE constraints.
CHECK constraints phù hợp.
Indexes cho các trường thường truy vấn.
Soft delete hoặc giải pháp bảo toàn lịch sử.
Seed data.
Database initialization.
Database transactions.
Lưu thời điểm timestamp theo chuẩn nhất quán, ưu tiên UTC. Xử lý ngày công việc và báo cáo theo timezone của người dùng.
Không để xóa task làm mất lịch sử của focus session.
Tạo schema.sql, seed.sql, queries.sql và sơ đồ ERD bằng Mermaid trong ERD.md.
queries.sql phải có các truy vấn minh họa:
SELECT.
INSERT.
UPDATE.
DELETE hoặc soft delete.
JOIN.
GROUP BY.
COUNT.
SUM.
AVG.
Thống kê theo ngày.
Quan hệ nhiều-nhiều giữa tasks và focus_sessions.
15. MOCK DATA
Tạo dữ liệu mẫu đủ để giảng viên có thể kiểm tra ngay toàn bộ giao diện.
Tối thiểu:
1 hồ sơ người dùng.
4 categories.
20 tasks.
Nhiều trạng thái và mức ưu tiên.
Task hôm nay.
Task quá hạn.
Task tương lai.
Task đã hoàn thành.
10 subtasks.
15 focus sessions phân bổ trong 7–30 ngày gần nhất.
12 shop items.
Một số vật phẩm mặc định trong Inventory.
8 achievements.
Ngày seed phải được tạo tương đối so với ngày chạy chương trình, không cố định tất cả vào một ngày trong quá khứ.
Có số dư Coins ban đầu hợp lý thông qua một giao dịch Welcome Reward.
Không tạo seed trùng lặp mỗi lần restart server.
Cho phép reset dữ liệu mẫu qua một lệnh riêng có xác nhận rõ ràng hoặc chức năng có cảnh báo mất dữ liệu.
Không tự động reset Database đang có dữ liệu người dùng.
16. REST API
Xây dựng các nhóm API sau.
Tasks
GET /api/tasks
GET /api/tasks/:id
POST /api/tasks
PATCH /api/tasks/:id
DELETE /api/tasks/:id
POST /api/tasks/:id/restore
Subtasks
POST /api/tasks/:id/subtasks
PATCH /api/subtasks/:id
DELETE /api/subtasks/:id
Categories
GET /api/categories
POST /api/categories
PATCH /api/categories/:id
DELETE /api/categories/:id
Focus Sessions
GET /api/focus/sessions
GET /api/focus/active
POST /api/focus/sessions
POST /api/focus/sessions/:id/pause
POST /api/focus/sessions/:id/resume
POST /api/focus/sessions/:id/complete
POST /api/focus/sessions/:id/end
PATCH /api/focus/sessions/:id/tasks/:taskId
Analytics
GET /api/analytics/overview
GET /api/analytics/focus
GET /api/analytics/tasks
Gamification
GET /api/rewards
GET /api/shop/items
POST /api/shop/purchase
GET /api/inventory
PATCH /api/inventory/:id
GET /api/achievements
Settings and Utilities
GET /api/profile
PATCH /api/profile
GET /api/settings
PATCH /api/settings
GET /api/export
GET /api/health
Có thể bổ sung endpoint cần thiết cho các tính năng nâng cao.
Sử dụng HTTP Status Codes đúng ý nghĩa.
Success Response:
success: true.
data: dữ liệu trả về.
Error Response:
success: false.
error.code.
error.message.
error.details nếu cần thiết.
Kiểm tra dữ liệu ở cả Front-end và Back-end.
Back-end không được tin tưởng các giá trị thời gian, phần thưởng, số dư hoặc trạng thái nhạy cảm được gửi tùy ý từ client.
Giới hạn JSON body hợp lý.
Sử dụng parameterized queries.
Không gửi stack trace hoặc thông tin hệ thống nội bộ về client trong lỗi thông thường.
Đây là ứng dụng single-user chạy local, chưa cần authentication. Mặc định bind server vào localhost để tránh vô tình công khai ứng dụng không có xác thực.
17. DATA ARCHITECTURE
Tách biệt:
Presentation layer.
Business logic.
Data access layer.
Tạo data adapter hoặc repository interface phù hợp.
Giai đoạn 02:
Sử dụng JavaScript Mock Data.
Có thể lưu bằng LocalStorage.
Không sử dụng SQLite.
Không cần Back-end.
Các chức năng cốt lõi phải hoạt động khi phục vụ bằng một static HTTP server.
Giai đoạn 04:
Front-end gọi REST API.
Back-end xử lý logic nghiệp vụ.
SQLite lưu dữ liệu thực.
Không tạo hai bộ dữ liệu độc lập khiến Dashboard, Task Manager, Focus Room và Game không đồng bộ.
Mọi chức năng trong phiên bản Full-stack phải sử dụng cùng một nguồn dữ liệu nhất quán.
Các số liệu nhạy cảm như số dư Coins, XP và phần thưởng phải do server xác nhận.
18. NON-FUNCTIONAL REQUIREMENTS
Performance
Tải trang nhanh.
Hạn chế thư viện nặng.
Không render lại toàn bộ giao diện khi timer thay đổi mỗi giây.
Không để nhiều Chart.js instances tồn tại không cần thiết.
Cleanup intervals và event listeners.
Tối ưu tài nguyên hình ảnh.
Accessibility
Semantic HTML.
Label cho form fields.
Accessible names cho icon buttons.
Keyboard navigation.
Visible focus states.
Dialog focus management.
Color contrast phù hợp.
Reduced motion support.
Không chỉ sử dụng màu sắc để biểu thị trạng thái.
Reliability
Không có lỗi JavaScript console nghiêm trọng.
Không có API request thất bại không được xử lý.
Không có link bị hỏng.
Không có button chỉ để trang trí.
Có loading, error và empty states.
Có xác nhận trước thao tác phá hủy dữ liệu.
Không nhận thưởng trùng khi reload hoặc gửi API lặp lại.
Không mất dữ liệu sau khi restart server.
Privacy
Không yêu cầu tài khoản bên thứ ba.
Không gửi dữ liệu công việc đến dịch vụ bên ngoài.
Không tích hợp tracking không cần thiết.
Không lưu dữ liệu bí mật vào Git.
Code Quality
Đặt tên biến và hàm rõ nghĩa.
Tách module theo chức năng.
Tránh file JavaScript khổng lồ chứa toàn bộ hệ thống.
Comment những logic nghiệp vụ phức tạp.
Không comment thừa ở các đoạn code hiển nhiên.
Không để lại code chết.
Không để lại TODO placeholder cho các tính năng được tuyên bố đã hoàn thành.
19. ASSETS AND AUDIO
Ưu tiên tạo tài nguyên gốc bằng:
SVG.
CSS.
Canvas.
Procedural graphics.
Nếu không thể tạo hoặc tải ảnh phù hợp, sử dụng vector art tự tạo thay vì ảnh ngẫu nhiên không đồng nhất.
Không sử dụng hotlink hình ảnh thiếu ổn định.
Âm thanh có thể sử dụng:
Rain.
White noise.
Café ambience nếu có nguồn hợp pháp.
Focus completion bell.
Ưu tiên tạo âm thanh tổng hợp bằng Web Audio API khi khả thi.
Không giả danh tiếng white noise là âm thanh quán cà phê thực tế nếu không có tài nguyên phù hợp.
Không tự động phát âm thanh trước khi người dùng tương tác.
Lưu âm lượng và lựa chọn âm thanh.
Tài nguyên bên thứ ba phải có nguồn và giấy phép phù hợp trong THIRD_PARTY_LICENSES.md.
Các chức năng chính không được phụ thuộc bắt buộc vào CDN.
20. IMPLEMENTATION PLAN
Thực hiện trực tiếp theo thứ tự sau.
Phase 0 — Discovery
Kiểm tra workspace.
Kiểm tra môi trường.
Bảo vệ các file cũ.
Tạo thư mục sản phẩm.
Tạo PRD.
Tạo danh sách nhiệm vụ triển khai.
Ghi nhận những quyết định kỹ thuật.
Sau đó tiếp tục triển khai, không dừng lại để chỉ trình bày kế hoạch.
Phase 1 — GUI & Vibe Coding
Mục tiêu: 1,5 điểm.
Xây dựng Design System.
Xây dựng Navigation.
Thiết kế Overview.
Thiết kế Task Manager.
Thiết kế Focus Room.
Thiết kế Analytics.
Thiết kế Game Room và Shop.
Tạo các trạng thái giao diện.
Đảm bảo responsive.
Lưu phiên bản GUI vào 01-GUI.
Lưu prompt thực tế và nhật ký làm việc vào docs/PROMPTS.md.
Có thể sử dụng dữ liệu tĩnh trong giai đoạn này.
Không tuyên bố các tính năng GUI minh họa là chức năng đã hoàn thiện.
Phase 2 — No Database Application
Mục tiêu: 1 điểm.
Hoàn thiện trước:
CRUD.
Search.
Filter.
Today view.
Statistics.
Pomodoro.
Session checklist.
Sau đó triển khai:
Kanban.
Calendar.
Gamification.
Shop.
Room customization.
Break Room.
Settings.
Sử dụng Mock Data và LocalStorage.
Đảm bảo phiên bản này chạy được độc lập mà không cần SQLite.
Lưu vào 02-No-Database.
Phase 3 — Database
Mục tiêu: 1 điểm.
Thiết kế schema.
Tạo Database SQLite.
Thiết lập constraints.
Tạo seed data.
Tạo ERD.
Tạo queries.sql.
Kiểm tra quan hệ giữa các bảng.
Kiểm tra CRUD.
Kiểm tra transactions.
Kiểm tra reward integrity.
Lưu tài liệu và script tại 03-Database.
Schema được sử dụng trong Full-stack phải nhất quán với schema của giai đoạn Database.
Phase 4 — Full-stack Integration
Mục tiêu: 0,5 điểm.
Xây dựng Express Server.
Xây dựng REST API.
Kết nối SQLite.
Kết nối Front-end với API.
Hoàn thiện reward service.
Hoàn thiện focus session service.
Hoàn thiện analytics service.
Kiểm thử dữ liệu liên kết.
Lưu sản phẩm tại 04-Fullstack.
Phase 5 — Quality Assurance
Kiểm tra toàn bộ các chức năng.
Chỉ sau khi các chức năng cốt lõi đã đạt yêu cầu mới đầu tư thêm animation và các chi tiết nâng cao.
Ưu tiên theo thứ tự:
P0: CRUD, Search, Filter, Today, Statistics, Database, Full-stack Integration.
P1: Pomodoro, Session Planning, Session Review, XP, Coins, Shop, Room Customization.
P2: Kanban, Calendar, Memory Match, Heatmap, Achievements, song ngữ, âm thanh.
Không bỏ dở các chức năng P0 để phát triển P2.
Nếu gặp blocker, chủ động lựa chọn giải pháp đơn giản hơn nhưng vẫn đáp ứng nghiệp vụ. Ghi lại những chức năng bị giảm phạm vi hoặc chưa hoàn thành.
21. ACCEPTANCE TESTS
Bắt buộc kiểm tra ít nhất các tình huống sau.
Task Management
Thêm task hợp lệ.
Không cho thêm task rỗng.
Sửa task.
Xóa task.
Khôi phục task.
Search theo tên.
Search kết hợp Filter.
Filter Today.
Filter priority.
Filter status.
Task hoàn thành được cập nhật trong Analytics.
Task vẫn tồn tại sau reload và restart server.
Focus Room
Bắt đầu phiên 25 phút.
Chọn nhiều task.
Cảnh báo workload vượt thời gian.
Pause và Resume.
Chuyển tab.
Reload khi đang focus.
Reload khi đang pause.
Timer kết thúc đúng.
Timer không đếm nhanh gấp đôi.
Không tự hoàn thành task khi hết giờ.
Kết thúc sớm.
Session Review chính xác.
Không cấp thưởng trùng khi gọi complete nhiều lần.
Sử dụng timer ngắn hoặc fake clock trong test nếu cần kiểm thử nhanh.
Không làm sai thời lượng mặc định của ứng dụng chỉ để tiện demo.
Gamification
Hoàn thành task được nhận thưởng.
Undo task áp dụng đúng quy tắc.
Re-complete không nhân đôi phần thưởng.
Mua vật phẩm khi đủ Coins.
Không mua được khi thiếu Coins.
Không mua trùng vật phẩm.
Không tự ý thay đổi số dư qua client.
Không lỗi khi nhiều yêu cầu mua vật phẩm xảy ra gần nhau.
Vật phẩm xuất hiện trong Inventory.
Đặt vật phẩm trong phòng.
Vị trí được khôi phục sau reload.
Level tăng đúng.
Achievement không mở khóa nhiều lần.
Mini-game
Shuffle thẻ.
Match đúng.
Match sai.
Victory state.
Restart.
Không chơi ngoài Break Room.
Game dừng khi break kết thúc.
Database
Foreign key hoạt động.
Seed không trùng.
Transaction rollback khi lỗi.
Không xảy ra SQL injection qua input thông thường.
Không mất lịch sử focus session khi task bị xóa.
Reward ledger nhất quán.
Dữ liệu còn sau restart server.
UI
Desktop 1440px.
Laptop 1280px.
Tablet 768px.
Mobile 390px.
Mobile 320px.
Dark Mode.
Light Mode.
Keyboard navigation.
Empty states.
Error states.
Loading states.
Không horizontal overflow.
Không broken navigation.
Tạo TEST_REPORT.md với các cột:
Test ID.
Module.
Test scenario.
Expected result.
Actual result.
Status: PASS / FAIL / NOT RUN.
Notes.
Chỉ đánh dấu PASS nếu đã thực sự kiểm thử.
Không bịa số liệu kiểm thử hoặc kết quả chạy trình duyệt.
Nếu môi trường không hỗ trợ kiểm thử trình duyệt, ghi rõ các test chưa chạy và cung cấp hướng dẫn kiểm tra thủ công.
22. DOCUMENTATION
README.md
Viết README chuyên nghiệp bằng tiếng Việt, có các phần:
Product introduction.
Problem statement.
Product vision.
Screenshots thực tế nếu có thể tạo.
Feature list.
Technology stack.
System architecture.
Folder structure.
Database design.
Installation guide.
Running instructions.
API overview.
Demo guide.
Testing results.
Limitations.
Future development.
Mapping với tiêu chí chấm điểm giảng viên.
PROMPTS.md
Lưu:
Master Prompt thực tế này nếu có thể truy xuất nguyên văn.
Các prompt được sử dụng bổ sung.
Mục đích từng prompt.
Các quyết định phát sinh.
Những lỗi phát hiện và cách xử lý.
Không tạo lịch sử prompt giả.
Phân biệt rõ prompt người dùng cung cấp với ghi chú triển khai do Codex tạo.
DEMO_GUIDE.md
Tạo kịch bản demo khoảng 3–5 phút để sinh viên trình bày với giảng viên.
Kịch bản phải thể hiện:
Giao diện chuyên nghiệp.
Thêm công việc.
Search và Filter.
Sửa và hoàn thành task.
Thiết lập phiên Pomodoro.
Hoàn thành nhiệm vụ trong phiên.
Nhận phần thưởng.
Mua vật phẩm.
Trang trí phòng.
Xem Analytics.
Kiểm tra dữ liệu trong SQLite.
Trình bày kiến trúc Full-stack.
Có thể sử dụng phiên focus ngắn được người dùng chủ động cấu hình để trình diễn.
IMPLEMENTATION_LOG.md
Ghi lại:
Giai đoạn triển khai.
File được tạo.
Quyết định kỹ thuật.
Package được sử dụng.
Vấn đề gặp phải.
Giải pháp.
Những hạn chế còn tồn tại.
23. GITHUB REQUIREMENTS
Tôi sẽ tự up lên github
Giải thích trong README:
GUI và phiên bản không Database có thể triển khai tĩnh nếu đáp ứng đường dẫn.
Full-stack Node.js và SQLite không chạy trực tiếp trên GitHub Pages.
Full-stack sẽ được trình diễn bằng localhost hoặc nền tảng hosting hỗ trợ Back-end nếu phát triển sau này.
24. RUNNING REQUIREMENTS
Cố gắng chuẩn hóa để người dùng chỉ cần chạy:
cd FocusQuest
npm install
npm start
Các lệnh phải thực sự hoạt động theo package.json.
Sau đó truy cập:
http://localhost:3000
Tạo các script phù hợp:
npm start.
npm run dev.
npm test.
npm run db:init.
npm run db:seed.
Có thể bổ sung script để mở riêng phiên bản GUI và No Database.
Nếu cần reset Database, phải có lệnh riêng và cảnh báo rõ ràng.
README phải giải thích các lệnh này.
Không yêu cầu người dùng chỉnh sửa nhiều file cấu hình chỉ để chạy ứng dụng.
25. DEFINITION OF DONE
Chỉ tuyên bố sản phẩm hoàn thành khi:
Các yêu cầu bắt buộc của giảng viên được đáp ứng.
Có đủ bốn giai đoạn bàn giao.
Giao diện đẹp, chuyên nghiệp và responsive.
Các chức năng cốt lõi hoạt động.
Dữ liệu được lưu bằng SQLite thực sự trong phiên bản Full-stack.
Pomodoro liên kết với danh sách công việc.
Focus Session có lịch sử.
Game có tương tác thực tế.
Shop và Inventory hoạt động.
Phần thưởng nhất quán.
Analytics phản ánh dữ liệu thực.
Không có lỗi nghiêm trọng đã biết.
Có README.
Có tài liệu Database.
Có Vibe Coding Prompt.
Có hướng dẫn chạy.
Có báo cáo kiểm thử thực tế.
Không ảnh hưởng Bai1.html và HelloWorld.js.
26. FINAL OUTPUT
Sau khi thực hiện, báo cáo cho tôi bằng tiếng Việt.
Báo cáo gồm:
Tổng quan sản phẩm đã hoàn thành.
Các chức năng đã triển khai.
Những chức năng chưa triển khai hoặc bị giới hạn.
Cấu trúc thư mục thực tế.
Danh sách file quan trọng.
Kiến trúc Front-end, Back-end và Database.
Bảng mapping với bốn tiêu chí chấm điểm.
Các lệnh chạy chính xác.
Đường dẫn localhost.
Kết quả kiểm thử thực tế.
Lỗi hoặc hạn chế còn tồn tại.
Hướng dẫn đưa sản phẩm lên GitHub.
Hướng dẫn demo trước giảng viên.
Không tuyên bố đã chạy thành công nếu chưa thực sự chạy.
Không tuyên bố đã kiểm thử chức năng nếu chưa kiểm thử.
Không che giấu blocker hoặc thay đổi phạm vi.
Nếu phải đưa ra quyết định ngoài bản đặc tả, ghi rõ quyết định, lý do và ảnh hưởng.
27. EXECUTION INSTRUCTION
Bắt đầu bằng việc kiểm tra workspace hiện tại.
Sau đó tạo kế hoạch thực thi ngắn, lưu vào tài liệu và trực tiếp tiến hành lập trình.
Không dừng lại sau khi tạo kế hoạch.
Không yêu cầu tôi lựa chọn lại framework, màu sắc, tên sản phẩm hoặc những vấn đề đã được quyết định trong prompt.
Tự xử lý các quyết định triển khai thông thường.
Nếu gặp vấn đề kỹ thuật, ưu tiên giải pháp đơn giản, ổn định và phù hợp với kiến thức sinh viên.
Khi quyền truy cập hoặc quyền thực thi bị giới hạn, sử dụng những quyền được cấp và báo cáo rõ blocker. Không tìm cách vượt qua giới hạn quyền.
Hoàn thành phần chức năng bắt buộc trước, sau đó mới phát triển các tính năng nâng cao.
Hãy xây dựng FocusQuest như một sản phẩm thực sự, không phải một bản mockup chỉ có giao diện đẹp.
BẮT ĐẦU THỰC THI.


---

## Yêu cầu rút gọn tiếp theo từ người dùng

> URGENT — DEADLINE-FIRST DELIVERY
>
> Mục tiêu cao nhất hiện tại là có một sản phẩm chạy được, đáp ứng đủ 4 điểm bổ sung của giảng viên và giữ được các tính năng khác biệt quan trọng nhất.

P0 được ưu tiên và bàn giao trước. P1 giữ Pomodoro theo nhiệm vụ, tổng kết, XP/Coins và trang trí phòng đơn giản. P2 tạm hoãn theo yêu cầu. Đây là ghi chú triển khai tóm tắt sau trích dẫn, không phải một prompt bổ sung.
