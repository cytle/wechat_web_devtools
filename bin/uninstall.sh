#! /bin/bash
# install desktop

root_dir=$(cd `dirname $0`/.. && pwd -P)

# TODO 能不能删
need_remove="$HOME/.local/share/applications/wechat_web_devtools.desktop"
if [ -f $need_remove ]; then
  echo "remove $need_remove"
  rm -v $need_remove
fi

# TODO 能不能删
need_remove="$HOME/.config/wechat_web_devtools"
if [ -d $need_remove ]; then
  rm -rfv $need_remove
fi
