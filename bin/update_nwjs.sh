#! /bin/bash
# 下载nwjs，构建项目


root_dir=$(cd `dirname $0`/.. && pwd -P)

nwjs_v=`cat $root_dir/nwjs_v`
tmp_dir="/tmp/wxdt_xsp"

nwjs_file="$tmp_dir/nwjs-v$nwjs_v.tar.gz"
nwjs_dir="$tmp_dir/nwjs-sdk-v${nwjs_v}-linux-x64"
nwjs_download="https://dl.nwjs.io/v$nwjs_v/nwjs-sdk-v${nwjs_v}-linux-x64.tar.gz"

dist_dir="$root_dir/dist"

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
  cd "$nwjs_dir/locales" || exit "$?"
  # 移除其他语言
  ls -I "zh*" -I "en*" | xargs rm
  cd "$root_dir"
fi


rm -rf "$dist_dir"
mkdir -p "$dist_dir"

cp -r "$nwjs_dir"/* "$dist_dir"
ln -sf "../package.nw" "$dist_dir/package.nw"

echo "$nwjs_v" > "$dist_dir/nwjs_version"

echo "update nwjs success"
