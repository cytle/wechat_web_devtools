

FROM canyoutle/wxdt:latest

# install wine and config wine
RUN dpkg --add-architecture i386 \
  && wget -nc https://dl.winehq.org/wine-builds/winehq.key \
  && apt-key add winehq.key \
  && apt-add-repository 'deb https://dl.winehq.org/wine-builds/ubuntu/ bionic main' \
  && apt-get update \
  && apt-get install -y --no-install-recommends --allow-unauthenticated winehq-stable

# 配置wine
RUN env LC_ALL=zh_CN.UTF-8 wine /wxdt/package.nw/js/vendor/wcsc.exe

# 替换WxappVendor
RUN docker-entrypoint.sh wxdt install
