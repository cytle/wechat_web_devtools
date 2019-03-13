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

# 构建dockerfile
docker build -t canyoutle/wxdt-desktop:prebase -f Dockerfile-base .

# kill wxdt-base
docker kill wxdt-base || echo 'wxdt-base is not running'
# 运行容器
docker run -d --rm --name wxdt-base -P -p 6080:80 --mount type=bind,source=$PWD,target=/wxdt canyoutle/wxdt-desktop:prebase
# 然后在浏览器中打开 http://ip:6080 `docker-machine ip`获得的ip
echo "Please open this link(http://$(docker-machine ip):6080/) and continue after the installation"
echo "sleep 10s"
sleep 10s
# 在容器内安装
docker exec -it wxdt-base /wxdt/bin/wxdt install
docker exec -it wxdt-base /root/.config/wechat_web_devtools/WeappVendor/wcsc.exe # 会自动启动wine配置
docker commit wxdt-base canyoutle/wxdt:base
