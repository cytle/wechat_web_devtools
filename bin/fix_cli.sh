#! /bin/bash

root_dir=$(cd `dirname $0`/.. && pwd -P)

sed -ri -e 's/USERPROFILE/HOME/g' $root_dir/package.nw/js/common/cli/index.js
sed -ri -e 's#AppData/Local/\$\{global.userDirName\}/User Data/#.config/\$\{global.userDirName\}#g' $root_dir/package.nw/js/common/cli/index.js
