# canyoutle/wxdt-desktop
# docker run -P -p 6080:80 --mount type=bind,source=/Users/xsp/src/js,target=/weapps --mount type=bind,source=$PWD,target=/wxdt canyoutle/wxdt-desktop
FROM canyoutle/wxdt-desktop:base

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

# RUN mkdir -p $HOME/.wine32 \
#   && WINEARCH=win32 WINEPREFIX=$HOME/.wine32 winecfg
