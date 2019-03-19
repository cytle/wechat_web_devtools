#!/bin/sh

trap clean EXIT

clean() {
    if [ -d '/root/.config/wechat_web_devtools' ]; then
        echo 'clean'
        rm -rf /root/.config/wechat_web_devtools/Default/.ide
        rm -rf /root/.config/wechat_web_devtools/Singleton*
    fi
}

clean

exec /startup.sh > "/var/log/startup.log" 2>&1 &

if [ -z "$1" ]; then
  exit 0
fi

while [ true ]
do
  if [ -f '/root/.config/wechat_web_devtools/Default/.ide' ]; then break; fi
  echo "sleep 2s 等待 /startup.sh 准备完毕. "
  sleep 2s
done

exec $@
