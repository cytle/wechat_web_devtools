#! /bin/bash

root_dir=$(cd `dirname $0`/.. && pwd -P)

# linux下环境变量替换为HOME
sed -ri -e 's/USERPROFILE/HOME/g' $root_dir/package.nw/js/common/cli/index.js
# config地址替换
sed -ri -e 's#AppData/Local/\$\{global.userDirName\}/User Data#.config/\$\{global.userDirName\}#g' $root_dir/package.nw/js/common/cli/index.js
# 应用入口替换 todo: js压缩后变量名不固定（i.join）
sed -ri -e 's#`./\$\{global.appname\}.exe`#o.join(__dirname, "../../../../bin/wxdt")#g' $root_dir/package.nw/js/common/cli/index.js

# 默认打开服务端口，TODO 文件hash会改变
# sed -ri -e 's/enableServicePort:!1/enableServicePort:!!1/g' $root_dir/package.nw/js/5498e660c05c574f739a28bd5d202cfa.js
