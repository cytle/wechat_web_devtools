#!/bin/bash

trap clean EXIT

dev_tools_config_dir="$HOME/.config/wechat_web_devtools"

clean() {
  if [ -d $dev_tools_config_dir ]; then
    echo 'clean'
    rm -rf "$dev_tools_config_dir/Default/.ide"
    rm -rf "$dev_tools_config_dir/Singleton*"
  fi
}

clean

# 如果没有命令，表示只startup，将hold
if [ -z "$1" ]; then
  /startup.sh > "/var/log/startup.log" 2>&1
  exit 0
fi

# 挂起
/startup.sh > "/var/log/startup.log" 2>&1 &

while [ true ]
do
  if [ -f "$dev_tools_config_dir/Default/.ide" ]; then break; fi
  echo "sleep 2s 等待微信开发者工具准备完毕."
  sleep 2s
done

exec "$@"
