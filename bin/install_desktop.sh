#! /bin/bash
# install desktop

root_dir=$(cd `dirname $0`/.. && pwd -P)

sed -r -e 's/\/path\/to/'${root_dir//\//\\\/}'/g' "$root_dir/desktop.example" > "$root_dir/dist/wechat_dev_tools.desktop"

if type desktop-file-install >/dev/null 2>&1; then
  desktop-file-install "$root_dir/dist/wechat_dev_tools.desktop" --dir=$HOME/.local/share/applications
else
  echo 'no exists desktop-file-install'
  if [ -d "$HOME/.local/share/applications" ]; then
    cp "$root_dir/dist/wechat_dev_tools.desktop" $HOME/.local/share/applications/
  fi
fi
