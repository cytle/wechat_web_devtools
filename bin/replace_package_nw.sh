#! /bin/bash

root_dir=$(cd `dirname $0`/.. && pwd -P)

# 打开工具上方目录
sed -ri -e 's/("win32")(\=\=\=process\.platform\|\|)(global\.appConfig\.isDev)/\1\2"linux"\2\3/g' "$root_dir/package.nw/app/dist/components/menubar/menubar.js"

# sensor工具 大小写错误
sed -ri -e 's/Sensor\/index\.html/sensor\/index\.html/g' "$root_dir/package.nw/app/dist/extensions/devtools.html"


# 版本0.18.182200 大小写错误
sed -ri -e 's/PickerRing\.js/pickerRing\.js/g' "$root_dir/package.nw/app/dist/components/simulator/webview/multiPicker.js"


sed -ri -e 's/t\.target\(\)\.networkManager\.certificateDetailsPromise\(n\.certificateId\)/Promise.resolve(n)/g' "$root_dir/package.nw/app/dist/inject/devtools.js"


# TODO certificateDetailsPromise

# 绑定快捷键
sed -ri -e 's/("win32"===process\.platform),/\1||"linux"===process\.platform,/g' "$root_dir/package.nw/app/dist/common/shortCut/shortCut.js"
