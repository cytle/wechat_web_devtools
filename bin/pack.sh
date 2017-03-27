#! /bin/sh
# tar wechat-dev-tools

cd `dirname $0`/..

cur_dir=$(pwd)

. "$cur_dir/bin/build.conf"

tmp_dir="$cur_dir/.tmp"
dist_dir="$cur_dir/dist"

nwjs_file="$tmp_dir/nwjs-v$nwjs_v.tar.gz"
nwjs_dir="$tmp_dir/nwjs-sdk-v${nwjs_v}-linux-x64"
nwjs_download="https://dl.nwjs.io/v$nwjs_v/nwjs-sdk-v${nwjs_v}-linux-x64.tar.gz"

dist_wechat_dir="wechat-dev-tools-xsp"
dist_wechat_package="wechat-v${wechat_v}-nwjs-v${nwjs_v}.tar.gz"


mkdir -p $tmp_dir
if [ ! -d "$nwjs_dir" ]; then
  if [ ! -f "$nwjs_file" ]; then
    wget "$nwjs_download" -O $nwjs_file
    $? -ne 0 && exit "$?"
  fi

  tar -xf $nwjs_file -C $tmp_dir
  $? -ne 0 && exit "$?"
  cd "$nwjs_dir/locales" || exit "$?"
  rm $(ls -I "zh*" -I "en*" )
  cd "$cur_dir"
fi

rm -rf $cur_dir/dist
mkdir -p $cur_dir/dist
cp -r "$nwjs_dir"/* "$cur_dir/package.nw" "$cur_dir/scripts" "$cur_dir/dist"

mkdir -p $tmp_dir/build

tar -zcvf "$tmp_dir/build/$dist_wechat_package" -C "$cur_dir" dist
