#! /bin/bash

root_dir=$(cd `dirname $0`/.. && pwd -P)

# rm -rf $root_dir/package.nw/node_modules/node-sync-ipc
# ln -sf $root_dir/packages/node-sync-ipc $root_dir/package.nw/node_modules/node-sync-ipc

# ls $root_dir/package.nw/js/*.js | xargs sed -ri -e 's/f\.isMac\?"node-sync-ipc":"node-sync-ipc-nwjs"/"node-sync-ipc"/g'

cd $root_dir/package.nw/node_modules/node-sync-ipc
npm install

# cd $root_dir/package.nw/node_modules/node-sync-ipc-nwjs
# npm run install
