#! /bin/sh

cd $(dirname $0)
cur_dir=$(pwd)
dev_tools_config_dir="$HOME/.config/微信web开发者工具"

rm -rf $dev_tools_config_dir

./nw
# TODO close nw

if [ -d "$dev_tools_config_dir" ]; then
  cd $dev_tools_config_dir/WeappVendor
  mkdir -p s
  mv wc* s
  echo "cp $cur_dir/WeappVendor/* $(pwd)"
  cp $cur_dir/WeappVendor/* ./
fi


