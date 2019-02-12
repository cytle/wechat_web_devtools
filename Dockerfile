FROM dorowu/ubuntu-desktop-lxde-vnc:bionic
RUN sed -i 's#http://\(archive\|security\).ubuntu.com/#http://mirrors.aliyun.com/#' /etc/apt/sources.list \
  && cat /etc/apt/sources.list
RUN apt-get update \
  && apt-get install -y --no-install-recommends --allow-unauthenticated \
    wget \
    curl \
    p7zip \
    gpg-agent

# # install wine-binfmt
# RUN apt-get install -y --no-install-recommends --allow-unauthenticated \
#     wine-binfmt
# RUN update-binfmts --import /usr/share/binfmts/wine

# install wine and config wine
RUN dpkg --add-architecture i386 \
  && wget -nc https://dl.winehq.org/wine-builds/winehq.key \
  && apt-key add winehq.key \
  && apt-add-repository 'deb https://dl.winehq.org/wine-builds/ubuntu/ bionic main' \
  && apt-get update \
  && apt-get install -y --no-install-recommends --allow-unauthenticated winehq-stable \
  && mkdir -p $HOME/.wine32 \
  && WINEARCH=win32 WINEPREFIX=$HOME/.wine32 winecfg

# add wxdt
COPY . $HOME/wxdt
WORKDIR $HOME/wxdt
RUN sh bin/wxdt install

ENTRYPOINT ["$HOME/wxdt/docker-entrypoint.sh"]
