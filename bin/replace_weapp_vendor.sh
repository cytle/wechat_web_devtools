#! /bin/bash

root_dir=$(cd `dirname $0`/.. && pwd -P)

dev_tools_config_dir="$HOME/.config/微信web开发者工具"

if [ ! -d "$dev_tools_config_dir" ]; then
  cd $root_dir/dist;
  ./nw &

  nw_pid=$!

  echo "please wait 5s!"
  for k in $( seq 1 5 ); do
    sleep 1s && echo "${k}s"
  done
  echo "kill nw"

  kill -9 $nw_pid
fi

if [ -d "$dev_tools_config_dir" ]; then
  echo "cp -rfu $root_dir/bin/WeappVendor/* $dev_tools_config_dir/WeappVendor"
  cp -rf $root_dir/bin/WeappVendor/* "$dev_tools_config_dir/WeappVendor" 2> /dev/null
  echo "Success"
else\
  echo "Error: 开发者工具未生成文件夹 $dev_tools_config_dir, 可能是权限问题, 请参考项目issue"
  echo "Fail! Please reinstall"
fi
