# Linux微信web开发者工具

linux下使用微信web开发者工具.

![wx-dev-tools v-1.01.171019](https://img.shields.io/badge/wx_dev_tools-1.01.171019-green.svg)
![nw.js v-0.19.4](https://img.shields.io/badge/nw.js-v0.19.4-blue.svg)

## Description
**Linux微信web开发者工具** 可在linux桌面环境跑起微信开发者工具,原理是微信开发者
工具本质是nw.js程序,把它移植到linux下没大问题.然后,负责编译wxml和wxss(可能还有
其他功能)的wcc和wcsc,利用wine来跑皆可.

- 2017/03/28 更新:微信小程序升级到0.15.152800
- 2017/03/30 更新:微信小程序升级到0.15.152900
- 2017/05/18 更新:微信小程序升级到0.17.170900
- 2017/05/19 更新:微信小程序升级到0.17.171900
- 2017/05/29 更新:微信小程序升级到0.17.172600
- 2017/06/23 更新:微信小程序升级到0.18.182200
- 2017/07/11 更新:微信小程序升级到0.19.191100
- 2017/07/26 更新:微信小程序升级到0.20.191900
- 2017/08/20 更新:微信小程序升级到0.21.201800
- 2017/09/25 更新:微信小程序升级到0.22.203100
- 2017/09/01 更新:微信小程序升级到1.01.170831
- 2017/09/18 更新:微信小程序升级到1.01.170913
- 2017/09/27 更新:微信小程序升级到1.01.170925
- 2017/10/14 更新:微信小程序升级到1.01.171013
- 2017/10/28 更新:微信小程序升级到1.01.171019

### 更新到最新版

1. 执行脚本会自动下载安装最新开发者工具（window x64）

```console
./bin/update_package_nw.sh
```

2. 安装过程中确认安装到`$HOME/.wine/drive_c/Program Files (x86)/Tencent/微信web开发者工具`路径下

3. 最后完成去掉打开开发者工具的钩

然后执行`./bin/wxdt`，如果没有问题欢迎提PR~

## Usage

```console
git clone git@github.com:cytle/wechat_web_devtools.git
cd wechat_web_devtools
./bin/wxdt
```

### 需要小程序开发
1. 用下面的命令安装wine(ubuntu下)

推荐安装1.8或1.6版本的wine
```console
sudo apt install wine
```

2. wcc.exe和wcsc.exe是32位的,用下面命令创建32位环境

```console
WINEARCH=win32 WINEPREFIX=~/.wine32 winecfg
```

3. 安装

```console
./bin/wxdt install
```

4. 启动

```console
./bin/wxdt
```

## 更新

直接pull就好了

```console
git pull origin
```

如果wcc和wcsc编译有问题，执行以下，让工具重新生成wcc和wcsc，**会删除开发者工具配置文件,所有工程和登录信息会消失**

```console
./bin/wxdt uninstall
./bin/wxdt install
```

## 截图

![截图1](https://github.com/cytle/wechat_web_devtools/raw/fb84550d2d9b9f40f7a80b896066e1933892eff9/images/截图1.png)

![调试界面](https://github.com/cytle/wechat_web_devtools/raw/fb84550d2d9b9f40f7a80b896066e1933892eff9/images/调试界面.png)

上面项目来自[wechat-v2ex](https://github.com/jectychen/wechat-v2ex)

## 卸载

1. 关闭微信web开发者工具
2. 项目文件夹下运行`./bin/wxdt uninstall`(删除桌面图标、微信web开发者工具配置目录)
3. 删除项目文件夹

## 其它

### 免责声明
微信开发者工具版权归腾讯公司所有，本项目指在交流学习之用，如有不当之处，请联系本人，邮箱：canyoutle@gmail.com
