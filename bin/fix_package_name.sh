#! /bin/bash

root_dir=$(cd `dirname $0`/.. && pwd -P)

sed -ri -e 's#微信开发者工具#wechat_web_devtools#g' $root_dir/package.nw/package.json
