#! /bin/bash

root_dir=$(cd `dirname $0`/.. && pwd -P)

dev_tools_config_dir="$HOME/.config/微信web开发者工具"

rm -rf $dev_tools_config_dir

cd $root_dir/dist;

./nw &

nw_pid=$!

echo "please wait 5s!"
sleep 1s
echo "4s"
sleep 1s
echo "3s"
sleep 1s
echo "2s"
sleep 1s
echo "1s"
sleep 1s
echo "after 5s"

kill -9 $nw_pid
if [ -d "$dev_tools_config_dir" ]; then
  cd $dev_tools_config_dir/WeappVendor
  mkdir -p s
  mv wc* s
  echo "cp $root_dir/bin/WeappVendor/* $(pwd)"
  cp $root_dir/bin/WeappVendor/* ./
  echo "Success"
else
  echo "Fail! Please reinstall"
fi
