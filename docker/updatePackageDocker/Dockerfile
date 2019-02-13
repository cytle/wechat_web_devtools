# wxdt:update_package_nw
# docker run -d -P --mount type=bind,source=$PWD,target=/wxdt wxdt:update_package_nw
FROM ubuntu:bionic
RUN sed -i 's#http://\(archive\|security\).ubuntu.com/#http://mirrors.aliyun.com/#' /etc/apt/sources.list \
  && cat /etc/apt/sources.list
RUN apt-get update \
  && apt-get install -y --no-install-recommends --allow-unauthenticated \
    wget \
    curl \
    p7zip

VOLUME /wxdt

ENTRYPOINT ["/wxdt/bin/update_package_nw.sh"]
