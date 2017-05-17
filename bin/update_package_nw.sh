#! /bin/bash

cd `dirname $0`/..

root_dir=$(pwd)

. "$root_dir/bin/build.conf"

tmp_dir="$root_dir/.tmp"
dist_dir="$root_dir/dist"

wcwd_file="$tmp_dir/wechat_web_devtools_${wechat_v}_x64.exe"
wcwd_download="https://dldir1.qq.com/WechatWebDev/${wechat_v//./}/wechat_web_devtools_${wechat_v}_x64.exe"

wcwd_package_dir="$HOME/.wine/drive_c/Program Files (x86)/Tencent/微信web开发者工具/package.nw"

mkdir -p $tmp_dir

# 下载
if [ ! -f "$wcwd_file" ]; then
  echo "================================="
  echo "[注意]需要下载微信开发者工具.请耐心等待下载完成"
  echo $wcwd_download
  echo "================================="
  wget "$wcwd_download" -O $wcwd_file
  $? -ne 0 && exit "$?"
fi

# 安装
wine $wcwd_file

rm -rf "$root_dir/package.nw"
cp -r "$wcwd_package_dir" "$root_dir"
