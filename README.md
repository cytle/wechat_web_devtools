# Linux微信web开发者工具

linux 下使用微信web开发者工具.

![wx-dev-tools v-1.02.1812271](https://img.shields.io/badge/wx_dev_tools-1.02.1812271-green.svg)
![nw.js v-0.24.4](https://img.shields.io/badge/nw.js-v0.24.4-blue.svg)

## Description

**Linux微信web开发者工具**, 可在 `linux` 桌面环境跑起 `微信开发者工具`,
原理是 `微信开发者工具` 本质是 `nw.js` 程序, 把它移植到 `linux` 下没大问题.
负责编译 `wxml` 和 `wxss` 的 `wcc` 和 `wcsc` (可能还有其他功能),
则利用 `wine` 来跑即可.

欢迎提PR~

## Changelog

- [更新日志](CHANGELOG.md)
- [腾讯官方更新日志](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)

## 安装 Wine

请先安装 [Wine](https://wiki.winehq.org/Download)
以 `Ubuntu` 为例: https://wiki.winehq.org/Ubuntu

## 下载并安装 微信web开发者工具

1. 下载项目

``` bash
git clone https://github.com/cytle/wechat_web_devtools.git
```

2. 进入目录

``` bash
cd wechat_web_devtools
```

3. 安装`wine`

``` bash
sudo apt-get install wine-binfmt
sudo update-binfmts --import /usr/share/binfmts/wine
```

4. 自动下载最新 `nw.js` , 同时部署目录 `~/.config/wechat_web_devtools/`

``` bash
./bin/wxdt install
```

## Usage

### 启动ide

``` bash
./bin/wxdt
```

### 命令行调用

命令行工具所在位置: `<安装路径>/bin/cli`

### HTTP 调用

端口号文件位置：`~/.config/wechat_web_devtools/Default/.ide`

文档参考: [HTTP 调用 · 小程序](https://developers.weixin.qq.com/miniprogram/dev/devtools/http.html)

## 错误排除

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

执行

``` bash
sudo apt-get install wine-binfmt
sudo update-binfmts --import /usr/share/binfmts/wine
```

完成后, 点击 <kbd>编译</kbd> 即可.

参考:

1. https://github.com/cytle/wechat_web_devtools/issues/66#issuecomment-368434141
2. https://github.com/cytle/wechat_web_devtools/issues/56#issuecomment-371999385

## 更新到最新版

### 方法 1: 直接从当前项目源码 进行 更新 (稳定, 推荐)

``` bash
git pull origin
```

### 方法 2: 使用腾讯原始安装程序 进行 自助复制更新 (及时, 自行折腾)

**注**: 如果抽风了, 可以尝试使用 `git reset --hard` 等操作, 还原到最初的状态.

执行更新, 自动下载最新 `Windows x64` 版开发者工具, 并且使用`7z`解压.  

``` bash
./bin/update_package_nw.sh
```

*Tips*

- 运行没问题，欢迎PR

## 截图

![截图1](https://github.com/cytle/wechat_web_devtools/raw/fb84550d2d9b9f40f7a80b896066e1933892eff9/images/截图1.png)

![调试界面](https://github.com/cytle/wechat_web_devtools/raw/fb84550d2d9b9f40f7a80b896066e1933892eff9/images/调试界面.png)

上面项目来自[wechat-v2ex](https://github.com/jectychen/wechat-v2ex)

## 卸载

1. 关闭 `微信web开发者工具`
2. 项目文件夹下运行 `./bin/wxdt uninstall` (删除桌面图标、微信web开发者工具配置目录),
   **开发者工具配置文件, 所有工程和登录信息均会消失**
3. 删除项目文件夹

## 其它

### Ubuntu环境下编辑器字体安装

Ubuntu环境下默认没有`Cosolas`字体，同时目前无法修改字体，因此下载安装Consolas字体是较优方案，使得编辑器将显示更舒服。

* 下载`https://github.com/kakkoyun/linux.files/raw/master/fonts/Consolas.ttf` 至`/usr/local/share/fonts` or `~/.fonts`
* `sudo fc-cache -f`重建字体缓存
* 确认字体安装成功
```
 sudo fc-list|grep Consol
.fonts/Consolas.ttf: Consolas:style=Regular
```
* 重启微信开发者工具

### 免责声明

微信开发者工具版权归腾讯公司所有，本项目旨在交流学习之用。如有不当之处，请联系本人，邮箱：canyoutle@gmail.com

## 赞赏

<img width="400px" height="400px" alt="赞赏码" src="https://raw.githubusercontent.com/cytle/wechat_web_devtools/master/images/%E5%BE%AE%E4%BF%A1%E8%B5%9E%E8%B5%8F%E7%A0%81.jpeg"/>
