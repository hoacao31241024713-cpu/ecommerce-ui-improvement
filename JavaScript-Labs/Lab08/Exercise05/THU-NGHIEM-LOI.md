# Exercise 8.5: thử lỗi có chủ đích

1. Mở `lab08-walkthrough02.html`, kiểm tra kết quả và Console. `count` → 2; `output` → `<br>Count = 2`; nhập `var temp = count * 7;` rồi `temp` → 14.
2. Để kiểm chứng bước 4–6, **tạm thời** đổi `src="js/hello.js"` thành `src="js/hello-intentional-error.js"`. Tải lại trang, Console hiện `ReferenceError: doccumment is not defined`.
3. Khôi phục `src="js/hello.js"` cho trạng thái hoàn thiện cuối.
4. `console.error("panic!! error!!")` là thông báo lỗi minh họa do chính bài Lab yêu cầu, không phải lỗi thực thi.
