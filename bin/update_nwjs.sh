#! /bin/bash
# 下载nwjs，构建项目

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

# 显示nwjs版本等信息
start_step '0. 概括'

if [ $(getconf WORD_BIT) = '32' ] && [ $(getconf LONG_BIT) = '64' ] ; then
    bit="x64"
else
    bit="ia32"
fi

root_dir=$(cd `dirname $0`/.. && pwd -P)

nwjs_v=`cat $root_dir/nwjs_v`
tmp_dir="/tmp/wxdt_xsp"

nwjs_file="$tmp_dir/nwjs-v$nwjs_v.tar.gz"
nwjs_dir="$tmp_dir/nwjs-sdk-v${nwjs_v}-linux-$bit"
nwjs_download="https://npm.taobao.org/mirrors/nwjs/v$nwjs_v/nwjs-sdk-v${nwjs_v}-linux-$bit.tar.gz"

dist_dir="$root_dir/dist"

echo "  nwjs version: $nwjs_v $bit
  nwjs download path: $nwjs_download
  dist dir: $dist_dir"

# 下载nwjs，如果本地已经下载则直接解压
start_step '1. 下载nwjs'

mkdir -p $tmp_dir
if [ ! -d "$nwjs_dir" ]; then
  if [ ! -f "$nwjs_file" ]; then
    echo "================================="
    echo "[注意]需要下载nwjs.请耐心等待下载完成"
    echo "$nwjs_download"
    echo "================================="
    wget "$nwjs_download" -O "$nwjs_file"
  fi

  tar -xf "$nwjs_file" -C $tmp_dir
  success '解压nwjs'

  # 移除其他语言
  find "$nwjs_dir/locales" -not -name 'zh-CN.pak' -not -name 'en-US.pak' -name '*.pak' | xargs rm
  success '移除其他语言'
fi

# 将nwjs和package.nw放入dist文件夹
start_step '2. 合并nwjs和package.nw'

rm -rf "$dist_dir"
mkdir -p "$dist_dir"

cp -r "$nwjs_dir"/* "$dist_dir"
ln -sf ../package.nw "$dist_dir/package.nw"
ln -sf ../bin/node "$root_dir/dist/node"
ln -sf ../bin/node "$root_dir/dist/node.exe"

echo "$nwjs_v" > "$dist_dir/nwjs_version"

success "update nwjs success"
