#! /bin/bash

root_dir=$(cd `dirname $0`/.. && pwd -P)


# xargs sed -ri -e \
# 's/"node-sync-ipc-nwjs"/"node-sync-ipc"/g' \
# $root_dir/package.nw/core.wxvpkg

cd $root_dir/package.nw/node_modules/node-sync-ipc
npm install

# cd $root_dir/package.nw/node_modules/node-sync-ipc-nwjs
# npm install

rm -rf $root_dir/package.nw/node_modules/node-sync-ipc-nwjs

# ln -sf ./node-sync-ipc \
# $root_dir/package.nw/node_modules/node-sync-ipc-nwjs

cp -rf $root_dir/package.nw/node_modules/node-sync-ipc \
$root_dir/package.nw/node_modules/node-sync-ipc-nwjs
