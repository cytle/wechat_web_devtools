#! /bin/bash
# 下载nwjs，构建项目，支持以下选项
#   pack    - 打包
#   install - 构建，并且执行scripts/replace_weapp_vendor.sh
#   build   - 可以使用，但不执行scripts/replace_weapp_vendor.sh

want=${1:-"build"}
if [ $want = "install" -o $want = "build" -o $want = "pack" ]; then
  echo $want
else
  echo "不支持$want操作"
  exit 127
fi

cd `dirname $0`/..

root_dir=$(pwd)

. "$root_dir/bin/build.conf"

tmp_dir="$root_dir/.tmp"
dist_dir="$root_dir/dist"

nwjs_file="$tmp_dir/nwjs-v$nwjs_v.tar.gz"
nwjs_dir="$tmp_dir/nwjs-sdk-v${nwjs_v}-linux-x64"
nwjs_download="https://dl.nwjs.io/v$nwjs_v/nwjs-sdk-v${nwjs_v}-linux-x64.tar.gz"

dist_wechat_package="wechat-v${wechat_v}-nwjs-v${nwjs_v}.tar.gz"

mkdir -p $tmp_dir
if [ ! -d "$nwjs_dir" ]; then
  if [ ! -f "$nwjs_file" ]; then
    echo "================================="
    echo "[注意]需要下载nwjs.请耐心等待下载完成"
    echo "$nwjs_download"
    echo "================================="
    wget "$nwjs_download" -O "$nwjs_file"
    $? -ne 0 && exit "$?"
  fi

  tar -xf "$nwjs_file" -C $tmp_dir
  $? -ne 0 && exit "$?"
  cd "$nwjs_dir/locales" || exit "$?"
  # 移除其他语言
  ls -I "zh*" -I "en*" | xargs rm
  cd "$root_dir"
fi

rm -rf "$dist_dir"
mkdir -p "$dist_dir"

cp -r "$nwjs_dir"/* "$root_dir/scripts" "$dist_dir"

if [ $want = "pack" ]; then
  cp -r "$root_dir/package.nw" "$dist_dir"
  mkdir -p "$tmp_dir/build"
  tar -zcvf "$tmp_dir/build/$dist_wechat_package" -C "$root_dir" dist
else
  ln -sf "$root_dir/package.nw" "$dist_dir/package.nw"
  if [ $want = "install" ]; then
    sh "$dist_dir/scripts/replace_weapp_vendor.sh"
  fi
fi

echo "================================="
echo "$want success"
echo "可以手动删除目录下.tmp文件夹"
echo "================================="
