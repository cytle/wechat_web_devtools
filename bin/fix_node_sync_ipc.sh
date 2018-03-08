#! /bin/bash

root_dir=$(cd `dirname $0`/.. && pwd -P)

rm -rf $root_dir/package.nw/node_modules/node-sync-ipc
cp -R $root_dir/packages/node-sync-ipc $root_dir/package.nw/node_modules
ln -f $root_dir/bin/node $root_dir/dist
