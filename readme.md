# Linux微信web开发者工具

凌晨三点终于搞定了linux下开发者工具的使用,已经完美使用.

![wx-dev-tools v-0.14.140900](https://img.shields.io/badge/wx_dev_tools-0.14.1409-green.svg)
![nw.js v-0.19.4](https://img.shields.io/badge/nw.js-v0.19.4-blue.svg)


![新建项目界面](https://github.com/cytle/wechat_web_devtools/raw/87d19c36f6931e05bd565c48cf0467f60e74ffde/images/%E5%B0%8F%E7%A8%8B%E5%BA%8F%E5%88%9B%E5%BB%BA.png)


![编辑界面](https://github.com/cytle/wechat_web_devtools/raw/87d19c36f6931e05bd565c48cf0467f60e74ffde/images/2017-03-27%2011-43-56%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE.png)


![调试界面](https://github.com/cytle/wechat_web_devtools/raw/87d19c36f6931e05bd565c48cf0467f60e74ffde/images/2017-03-27%2011-44-34%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE.png)


## Description
**Linux微信web开发者工具** 可在linux桌面环境跑起微信开发者工具,原理是微信开发者
工具本质是nw.js程序,把它移植到linux下没大问题.然后,负责编译wxml和wxss(可能还有
其他功能)的wcc和wcsc,利用wine来跑皆可.

## Installation

1. 用下面的命令安装wine(ubuntu下)

```console
sudo apt install wine
```

2. wcc.exe和wcsc.exe是32位的,用下面命令创建32位环境
```console
WINEARCH=win32 WINEPREFIX=~/win32 winecfg
```

3. 下载个版本


4. 解压下载的文件,并且安装
```console
tar -xzfv wechat-v0.14.140900-nwjs-v0.19.4.tar.gz
cd wechat-v0.14.140900-nwjs-v0.19.4/dist && sh ./srcipt/install.sh
```

5. 启动
```console
./nw
```




