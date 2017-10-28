#! /bin/bash
# 更新微信开发者工具版本
#   1. 根据build.conf下载指定版本
#   2. 使用wine安装
#   3. 拷贝到package.nw

root_dir=$(cd `dirname $0`/.. && pwd -P)


tmp_dir="/tmp/wxdt_xsp"
dist_dir="$root_dir/dist"
cur_wechat_v=`cat $root_dir/wechat_v`
echo "当前wechat_v: $cur_wechat_v"


wcwd_package_dir="$HOME/.wine/drive_c/Program Files (x86)/Tencent/微信web开发者工具/package.nw"
vendor_dir="$root_dir/package.nw/js/vendor"
wcwd_download='https://servicewechat.com/wxa-dev-logic/download_redirect?type=x64&from=mpwiki'
wechat_v=$(http --headers $wcwd_download | grep -oP --color=never '(?<=wechat_devtools_)[\d\.]+(?=_x64\.exe)')


if [ -z "$wechat_v" ]; then
  echo "下载版本为空"
  exit 1
fi

echo "最新wechat_v: $wechat_v"

if [ "$wechat_v" = "$cur_wechat_v" ]; then
  echo "当前已经是最新版本"
  exit 0
fi

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

# 安装 来自 https://github.com/cytle/wechat_web_devtools/issues/43
env LC_ALL=zh_CN.UTF-8 wine $wcwd_file

rm -rf "$root_dir/package.nw"
echo "$wcwd_package_dir"
cp -r "$wcwd_package_dir" "$root_dir"

# sh "$root_dir/bin/replace_package_nw.sh"

# 链接wcc.exe wcsc.exe
ln -f "$vendor_dir/wcc.exe" "$root_dir/bin/WeappVendor/s"
ln -f "$vendor_dir/wcsc.exe" "$root_dir/bin/WeappVendor/s"

echo $wechat_v > $root_dir/wechat_v

echo '安装完成'
echo "wechat_v: $(cat $root_dir/wechat_v)"
