# canyoutle/wxdt
# docker run -P -p 6080:80 --mount type=bind,source=$PWD,target=/weapps canyoutle/wxdt
FROM canyoutle/wxdt:base

COPY . /wxdt

# RUN /root/.config/wechat_web_devtools/WeappVendor/wcc.exe
