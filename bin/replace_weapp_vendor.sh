#! /bin/bash

set -e # 命令出错就退出
trap 'catchError $LINENO $BASH_COMMAND' SIGHUP SIGINT SIGQUIT EXIT # 捕获错误情况

catchError() {
    exit_code=$?
    if [ $exit_code -ne 0 ]; then
        fail "\033[31mcommand: $2\n  at $0:$1\n  at $STEP\033[0m"
    fi
    exit $exit_code
}

success() {
    echo -e "\033[42;37m 成功 \033[0m $1"
}

fail() {
    echo -e "\033[41;37m 失败 \033[0m $1"
}

start_step() {
    if [ -n "$STEP" ]; then success "$STEP"; fi
    STEP="$1"
    echo -e "\033[34m------------------------------------------------------------------\033[0m"
    echo -e "\033[34m$STEP\033[0m"
    echo -e "\033[34m------------------------------------------------------------------\033[0m"
}

root_dir=$(cd `dirname $0`/.. && pwd -P)

dev_tools_config_dir="$HOME/.config/wechat_web_devtools"
weapp_vendor_dir="$dev_tools_config_dir/WeappVendor"
vendor_dir="$root_dir/package.nw/js/vendor"
start_step "生成"$dev_tools_config_dir

if [ ! -d "$dev_tools_config_dir" ]; then
  exec $root_dir/bin/wxdt &

  nw_pid=$!

  for k in $( seq 1 10 ); do
    if [ -d "$dev_tools_config_dir" ]; then break; fi
    sleep 1s && echo "${k}s"
  done
  echo "kill nw"

  kill -9 $nw_pid
fi

if [ -d "$dev_tools_config_dir" ]; then
  if [ ! -d "$weapp_vendor_dir" ]; then
    echo "mkdir -p $weapp_vendor_dir"
    mkdir -p $weapp_vendor_dir
  fi

  echo "cp -rf $root_dir/bin/WeappVendor/* $dev_tools_config_dir/WeappVendor/"
  cp -rf $root_dir/bin/WeappVendor/* "$dev_tools_config_dir/WeappVendor/"
  mkdir -p "$dev_tools_config_dir/WeappVendor/s"
  echo cp -rf $vendor_dir/wcc.exe $vendor_dir/wcsc.exe "$dev_tools_config_dir/WeappVendor/s/"
  cp -rf $vendor_dir/wcc.exe $vendor_dir/wcsc.exe "$dev_tools_config_dir/WeappVendor/s/"
  success "Success"
else
  success "开发者工具未生成文件夹 $dev_tools_config_dir, 可能是权限问题, 请参考项目issue"
fi
