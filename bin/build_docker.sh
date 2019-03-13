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

container_port=6081
container_name="wxdt-update"
container_image="canyoutle/wxdt:base"

# kill wxdt-base
docker kill $container_name || echo "$container_name is not running"
# 运行容器
docker run -d --rm \
    --name $container_name -P -p $container_port:80 \
    --mount type=bind,source=$PWD,target=/wxdt \
    $container_image

# 然后在浏览器中打开 http://ip:6080 `docker-machine ip`获得的ip
echo "Please open this link(http://$(docker-machine ip):$container_port/) and continue after the installation"

# 在容器内安装
docker exec -it wxdt-base /wxdt/bin/update_package_nw.sh
wechat_v=`cat ./wechat_v`

echo $wechat_v

# 构建dockerfile
docker build -t canyoutle/wxdt .
