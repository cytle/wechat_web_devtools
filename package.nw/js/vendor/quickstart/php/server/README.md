# Wafer 服务端 Demo - PHP

本仓库是 [Wafer](https://github.com/tencentyun/wafer) 组成部分，提供 PHP 版本业务服务器示例。示例需要和[微信小程序客户端示例](https://github.com/tencentyun/weapp-client-demo)配合一起使用。

## 运行示例

选择合适的方式[部署 Wafer](https://github.com/tencentyun/wafer/wiki#%E9%83%A8%E7%BD%B2%E6%96%B9%E5%BC%8F)，并按照[小程序创建资源配置指引](https://github.com/tencentyun/weapp-doc)进行操作，可以得到运行本示例所需的资源和服务。请参考以下配置。

- SDK 配置文件：`/etc/qcloud/sdk.config`
- 示例代码部署目录：`/data/release/php-weapp-demo`
- 运行示例的 nginx 配置文件: `/etc/nginx/conf.d/php-weapp-demo.conf`
- PHP 版本：`v5.6.27`
- composer 版本：`v1.2.1`
- nginx 版本：`v1.10.1`

## 项目结构

```
Demo
├── application
│   ├── business
│   │   └── ChatTunnelHandler.php
│   ├── cache
│   ├── config
│   ├── controllers
│   │   ├── Welcome.php
│   │   ├── Login.php
│   │   ├── User.php
│   │   └── Tunnel.php
│   ├── core
│   ├── helpers
│   │   └── general_helper.php
│   ├── hooks
│   ├── language
│   ├── libraries
│   ├── logs
│   ├── models
│   ├── third_party
│   ├── vendor
│   └── views
│       └── welcome_message.php
├── index.php
├── install_qcloud_sdk.php
├── composer.json
└── system
```

示例使用 `CodeIgniter(v3.1)` 框架制作。其中，`index.php` 是 启动文件，`install_qcloud_sdk.php` 用于初始化 SDK 配置，配置从文件 `/etc/qcloud/sdk.config` 中读取。配置文件包含如下配置项：

```json
{
    "serverHost": "业务服务器的主机名",
    "authServerUrl": "鉴权服务器地址",
    "tunnelServerUrl": "信道服务器地址",
    "tunnelSignatureKey": "和信道服务器通信的签名密钥",
    "networkTimeout": 30000
}
```
其中 `networkTimeout` 为超时时间，单位是**毫秒**。

`composer.json` 文件中声明了对 SDK 的依赖，可执行命令 `composer install` 安装依赖。

`application/controllers/` 目录包含了示例用到的4个路由，路由和处理文件映射关系如下：

```
// 首页指引
/ => application/controllers/Welcome.php

// 登录
/login => application/controllers/Login.php

// 获取微信用户信息
/user => application/controllers/User.php

// 处理信道请求
/tunnel => application/controllers/Tunnel.php
```

`application/business/ChatTunnelHandler.php` 是业务处理信道请求的示例代码。

`application/helpers/general_helper.php` 包含简单的 `debug` 方法用于打印日志。


## 更新 SDK 版本
进入目录 `/data/release/php-weapp-demo`，然后执行命令 `composer update` 即可。


## 如果在demo基础上开发
将自己开发的接口放到如下目录下即可生效
/data/release/php-weapp-demo/application/controllers/

## 重启服务：
        service php-fpm restart
        
