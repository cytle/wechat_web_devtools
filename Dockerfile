# canyoutle/wxdt-desktop
# docker run -P -p 6080:80 --mount type=bind,source=$PWD,target=/weapps wxdt-desktop
FROM dorowu/ubuntu-desktop-lxde-vnc:bionic

ENV LANG C.UTF-8
ENV DISPLAY :1.0
ENV HOME /root
RUN echo "Asia/Shanghai" > /etc/timezone
RUN dpkg-reconfigure -f noninteractive tzdata

RUN sed -i 's#http://\(archive\|security\).ubuntu.com/#http://mirrors.aliyun.com/#' /etc/apt/sources.list \
  && cat /etc/apt/sources.list
RUN apt-get update \
  && apt-get install -y --no-install-recommends --allow-unauthenticated \
    wget \
    curl \
    p7zip-full \
    gpg-agent \
    dbus \
    libgconf-2-4 \
    build-essential \
    ca-certificates \
    openssl \
    python2.7 \
    gnupg2

RUN echo "\n\
[program:wxdt]\n\
priority=25\n\
directory=/wxdt/bin/\n\
command=bash wxdt start\n\
stderr_logfile=/var/log/wxdt.err.log\n\
stdout_logfile=/var/log/wxdt.out.log\n\
" >> /etc/supervisor/conf.d/supervisord.conf

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
  && apt-get install -y --no-install-recommends --allow-unauthenticated winehq-stable

# install nodejs
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get install -y nodejs

# RUN mkdir -p $HOME/.wine32 \
#   && WINEARCH=win32 WINEPREFIX=$HOME/.wine32 winecfg

# COPY . /wxdt
# RUN /wxdt/bin/WeappVendor/wcc.exe
# RUN /wxdt/bin/wxdt install
