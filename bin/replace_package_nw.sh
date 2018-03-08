#! /bin/bash

root_dir=$(cd `dirname $0`/.. && pwd -P)

ls $root_dir/package.nw/js/*.js | xargs sed -ri -e 's/f\.isMac\?"node-sync-ipc":"node-sync-ipc-nwjs"/"node-sync-ipc"/g'
