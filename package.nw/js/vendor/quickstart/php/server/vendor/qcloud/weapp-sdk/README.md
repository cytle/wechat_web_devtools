# Wafer 服务端 SDK - PHP

[![Latest Stable Version][packagist-image]][packagist-url]
[![License][license-image]][license-url]

## 介绍

Wafer 服务端 SDK 是腾讯云为微信小程序开发者提供的快速开发库，SDK 封装了以下功能供小程序开发者快速调用：

- 用户登录与验证
- 信道服务
- 图片上传
- 数据库

开发者只需要根据文档对 SDK 进行初始化配置，就可以获得以上能力。你还可以直接到[腾讯云小程序控制台](https://console.qcloud.com/la)购买小程序解决方案，可以得到运行本示例所需的资源和服务，其中包括已部署好的相关程序、示例代码及自动下发的 SDK 配置文件 `/etc/qcloud/sdk.config`。

## 安装

- 方法一（推荐）：使用 PHP 包依赖管理工具 `composer` 执行以下命令安装

```sh
composer require qcloud/weapp-sdk
```

- 方法二： 直接下载本仓库 `ZIP` 包解压到项目目录中

## API

参见 [API 文档](./API.md)

## 使用

### 加载 SDK

```php
// 方法一：使用 composer 加载
require_once 'path/to/vendor/autoload.php';

// 方法二：不使用 composer 加载
require_once 'path/to/qcloud/weapp-sdk/AutoLoader.php';
```

### 初始化 SDK 配置项

```php
use \QCloud_WeApp_SDK\Conf;

Config::setup(array(
    'appId'          => '微信小程序 AppID',
    'appSecret'      => '微信小程序 AppSecret',
    'useQcloudLogin' => false,
    'mysql' => [
        'host' => 'localhost',
        'port' => 3306,
        'user' => 'root',
        'pass' => '',
        'db'   => 'cAuth',
        'char' => 'utf8mb4'
    ],
    'cos' => [
        'region'       => 'cn-south',
        'fileBucket'   => 'test',
        'uploadFolder' => ''
    ],
    'serverHost'         => '1234567.qcloud.la',
    'tunnelServerUrl'    => '1234567.ws.qcloud.la',
    'tunnelSignatureKey' => 'abcdefghijkl',
    'qcloudAppId'        => '121000000',
    'qcloudSecretId'     => 'ABCDEFG',
    'qcloudSecretKey'    => 'abcdefghijkl',
    'wxMessageToken'     => 'abcdefghijkl',
));
```

具体配置项说明请查看：[API 文档](/API.md#sdk-配置)。

### 处理用户登录请求

```php
use \QCloud_WeApp_SDK\Auth\LoginService;
use \QCloud_WeApp_SDK\Constants;

$result = LoginService::login();

// $result => [
//   loginState: 1  // 1表示登录成功，0表示登录失败
//   userinfo: []   // 用户信息
// ]

if ($result['loginState'] === Constants::S_AUTH) {
    // 微信用户信息：`$result['userinfo']['userinfo']`
} else {
    // 登录失败原因：`$result['error']`
}
```

### 检查请求登录态

```php
use \QCloud_WeApp_SDK\Auth\LoginService;
use \QCloud_WeApp_SDK\Constants;

$result = LoginService::check();

// $result => [
//   loginState: 1  // 1表示登录成功，0表示登录失败
//   userinfo: []   // 用户信息
// ]

if ($result['loginState'] === Constants::E_AUTH) {
    // 登录失败原因：`$result['error']`
    return;
}

// 使用微信用户信息（`$result['userinfo']['userinfo']`）处理其它业务逻辑
// ...
```

### 使用信道服务

业务在一个路由上（如 `/tunnel`）提供信道服务，只需把该路由上的请求都交给 SDK 的信道服务处理即可。

```php
use \QCloud_WeApp_SDK\Tunnel\TunnelService;
use \QCloud_WeApp_SDK\Tunnel\ITunnelHandler;

class TunnelHandler implements ITunnelHandler {
    // TODO: 传入登录的用户信息
    public function __construct($userinfo) {

    }

    // TODO: 实现 onRequest 方法，处理信道连接请求
    public function onRequest($tunnelId, $tunnelUrl) {

    }

    // TODO: 实现 onConnect 方法，处理信道连接事件
    public function onConnect($tunnelId) {

    }

    // TODO: 实现 onMessage 方法，处理信道消息
    public function onMessage($tunnelId, $type, $content) {

    }

    // TODO: 实现 onClose 方法，处理信道关闭事件
    public function onClose($tunnelId) {

    }
}

$handler = new TunnelHandler();
TunnelService::handle($handler, array('checkLogin' => TRUE));
```

使用信道服务需要实现处理器，来获取处理信道的各种事件，具体可参考接口 [ITunnelHandler](/API.md#itunnelhandler) 的 API 文档以及配套 Demo 中的 [ChatTunnelHandler](/application/business/ChatTunnelHandler.php) 的实现。

### MySQL 操作类

SDK 在 PDO 的基础上完成了对增删改查等常用操作的封装，并默认会在初始化 SDK 的时候连接数据库，直接通过如下代码可以快速使用 MySQL 操作类：

> **注意：**MySQL 操作类为静态类

```php
use \QCloud_WeApp_SDK\Mysql\Mysql as DB;

// 查询数据
$res = DB::row('cSessionInfo', ['*'], ['open_id' => '1234567890']);     // 查询一条
$res = DB::select('cSessionInfo', ['*'], ['open_id' => '1234567890']);  // 查询多条

// 插入数据
$res = DB::insert('cSessionInfo', ['open_id' => '1234567890']);

// 更新数据
$res = DB::update('cSessionInfo', ['open_id' => '1234567890'], ['uuid' => '1']);

// 删除数据
$res = DB::delete('cSessionInfo', ['open_id' => '1234567890']);
```

具体配置项说明请查看：[API 文档](/API.md#MySQL)。

### COS 实例

SDK 导出了一个 COS V5 API 实例，可以使用以下代码获取：

```php
use \QCloud_WeApp_SDK\Cos\CosAPI as Cos;

$cosClient = Cos::getInstance();
$cosClient->upload('mybucket', 'test.txt', 'Hello World')->toArray();
```

更多关于 `Cos::getInstance()` 返回 COS 实例的 API，可以查看 [COS PHP SDK V5 文档](https://github.com/tencentyun/cos-php-sdk-v5)

### 详细示例

参见项目：[Wafer2 服务端 DEMO - PHP](https://github.com/tencentyun/wafer2-php-server-demo)

## LICENSE

[MIT](LICENSE)

[packagist-image]: https://img.shields.io/packagist/v/qcloud/weapp-sdk.svg
[packagist-url]: https://packagist.org/packages/qcloud/weapp-sdk
[license-image]: https://img.shields.io/github/license/tencentyun/wafer-php-server-sdk.svg
[license-url]: LICENSE
