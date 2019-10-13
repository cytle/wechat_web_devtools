# Linux微信web开发者工具

linux 下使用微信web开发者工具.

![wx_dev_tools v1.02.1910121](https://img.shields.io/badge/wx_dev_tools-1.02.1910121-green.svg)
![nw.js v0.24.4](https://img.shields.io/badge/nw.js-v0.24.4-blue.svg)

## Description

**Linux微信web开发者工具**, 可在 `linux` 桌面环境跑起 `微信开发者工具`,
原理是 `微信开发者工具` 本质是 `nw.js` 程序, 把它移植到 `linux` 下没大问题.
负责编译 `wxml` 和 `wxss` 的 `wcc` 和 `wcsc` (可能还有其他功能),
则利用 `wine` 来跑即可.

## Usage

### 下载项目和初始化

``` bash
git clone https://github.com/cytle/wechat_web_devtools.git
cd wechat_web_devtools
# 自动下载最新 `nw.js` , 同时部署目录 `~/.config/wechat_web_devtools/`
./bin/wxdt install
```

### 启动ide，开发和调试网页

运行准备:

1. `GUI`环境

``` bash
./bin/wxdt # 启动
```

### 启动ide，开发和预览小程序

运行准备:

1. `GUI`环境
2. 需要[安装`wine`](#安装Wine)
3. 并且已经执行过`./bin/wxdt install`

``` bash
./bin/wxdt # 启动
```

### 命令行和HTTP调用

运行准备:

1. `GUI`环境，`命令行和HTTP调用`会自动启动`ide`(服务器没条件的可以使用`docker`)
2. 并且已经执行过`./bin/wxdt install`
3. 在`ide`的设置中开启服务端口： 设置 -> 安全 -> 服务端口(开启)

命令行工具所在位置: `<安装路径>/bin/cli`

端口号文件位置：`~/.config/wechat_web_devtools/Default/.ide`

微信文档参考:
- [命令行 调用 · 小程序](https://developers.weixin.qq.com/miniprogram/dev/devtools/cli.html)
- [HTTP 调用 · 小程序](https://developers.weixin.qq.com/miniprogram/dev/devtools/http.html)

### Docker

未安装`wine`，仅限`cli`调用

可以直接`run`

``` bash
docker run -it \
    -v $PWD:/projects \
    canyoutle/wxdt \
    sh -c "cli -l && cli -p /projects/your-project"
```

或是启动一个持久的容器

``` bash
docker run -d \
    --name wxdt \
    -p 6080:80 \
    -v $PWD:/projects \
    canyoutle/wxdt

docker exec -it wxdt cli -l # 登录
docker exec -it wxdt cli -p /projects/your-project # 预览工程

docker stop wxdt # 暂停容器
docker start wxdt # 下次使用，不用再run，可以直接exec
```

## 其它说明

### 安装Wine

请参考搜索引擎安装 [Wine](https://wiki.winehq.org/Download)，以下是`Ubuntu`下两种安装

#### 1. 安装`wine-binfmt`

``` bash
sudo apt-get install wine-binfmt
sudo update-binfmts --import /usr/share/binfmts/wine
```

#### 2. 正常安装`wine`

``` bash
dpkg --add-architecture i386 \
  && wget -nc https://dl.winehq.org/wine-builds/winehq.key \
  && apt-key add winehq.key \
  && apt-add-repository 'deb https://dl.winehq.org/wine-builds/ubuntu/ bionic main' \
  && apt-get update \
  && apt-get install -y --no-install-recommends --allow-unauthenticated winehq-stable
```

### `./bin/wxdt install` 报错失败

> ./nw: error while loading shared libraries: libnw.so: cannot open shared object file: No such file or directory

该错误是由 `nw.js` 下载失败所致.
删除缓存, 重新下载即可.

``` bash
rm -rf /path/to/wechat_web_devtools/dist
rm -rf /tmp/wxdt_xsp
```

``` bash
# 请务必等待执行完成
./bin/wxdt install
```

参考

- https://github.com/cytle/wechat_web_devtools/issues/49#issuecomment-350478295

### `wcc` 和 `wcsc` 编译错误

是`wine`没安装好导致的，或是没有成功替换`wcc` 和 `wcsc`两个二进制文件

- 方案一: 安装`wine`并且执行`./bin/wxdt install`
- 方案二: 安装`wine-binfmt`

完成后, 点击 <kbd>编译</kbd> 即可.

参考:

1. https://github.com/cytle/wechat_web_devtools/issues/66#issuecomment-368434141
2. https://github.com/cytle/wechat_web_devtools/issues/56#issuecomment-371999385

### 更新到最新版

#### 方案一: 直接从当前项目源码 进行 更新 (稳定, 推荐)

``` bash
git pull origin
```

#### 方案二: 使用腾讯原始安装程序 进行 自助复制更新 (及时, 自行折腾)

**注**: 如果抽风了, 可以尝试使用 `git reset --hard` 等操作, 还原到最初的状态.

执行更新, 自动下载最新 `Windows x64` 版开发者工具, 并且使用`7z`解压.  

``` bash
./bin/update_package_nw.sh
```

*Tips*

- 运行没问题，欢迎PR

### Ubuntu环境下编辑器字体安装

Ubuntu环境下默认没有`Cosolas`字体，同时目前无法修改字体，因此下载安装Consolas字体是较优方案，使得编辑器将显示更舒服。

- 下载`https://github.com/kakkoyun/linux.files/raw/master/fonts/Consolas.ttf` 至`/usr/local/share/fonts` or `~/.fonts`
- `sudo fc-cache -f`重建字体缓存
- 确认字体安装成功

``` bash
sudo fc-list|grep Consol
.fonts/Consolas.ttf: Consolas:style=Regular
```

- 重启微信开发者工具

### 卸载

1. 关闭 `微信web开发者工具`
2. 项目文件夹下运行 `./bin/wxdt uninstall` (删除桌面图标、微信web开发者工具配置目录),
   **开发者工具配置文件, 所有工程和登录信息均会消失**
3. 删除项目文件夹

### Arch Linux

Arch Linux 及其衍生发行版，如 Manjaro，可以通过 AUR 进行安装：https://aur.archlinux.org/packages/wechat-devtool/

## 截图

![截图1](https://github.com/cytle/wechat_web_devtools/raw/fb84550d2d9b9f40f7a80b896066e1933892eff9/images/截图1.png)

![调试界面](https://github.com/cytle/wechat_web_devtools/raw/fb84550d2d9b9f40f7a80b896066e1933892eff9/images/调试界面.png)

上面项目来自[wechat-v2ex](https://github.com/jectychen/wechat-v2ex)

## 赞赏

<img width="400px" height="400px" alt="赞赏码" src="https://raw.githubusercontent.com/cytle/wechat_web_devtools/master/images/%E5%BE%AE%E4%BF%A1%E8%B5%9E%E8%B5%8F%E7%A0%81.jpeg"/>

## Changelog

- [更新日志](CHANGELOG.md)
- [腾讯官方更新日志](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)

## 免责声明

微信开发者工具版权归腾讯公司所有，本项目旨在交流学习之用。如有不当之处，请联系本人，邮箱：canyoutle@gmail.com
