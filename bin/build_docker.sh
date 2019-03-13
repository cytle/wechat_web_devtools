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
docker build -t canyoutle/wxdt .
