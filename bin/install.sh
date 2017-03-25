#! /bin/sh

package=$1
target_dir="$HOME/wechat-dev-tools-xsp"
dev_tools_config_dir="$HOME/.config/微信web开发者工具"

rm -rf $target_dir
mkdir $target_dir

tar -xzvf $package -C $HOME

rm -rf $dev_tools_config_dir
cd $target_dir &&
./nw
# TODO close nw

if [ -d "$dev_tools_config_dir" ]; then
  cd $dev_tools_config_dir/WeappVendor
  mkdir -p s
  mv wc* s
  cp $target_dir/WeappVendor/* ./
fi


