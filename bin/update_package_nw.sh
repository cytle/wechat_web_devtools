#! /bin/bash
# 更新微信开发者工具版本
#   1. 根据build.conf下载指定版本
#   2. 使用wine安装
#   3. 拷贝到package.nw

root_dir=$(cd `dirname $0`/.. && pwd -P)

. "$root_dir/bin/build.conf"

tmp_dir="/tmp/wxdt_xsp"
dist_dir="$root_dir/dist"

wcwd_file="$tmp_dir/wechat_web_devtools_${wechat_v}_x64.exe"
wcwd_download="https://dldir1.qq.com/WechatWebDev/${wechat_v//./}/wechat_web_devtools_${wechat_v}_x64.exe"

wcwd_package_dir="$HOME/.wine/drive_c/Program Files (x86)/Tencent/微信web开发者工具/package.nw"
onlineverdor_dir="$root_dir/package.nw/app/dist/weapp/onlinevendor"

mkdir -p $tmp_dir

# 下载
if [ ! -f "$wcwd_file" ]; then
  echo "================================="
  echo "[注意]需要下载微信开发者工具.请耐心等待下载完成"
  echo $wcwd_download
  echo "================================="
  wget "$wcwd_download" -O $wcwd_file
fi

# 安装
wine $wcwd_file

rm -rf "$root_dir/package.nw"
cp -r "$wcwd_package_dir" "$root_dir"

# 链接wcc.exe wcsc.exe
ln "$onlineverdor_dir/*.exe" "$root_dir/bin/WeappVendor/s"
