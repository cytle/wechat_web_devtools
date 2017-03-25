#! /bin/sh
# tar wechat-dev-tools

cur_dir=`dirname $0`
. "$cur_dir/build.conf"
package_dir="$cur_dir/package.nw"
tmp_dir="$cur_dir/.tmp"
build_dir="$cur_dir/dist"

nwjs_file="$tmp_dir/nwjs-v$nwjs_v.tar.gz"
nwjs_dir="$tmp_dir/nwjs-sdk-v${nwjs_v}-linux-x64"
nwjs_download="https://dl.nwjs.io/v$nwjs_v/nwjs-sdk-v${nwjs_v}-linux-x64.tar.gz"

dist_wechat_dir="wechat-dev-tools-xsp"
dist_wechat_package="$tmp_dir/wechat-v${wechat_v}-nwjs-v${nwjs_v}.tar.gz"


mkdir -p $tmp_dir
if [ ! -d "$nwjs_dir" ]; then
  if [ ! -f "$nwjs_file" ]; then
    wget "$nwjs_download" -O $nwjs_file
    $? -ne 0 && exit "$?"
  fi

  tar -xf $nwjs_file -C $tmp_dir
  $? -ne 0 && exit "$?"
fi

rm -rf $tmp_dir/$dist_wechat_dir
mkdir -p $tmp_dir/$dist_wechat_dir
cp -rl "$nwjs_dir"/* "$tmp_dir/$dist_wechat_dir" &&
cp -rl "$package_dir" "$tmp_dir/$dist_wechat_dir" &&
cp -rl "$cur_dir/WeappVendor" "$tmp_dir/$dist_wechat_dir" &&
cp -rl "$cur_dir/bin/install.sh" "$tmp_dir/$dist_wechat_dir" &&
tar -zcvf "$dist_wechat_package" -C "$tmp_dir" "$dist_wechat_dir"

mkdir -p $build_dir
mv -f "$dist_wechat_package" "$build_dir"

