PRAGMA foreign_keys = ON;
CREATE TABLE IF NOT EXISTS user_profile (
 id INTEGER PRIMARY KEY CHECK(id=1), display_name TEXT NOT NULL, avatar TEXT NOT NULL DEFAULT '',
 created_at INTEGER NOT NULL, updated_at INTEGER NOT NULL
) STRICT;
CREATE TABLE IF NOT EXISTS settings (
 id INTEGER PRIMARY KEY REFERENCES user_profile(id), theme TEXT NOT NULL CHECK(theme IN ('dark','light')),
 language TEXT NOT NULL CHECK(language IN ('vi','en')), focus_duration INTEGER NOT NULL CHECK(focus_duration BETWEEN 1 AND 180),
 short_break_duration INTEGER NOT NULL CHECK(short_break_duration BETWEEN 1 AND 60),
 long_break_duration INTEGER NOT NULL CHECK(long_break_duration BETWEEN 1 AND 60),
 sound_volume REAL NOT NULL CHECK(sound_volume BETWEEN 0 AND 1), sound TEXT NOT NULL CHECK(sound IN ('off','rain','white')),
 auto_start_break INTEGER NOT NULL CHECK(auto_start_break IN (0,1)), timezone TEXT NOT NULL, background TEXT NOT NULL CHECK(background IN ('room','quiet'))
) STRICT;
CREATE TABLE IF NOT EXISTS categories (
 id TEXT PRIMARY KEY, user_id INTEGER NOT NULL REFERENCES user_profile(id), name TEXT NOT NULL COLLATE NOCASE, color TEXT NOT NULL,
 created_at INTEGER NOT NULL, UNIQUE(user_id,name)
) STRICT;
CREATE TABLE IF NOT EXISTS tasks (
 id TEXT PRIMARY KEY, user_id INTEGER NOT NULL REFERENCES user_profile(id), category_id TEXT REFERENCES categories(id) ON DELETE SET NULL,
 title TEXT NOT NULL CHECK(length(trim(title)) BETWEEN 1 AND 160), description TEXT NOT NULL,
 status TEXT NOT NULL CHECK(status IN ('todo','progress','completed')), priority TEXT NOT NULL CHECK(priority IN ('low','medium','high','urgent')),
 due_date TEXT NOT NULL, estimated_minutes INTEGER CHECK(estimated_minutes BETWEEN 0 AND 1440), completed_at INTEGER,
 deleted_at INTEGER, created_at INTEGER NOT NULL, updated_at INTEGER NOT NULL
) STRICT;
CREATE INDEX IF NOT EXISTS tasks_due ON tasks(user_id,due_date,deleted_at);
CREATE INDEX IF NOT EXISTS tasks_completed ON tasks(user_id,completed_at);
CREATE TABLE IF NOT EXISTS subtasks (
 id TEXT PRIMARY KEY, task_id TEXT NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
 title TEXT NOT NULL, is_completed INTEGER NOT NULL CHECK(is_completed IN (0,1)), created_at INTEGER NOT NULL, updated_at INTEGER NOT NULL
) STRICT;
CREATE INDEX IF NOT EXISTS subtasks_task ON subtasks(task_id);
CREATE TABLE IF NOT EXISTS focus_sessions (
 id TEXT PRIMARY KEY, user_id INTEGER NOT NULL REFERENCES user_profile(id),
 phase TEXT NOT NULL CHECK(phase IN ('focus','short','long')),
 status TEXT NOT NULL CHECK(status IN ('running','paused','completed','ended_early','cancelled')),
 planned_duration INTEGER NOT NULL CHECK(planned_duration>0), actual_duration INTEGER NOT NULL CHECK(actual_duration BETWEEN 0 AND planned_duration),
 started_at INTEGER NOT NULL, ended_at INTEGER, deadline INTEGER, paused_at INTEGER, paused_duration INTEGER NOT NULL CHECK(paused_duration>=0),
 current_round INTEGER NOT NULL CHECK(current_round BETWEEN 1 AND rounds), rounds INTEGER NOT NULL CHECK(rounds BETWEEN 1 AND 12),
 focus_minutes INTEGER NOT NULL CHECK(focus_minutes BETWEEN 1 AND 180), break_minutes INTEGER NOT NULL CHECK(break_minutes BETWEEN 0 AND 60),
 parent_id TEXT UNIQUE REFERENCES focus_sessions(id), is_sample INTEGER NOT NULL CHECK(is_sample IN (0,1))
) STRICT;
CREATE UNIQUE INDEX IF NOT EXISTS one_active_session ON focus_sessions(user_id) WHERE status IN ('running','paused');
CREATE INDEX IF NOT EXISTS focus_history ON focus_sessions(user_id,started_at);
CREATE TABLE IF NOT EXISTS focus_session_tasks (
 id TEXT PRIMARY KEY, session_id TEXT NOT NULL REFERENCES focus_sessions(id), task_id TEXT NOT NULL REFERENCES tasks(id),
 title_at_start TEXT NOT NULL, category_at_start TEXT NOT NULL, position INTEGER NOT NULL,
 completed_in_session INTEGER NOT NULL CHECK(completed_in_session IN (0,1)), completed_at INTEGER,
 UNIQUE(session_id, task_id), UNIQUE(session_id, position)
) STRICT;
CREATE INDEX IF NOT EXISTS focus_task_lookup ON focus_session_tasks(task_id);
CREATE TABLE IF NOT EXISTS distractions (
 id TEXT PRIMARY KEY, session_id TEXT NOT NULL REFERENCES focus_sessions(id), note TEXT NOT NULL, created_at INTEGER NOT NULL
) STRICT;
CREATE TABLE IF NOT EXISTS shop_items (
 id TEXT PRIMARY KEY, name TEXT NOT NULL, name_en TEXT NOT NULL, description TEXT NOT NULL, description_en TEXT NOT NULL,
 category TEXT NOT NULL, price INTEGER NOT NULL CHECK(price BETWEEN 15 AND 200), required_level INTEGER NOT NULL CHECK(required_level>=1),
 asset TEXT NOT NULL, is_active INTEGER NOT NULL CHECK(is_active IN (0,1))
) STRICT;
CREATE TABLE IF NOT EXISTS inventory (
 id TEXT PRIMARY KEY, user_id INTEGER NOT NULL REFERENCES user_profile(id), item_id TEXT NOT NULL REFERENCES shop_items(id),
 is_placed INTEGER NOT NULL CHECK(is_placed IN (0,1)), position_x INTEGER NOT NULL CHECK(position_x BETWEEN 0 AND 100),
 position_y INTEGER NOT NULL CHECK(position_y BETWEEN 0 AND 100), rotation INTEGER NOT NULL CHECK(rotation IN (0,90,180,270)),
 placement_slot TEXT, purchased_at INTEGER NOT NULL, UNIQUE(user_id,item_id), UNIQUE(user_id,placement_slot),
 CHECK((is_placed=0 AND placement_slot IS NULL) OR (is_placed=1 AND placement_slot IS NOT NULL))
) STRICT;
CREATE TABLE IF NOT EXISTS reward_transactions (
 id TEXT PRIMARY KEY, user_id INTEGER NOT NULL REFERENCES user_profile(id), event_key TEXT NOT NULL UNIQUE, source_type TEXT NOT NULL,
 source_id TEXT NOT NULL, xp_delta INTEGER NOT NULL, coin_delta INTEGER NOT NULL, created_at INTEGER NOT NULL
) STRICT;
CREATE INDEX IF NOT EXISTS reward_by_date ON reward_transactions(user_id, created_at);
CREATE TABLE IF NOT EXISTS achievements (
 id TEXT PRIMARY KEY, code TEXT NOT NULL UNIQUE, name TEXT NOT NULL, description TEXT NOT NULL,
 condition_type TEXT NOT NULL, condition_value INTEGER NOT NULL CHECK(condition_value>0), icon TEXT NOT NULL
) STRICT;
CREATE TABLE IF NOT EXISTS user_achievements (
 id TEXT PRIMARY KEY, user_id INTEGER NOT NULL REFERENCES user_profile(id), achievement_id TEXT NOT NULL REFERENCES achievements(id),
 unlocked_at INTEGER NOT NULL, UNIQUE(user_id,achievement_id)
) STRICT;
PRAGMA user_version = 1;
