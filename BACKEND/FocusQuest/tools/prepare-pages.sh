#!/bin/sh
set -eu

if [ "$#" -ne 1 ] || [ ! -d "$1" ]; then
  printf '%s\n' 'Cách dùng: sh FocusQuest/tools/prepare-pages.sh /đường/dẫn/đến/thư-mục-nguồn-Pages' >&2
  exit 1
fi

project=$(CDPATH='' cd "$(dirname "$0")/.." && pwd)
workspace=$(dirname "$project")
publish_dir=$(CDPATH='' cd "$1" && pwd)
target="$publish_dir/BACKEND"

if [ -e "$target" ] || [ -L "$target" ]; then
  printf 'Thư mục đã tồn tại: %s\nHãy kiểm tra nội dung hiện có trước khi cập nhật.\n' "$target" >&2
  exit 1
fi

mkdir -p "$target/FocusQuest"
cp "$workspace/Bai1.html" "$workspace/HelloWorld.js" "$target/"
cp "$project/package.json" "$project/package-lock.json" "$project/.gitignore" "$project/README.md" "$target/FocusQuest/"
cp -R "$project/01-GUI" "$project/02-No-Database" "$project/03-Database" "$project/docs" "$project/tools" "$target/FocusQuest/"
mkdir -p "$target/FocusQuest/04-Fullstack"
cp -R "$project/04-Fullstack/public" "$project/04-Fullstack/server" "$project/04-Fullstack/tests" "$project/04-Fullstack/README.md" "$target/FocusQuest/04-Fullstack/"

cat > "$target/index.html" <<'HTML'
<!doctype html>
<html lang="vi">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="refresh" content="0; url=./FocusQuest/02-No-Database/">
  <title>FocusQuest</title>
</head>
<body>
  <h1>FocusQuest</h1>
  <p><a href="./FocusQuest/02-No-Database/">Mở ứng dụng FocusQuest</a></p>
</body>
</html>
HTML

printf 'Đã chuẩn bị bài nộp tại %s\n' "$target"
