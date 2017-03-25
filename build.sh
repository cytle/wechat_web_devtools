#! /bin/sh
# tar wechat-dev-tools

. ./build.conf
package_dir="./package.nw"
tmp_dir="./.tmp"
dist_dir="./dist"
build_dir="./.build"
nwjs_file="nwjs-v$nwjs_v.tar.gz"
nwjs_dir="nwjs-sdk-v${nwjs_v}-linux-x64"
nwjs_download="https://dl.nwjs.io/v$nwjs_v/nwjs-sdk-v${nwjs_v}-linux-x64.tar.gz"

dist_wechat_dir="wechat-dev-tools"
dist_wechat_package="wechat-v${wechat_v}-nwjs-v${nwjs_v}.tar.gz"
mkdir -p $tmp_dir
if [ ! -d "$tmp_dir/$nwjs_dir" ]; then
  if [ ! -f "$tmp_dir/$nwjs_file" ]; then
    wget "$nwjs_download" -O .tmp/$nwjs_file
    $? -ne 0 && exit $?
  fi

  tar -xf $tmp_dir/$nwjs_file -C $tmp_dir
  $? -ne 0 && exit $?
fi

rm -rf $dist_dir
mkdir -p $dist_dir/$dist_wechat_dir
cp -rl "$tmp_dir/$nwjs_dir"/* "$dist_dir/$dist_wechat_dir" &&
cp -rl "$package_dir" "$dist_dir/$dist_wechat_dir" &&
tar -zcvf "$dist_dir/$dist_wechat_package" "$dist_dir/$dist_wechat_dir"

mkdir -p $build_dir
cp -l "$dist_dir/$dist_wechat_package" "$build_dir"

