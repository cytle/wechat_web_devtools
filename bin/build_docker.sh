#! /bin/bash

set -e # 命令出错就退出
trap 'catchError $LINENO $BASH_COMMAND' SIGHUP SIGINT SIGQUIT EXIT # 捕获错误情况

catchError() {
    exit_code=$?
    if [ $exit_code -ne 0 ]; then
        echo "Error: $2 at $0:$1(exit_code: $exit_code)"
    fi
    exit $exit_code
}

cd "`dirname $0`/.."

port=6081
update_container="wxdt-update"
update_image="canyoutle/wxdt:base"
target_image="canyoutle/wxdt"

# kill wxdt-base
docker kill $update_container || echo "$update_container is not running"
# 运行容器
docker run -d --rm \
    --name $update_container -P -p $port:80 \
    --mount type=bind,source=$PWD,target=/wxdt \
    $update_image

# 然后在浏览器中打开 http://ip:6080 `docker-machine ip`获得的ip
echo "Please open this link(http://$(docker-machine ip):$port/) and preview devtools"

# 在容器内安装
docker exec -it wxdt-base /wxdt/bin/update_package_nw.sh
wechat_v=`cat ./wechat_v`

# 构建dockerfile
docker build -t $target_image .
docker tag $target_image "$target_image:$wechat_v"

docker kill $update_container
