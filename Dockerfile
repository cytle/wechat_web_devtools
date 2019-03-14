# canyoutle/wxdt
# 开发者工具各版本docker image
# see also bin/build_docker.sh
# Usage:
# docker run -P -p 6080:80 --mount type=bind,source=$PWD,target=/weapps canyoutle/wxdt

FROM canyoutle/wxdt:base

ENV PATH="/wxdt/bin:${PATH}"

RUN echo "\n\
[program:wxdt]\n\
priority=25\n\
directory=/wxdt/bin/\n\
command=bash wxdt start\n\
stderr_logfile=/var/log/wxdt.err.log\n\
stdout_logfile=/var/log/wxdt.out.log\n\
" >> /etc/supervisor/conf.d/supervisord.conf

COPY . /wxdt
RUN /wxdt/bin/update_nwjs.sh
RUN rm -rf /tmp/wxdt_xsp
RUN rm -rf ~/.config/wechat_web_devtools/Singleton*
