#! /bin/bash

root_dir=$(cd `dirname $0`/.. && pwd -P)

nwjs_v=`cat $root_dir/nwjs_v`

cur_nwjs_v=""

if [ -f "$root_dir/dist/nwjs_version" ]; then
  cur_nwjs_v=`cat "$root_dir/dist/nwjs_version"`
fi

if [ "$cur_nwjs_v" != "$nwjs_v" ]; then
  echo "安装微信开发者工具对应nwjs版本：$nwjs_v"
  bash "$root_dir/bin/update_nwjs.sh"
fi

cd "$root_dir/dist"

want=${1:-"start"}
if [ $want = "start" ]; then
  `./nw`
elif [ $want = "install" ]; then
  bash "$root_dir/bin/replace_weapp_vendor.sh"
  bash "$root_dir/bin/install_desktop.sh"
  echo "安装完成"
elif [ $want = "debug" ]; then
  port=9222
  `./nw --remote-debugging-port=$port`
  echo "remote-debugging-port:$port"
elif [ $want = "uninstall" ]; then
  bash "$root_dir/bin/uninstall.sh"
  echo "卸载完成,请在退出开发者工具后手动删除此项目目录"
else
  echo "不支持$want操作"
  exit 127
fi
