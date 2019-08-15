# canyoutle/wxdt:update

FROM node:10

RUN echo "\n\
# mirrors.aliyun.com\n\
deb http://mirrors.aliyun.com/debian/ stretch main non-free contrib\n\
deb-src http://mirrors.aliyun.com/debian/ stretch main non-free contrib\n\
deb http://mirrors.aliyun.com/debian-security stretch/updates main\n\
deb-src http://mirrors.aliyun.com/debian-security stretch/updates main\n\
deb http://mirrors.aliyun.com/debian/ stretch-updates main non-free contrib\n\
deb-src http://mirrors.aliyun.com/debian/ stretch-updates main non-free contrib\n\
deb http://mirrors.aliyun.com/debian/ stretch-backports main non-free contrib\n\
deb-src http://mirrors.aliyun.com/debian/ stretch-backports main non-free contrib\n\
" > /etc/apt/sources.list && cat /etc/apt/sources.list

RUN apt-get update \
  && apt-get install -y --no-install-recommends --allow-unauthenticated \
    wget \
    curl \
    p7zip-full


ENV LANG C.UTF-8
RUN echo "Asia/Shanghai" > /etc/timezone


ENTRYPOINT [ "bash" ]
