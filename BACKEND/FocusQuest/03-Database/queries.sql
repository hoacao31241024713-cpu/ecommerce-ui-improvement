-- Xem công việc hôm nay theo ngày hồ sơ (ví dụ lấy ngày cục bộ hiện tại từ SQLite CLI).
SELECT t.title,t.status,t.priority,c.name AS category
FROM tasks t LEFT JOIN categories c ON c.id=t.category_id
WHERE t.deleted_at IS NULL AND t.due_date=date('now','localtime')
ORDER BY t.status,t.title;

-- Thống kê theo ngày kết thúc ở UTC. API chuyển ngày theo múi giờ hồ sơ.
SELECT date(ended_at/1000,'unixepoch') AS day, COUNT(*) AS sessions,
       ROUND(SUM(actual_duration)/60000.0,1) AS total_minutes,
       ROUND(AVG(actual_duration)/60000.0,1) AS avg_minutes
FROM focus_sessions WHERE phase='focus' AND status IN ('completed','ended_early')
GROUP BY day ORDER BY day DESC;

SELECT s.id,t.title,st.completed_in_session
FROM focus_sessions s JOIN focus_session_tasks st ON st.session_id=s.id
JOIN tasks t ON t.id=st.task_id ORDER BY s.started_at DESC, st.position;

-- Các lệnh ghi minh họa đều được hoàn tác.
BEGIN;
INSERT INTO tasks VALUES ('demo-sql',1,NULL,'Thử SQLite','','todo','medium',date('now','localtime'),15,NULL,NULL,unixepoch()*1000,unixepoch()*1000);
UPDATE tasks SET title='Cập nhật từ SQL' WHERE id='demo-sql';
UPDATE tasks SET deleted_at=unixepoch()*1000 WHERE id='demo-sql';
ROLLBACK;
