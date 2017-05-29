#! /bin/sh

root_dir=$(cd `dirname $0`/.. && pwd -P)

# 打开目录
sed -ri -e 's/("win32")(\=\=\=process\.platform\|\|)(global\.appConfig\.isDev)/\1\2"linux"\2\3/g' "$root_dir/package.nw/app/dist/components/menubar/menubar.js"
