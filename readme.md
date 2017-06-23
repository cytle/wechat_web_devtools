# Linux微信web开发者工具

linux下使用微信web开发者工具.

![wx-dev-tools v-0.18.182200](https://img.shields.io/badge/wx_dev_tools-0.18.182200-green.svg)
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

## Usage

```console
git clone git@github.com:cytle/wechat_web_devtools.git
cd wechat_web_devtools
./bin/wxdt
```

### 需要小程序开发
1. 用下面的命令安装wine(ubuntu下)

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

![新建项目界面](https://github.com/cytle/wechat_web_devtools/raw/a27def24bd78aa529bbab641cca83694ba6f35d0/images/新建项目界面.png)


![设置界面](https://github.com/cytle/wechat_web_devtools/raw/a27def24bd78aa529bbab641cca83694ba6f35d0/images/设置界面.png)


![调试界面](https://github.com/cytle/wechat_web_devtools/raw/a27def24bd78aa529bbab641cca83694ba6f35d0/images/调试界面.png)

上面项目来自https://github.com/jectychen/wechat-v2ex

## 卸载

1. 关闭微信web开发者工具
2. 项目文件夹下运行`./bin/wxdt uninstall`(删除桌面图标、微信web开发者工具配置目录)
3. 删除项目文件夹


## 其它

### 免责声明
微信开发者工具版权归腾讯公司所有，本项目指在交流学习之用，如有不当之处，请联系本人，邮箱：canyoutle@gmail.com

