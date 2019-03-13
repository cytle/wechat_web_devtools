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


port=6082
prebase_container="wxdt-base"
prebase_image="canyoutle/wxdt:prebase"
base_image="canyoutle/wxdt:base"

# 构建dockerfile
docker build -t $prebase_image -f Dockerfile-base .

# kill wxdt-base
docker kill $prebase_container || echo "$prebase_container is not running"
# 运行容器
docker run -d --rm \
    --name $prebase_container -P -p $port:80 \
    --mount type=bind,source=$PWD,target=/wxdt \
    $prebase_image

# 然后在浏览器中打开 http://ip:6080 `docker-machine ip`获得的ip
echo "Please open this link(http://$(docker-machine ip):$port/) and continue after the installation"

echo "sleep 10s"
sleep 10s
# 在容器内安装
docker exec -it $prebase_container /wxdt/bin/wxdt install
docker exec -it $prebase_container /root/.config/wechat_web_devtools/WeappVendor/wcsc.exe # 会自动启动wine配置
docker commit $prebase_container $base_image
