#! /bin/bash

root_dir=$(cd `dirname $0`/.. && pwd -P)

sed -ri -e 's/=\.\/js\/extensions/=\.\/package\.nw\/js\/extensions/g' $root_dir/package.nw/package.json
