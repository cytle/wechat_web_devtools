#! /bin/sh

root_dir=$(cd `dirname $0`/.. && pwd -P)

# 打开工具上方目录
sed -ri -e 's/("win32")(\=\=\=process\.platform\|\|)(global\.appConfig\.isDev)/\1\2"linux"\2\3/g' "$root_dir/package.nw/app/dist/components/menubar/menubar.js"

# 大小写错误
# sensor工具
sed -ri -e 's/Sensor\/index\.html/sensor\/index\.html/g' "$root_dir/package.nw/app/dist/extensions/devtools.html"
