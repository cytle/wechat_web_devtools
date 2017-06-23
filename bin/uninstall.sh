#! /bin/bash
# install desktop

root_dir=$(cd `dirname $0`/.. && pwd -P)

# TODO 能不能删
need_remove="$HOME/.local/share/applications/wechat_dev_tools.desktop"
if [ -f $need_remove ]; then
  echo "remove $need_remove"
  rm -v $need_remove
fi

# TODO 能不能删
need_remove="$HOME/.config/微信web开发者工具"
if [ -d $need_remove ]; then
  rm -rfv $need_remove
fi
