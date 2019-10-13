#! /bin/bash
# 更新微信开发者工具版本
#   1. 根据build.conf下载指定版本
#   2. 使用wine安装
#   3. 拷贝到package.nw

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


# 获取微信开发者工具版本等信息
start_step '获取最新微信开发者工具版本'

root_dir=$(cd `dirname $0`/.. && pwd -P)

tmp_dir="/tmp/wxdt_xsp"
dist_dir="$root_dir/dist"
cur_wechat_v=`cat $root_dir/wechat_v`
echo "当前wechat_v: $cur_wechat_v"

wcwd_download='https://servicewechat.com/wxa-dev-logic/download_redirect?type=x64&from=mpwiki'
wechat_v=$(curl -sD - $wcwd_download | grep -oP --color=never '(?<=wechat_devtools_)[\d\.]+(?=_x64\.exe)')


if [ -z "$wechat_v" ]; then
  fail "下载版本为空"
  exit 1
fi

echo "最新wechat_v: $wechat_v"

if [ "$wechat_v" = "$cur_wechat_v" ]; then
  success "当前已经是最新版本"
  exit 0
fi

# 下载windows版微信开发者工具
start_step '下载微信开发者工具'

wcwd_file="$tmp_dir/wechat_web_devtools_${wechat_v}_x64.exe"

mkdir -p $tmp_dir

# 下载
if [ ! -f "$wcwd_file" ]; then
  echo "================================="
  echo "[注意]需要下载微信开发者工具.请耐心等待下载完成"
  echo $wcwd_download
  echo "================================="
  wget "$wcwd_download" -O $wcwd_file
fi

# 微信开发者工具
start_step '解压微信开发者工具'

wcwd_file_target="$tmp_dir/wechat_web_devtools_${wechat_v}_x64"
wcwd_file_package_nw_dir="\$APPDATA/Tencent/微信开发者工具/package.nw"

7z x $wcwd_file -o$wcwd_file_target -y $wcwd_file_package_nw_dir

# 拷贝微信开发者工具
start_step '拷贝微信开发者工具'

wcwd_package_dir="$wcwd_file_target/$wcwd_file_package_nw_dir"

rm -rf "$root_dir/package.nw" # 删除旧文件夹
success '删除旧文件夹'
cp -r "$wcwd_package_dir" "$root_dir" # 拷贝新的package.nw
success '拷贝新的package.nw'

# cli相关修改
start_step 'fix: cli相关修改'
bash "$root_dir/bin/fix_cli.sh"

# 修改项目名字, 修复标题栏乱码问题
start_step 'fix: 修改项目名字, 修复标题栏乱码问题'
bash "$root_dir/bin/fix_package_name.sh"

# 重新编译node-sync-ipc
# start_step 'fix: 重新编译node-sync-ipc'
# bash "$root_dir/bin/fix_node_sync_ipc.sh"

start_step 'doc: 更新文档'

sed -ri \
    -e "s#(wx_dev_tools)( v|-)[0-9][0-9.]*#\1\2$wechat_v#g" \
    "$root_dir/README.md"

# echo "- $(date +%Y/%m/%d) 更新:微信小程序升级到$wechat_v" >> "$root_dir/CHANGELOG.md"

echo $wechat_v > $root_dir/wechat_v
echo "更新版本为: $(cat $root_dir/wechat_v)"

success '更新完成'
