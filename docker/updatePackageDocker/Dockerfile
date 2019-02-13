# wxdt-update
# docker run -d -P --mount type=bind,source=$PWD,target=/wxdt wxdt-update
FROM ubuntu:bionic

ENV LANG C.UTF-8

RUN sed -i 's#http://\(archive\|security\).ubuntu.com/#http://mirrors.aliyun.com/#' /etc/apt/sources.list \
  && cat /etc/apt/sources.list \
  && apt-get update
RUN apt-get install -y --no-install-recommends --allow-unauthenticated \
  build-essential \
  wget \
  curl \
  p7zip-full \
  ca-certificates \
  gpg-agent \
  openssl \
  python2.7 \
  gnupg2

# install nodejs
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get install -y --no-install-recommends nodejs

# install npm
RUN curl -0 -L https://npmjs.com/install.sh | sh

VOLUME /wxdt

ENTRYPOINT ["/wxdt/bin/update_package_nw.sh"]
