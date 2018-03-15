## 目录

- [SDK 配置](#sdk-配置)
- [会话服务](#会话服务)
- [信道服务](#信道服务)

## SDK 配置

> 在使用本 SDK 提供的其他 API 之前，需调用以下和配置项相关的 API 进行初始化。

### 命名空间

`QCloud_WeApp_SDK`

### API

#### Conf::setup(array $config)

可以使用本方法批量设置所有配置。

##### 参数

- `appId` - 可选。微信小程序的 App id
- `appSecret` - 可选。微信小程序的 App secret
- `useQcloudLogin` - 必填。是否使用腾讯云代理登录小程序。会话登录需要使用小程序的 App id 和 App secret 来解密用户信息，腾讯云提供使用腾讯云 App id 和 App secret 代理请求微信进行解密。如果该项为 `false`，则需填写微信小程序 App id 和 App secret。默认为 `true`
- `mysql` - 必填。MySQL 配置。不填则使用小程序解决方案分配机器中默认的 MySQL，若使用自行部署的 MySQL 数据库，则需提供一个类型为 `object`  的配置，具体配置项如下：
  - `host` - 必填。MySQL 主机名
  - `user` - 必填。MySQL 用户名
  - `db` - 必填。MySQL 数据库名
  - `pass` - 必填。MySQL 密码，若使用了腾讯云微信小程序解决方案，开发环境下，MySQL 的初始密码为您的微信小程序 appid
  - `port` - 选填。MySQL 端口（默认：3306）
  - `char` - 选填。MySQL 编码
- `cos` - 必填。腾讯云对象存储配置信息，用于上传模块使用。
  - `region` - 必填。COS 的地域
  - `fileBucket` - 必填。COS 的 bucket 名
  - `uploadFolder` - 必填。COS 上传文件夹名
  - `maxSize` - 选填。COS 上传最大大小，默认 5M (单位：M)
  - `field` - 选填。COS 上传是 field 名称，默认为 `file`
- `serverHost` - 必填。当前服务器的 hostname
- `tunnelServerUrl` - 必填。信道服务器地址
- `tunnelSignatureKey` - 必填。信道服务签名密钥
- `qcloudAppId` - 必填。腾讯云 AppId
- `qcloudSecretId` - 必填。腾讯云 SecretId
- `qcloudSecretKey` - 必填。腾讯云 SecretKey
- `wxMessageToken` - 必填。微信客服消息通知 token
- `wxLoginExpires` - 可选。微信登录态有效期，默认 7200 秒（单位：秒）

**如果购买了腾讯云小程序解决方案，配置项中 `serverHost`, `tunnelServerUrl`, `tunnelSignatureKey`, `qcloudAppId`, `qcloudSecretId`, `qcloudSecretKey`, `wxMessageToken` 由腾讯云自动下发到您的服务器上。**

自动下发的 SDK 配置文件地址： `/data/release/sdk.config.json`

##### 返回值

`void`

## 会话服务

### 命名空间

`QCloud_WeApp_SDK\Auth`

### API

#### LoginService::login()

该静态方法用于处理用户登录。

##### 参数

无

##### 返回值

登录成功时，返回：

```php
array(
    'loginState' => 1,
    'userinfo' => array(
        // 第三方 key
      	'skey' => 'fy89ayri3h2ifs'
        // 微信用户信息
        'userinfo' => array(...),
    ),
)
```

登录失败时，返回：

```php
array(
    'loginState' => 0,
    'error' => '失败原因'
)
```

#### LoginService::check()

该静态方法用于校验登录态。

##### 参数

无

##### 返回值

校验登录态成功时，返回：

```php
array(
    'loginState' => 1,
    'userinfo' => array(
        // 微信用户信息
    ),
)
```

校验登录态失败时，返回：

```php
array(
    'loginState' => 0,
    'error' => '失败原因'
)
```

## 信道服务

### 命名空间

`QCloud_WeApp_SDK\Tunnel`

### API

#### ITunnelHandler

处理信道请求需实现该接口，接口定义和描述如下：

```php
interface ITunnelHandler {
    /*----------------------------------------------------------------
     * 初始化时传入用户信息
     *----------------------------------------------------------------
     * @param array $userinfo 用户信息
     *----------------------------------------------------------------
     */
  	public function __construct ($userinfo);
  
    /*----------------------------------------------------------------
     * 在客户端请求 WebSocket 信道连接之后会调用该方法
     * 此时可以把信道 ID 和用户信息关联起来
     *----------------------------------------------------------------
     * @param string $tunnelId  信道 ID
     * @param string $tunnelUrl 信道地址
     *----------------------------------------------------------------
     */
    public function onRequest($tunnelId, $tunnelUrl);

    /*----------------------------------------------------------------
     * 在客户端成功连接 WebSocket 信道服务之后会调用该方法
     * 此时可以通知所有其它在线的用户当前总人数以及刚加入的用户是谁
     *----------------------------------------------------------------
     * @param string $tunnelId  信道 ID
     *----------------------------------------------------------------
     */
    public function onConnect($tunnelId);

    /*----------------------------------------------------------------
     * 客户端推送消息到 WebSocket 信道服务器上后会调用该方法
     * 此时可以处理信道的消息
     *----------------------------------------------------------------
     * @param string $tunnelId  信道 ID
     * @param string $type      消息类型
     * @param mixed  $content   消息内容
     *----------------------------------------------------------------
     */
    public function onMessage($tunnelId, $type, $content);

    /*----------------------------------------------------------------
     * 客户端关闭 WebSocket 信道或者被信道服务器判断为已断开后会调用该方法
     * 此时可以进行清理及通知操作
     *----------------------------------------------------------------
     * @param string $tunnelId  信道 ID
     *----------------------------------------------------------------
     */
    public function onClose($tunnelId);
}
```

#### TunnelService::handle(ITunnelHandler $handler[, array $options])

该静态方法用于处理信道请求。

##### 参数

- `$handler` - 该参数须实现接口 `ITunnelHandler`（必填）
- `$options` - 该参数支持的可选选项如下：
    - `checkLogin` - 是否校验登录态（默认为 `FALSE`）

##### 返回值

`void`

> 当 `checkLogin` 为 `FALSE` 时，传递给 `ITunnelHandler->onRequest` 的参数 `$userInfo` 值为 `NULL`。

#### TunnelService::broadcast(array $tunnelIds, string $messageType, mixed $messageContent)

该静态方法用于广播消息到多个信道。

##### 参数

- `$tunnelIds` - 要广播消息的信道 ID 列表（必填）
- `$messageType` - 要广播消息的消息类型（必填）
- `$messageContent` - 要广播消息的消息内容（必填）

##### 返回值

消息广播成功时，返回：

```php
array(
    'code' => 0,
    'message' => 'OK',
    'data' => array(
        // 广播消息时无效的信道 IDs
        'invalidTunnelIds' => array(...),
    ),
)
```

消息广播失败时，返回：

```php
array(
    'code' => '失败错误码（非0）',
    'message' => '失败原因',
)
```

#### TunnelService::emit(string $tunnelId, string $messageType, mixed $messageContent)

该静态方法用于发送消息到指定信道。

##### 参数

- `$tunnelId` - 要发送消息的信道 ID（必填）
- `$messageType` - 要发送消息的消息类型（必填）
- `$messageContent` - 要发送消息的消息内容（必填）

##### 返回值

消息发送成功时，返回：

```php
array(
    'code' => 0,
    'message' => 'OK',
)
```

消息发送失败时，返回：

```php
array(
    'code' => '失败错误码（非0）',
    'message' => '失败原因',
)
```

#### TunnelService::closeTunnel(string $tunnelId)

该静态方法用于关闭指定信道。

##### 参数

- `$tunnelId` - 要关闭的信道 ID（必填）

##### 返回值

信道关闭成功时，返回：

```php
array(
    'code' => 0,
    'message' => 'OK',
)
```

信道关闭失败时，返回：

```php
array(
    'code' => '失败错误码（非0）',
    'message' => '失败原因',
)
```

## MySQL

### 命名空间

`QCloud_WeApp_SDK\Mysql`

### API

#### MySQL::getInstance()

获取 SDK 连接数据库实例，这个是个 [PDO 连接实例](http://php.net/manual/zh/class.pdo.php)。

##### 参数

无

##### 返回值

返回 PDO Instance

#### Mysql::insert($tableName, $data)

向数据库中插入数据

##### 参数

- `$tableName` - 要操作的数据表名（必填）
- `$data` - 要插入的数据（key-value 的 array 类型）

##### 返回值

受影响的行数（数值类型）。

##### 示例

```php
use QCloud_WeApp_SDK\Mysql\Mysql as DB;

DB::insert('tableName', [
    'nickname' => 'Jason',
  	'age' => 21
]);
```

#### Mysql::select($tableName[, $columns = ['*'], $conditions = '', $operator = 'and', $suffix = ''])

从数据库中查询多条数据

##### 参数

- `$tableName` - 要操作的数据表名（必填）
- `$columns` - 查询出来的列名
- `$conditions` - 查询条件，支持 string、array 和 key-value array 类型
- `$operator` - 条件之间的操作符
- `$suffix` - SQL 语句的后缀，可以用来插入 order、limit 等

##### 返回值

返回一个包含结果集中所有行的数组。

##### 示例

```php
use QCloud_WeApp_SDK\Mysql\Mysql as DB;

// 条件为字符串
$rows = DB::select('tableName', 'nickname = Jason');

// 条件为数组
$rows = DB::select('tableName', ['nickname = Jason']);

// 条件为 key-value 数组
$rows = DB::select('tableName', ['nickname' => 'Jason']);

// 查询结果
// $rows > [['nickname' => 'Jason','age' => 21]]
```

#### Mysql::row($tableName[, $columns = ['*'], $conditions = '', $operator = 'and', $suffix = ''])

从数据库中查询单条数据

##### 参数

- `$tableName` - 要操作的数据表名（必填）
- `$columns` - 查询出来的列名
- `$conditions` - 查询条件，支持 string、array 和 key-value array 类型
- `$operator` - 条件之间的操作符
- `$suffix` - SQL 语句的后缀，可以用来插入 order、limit 等

##### 返回值

返回一个包含结果集中所有行的第一行。

##### 示例

```php
use QCloud_WeApp_SDK\Mysql\Mysql as DB;

// 条件为字符串
$rows = DB::row('tableName', 'nickname = Jason');

// 条件为数组
$rows = DB::row('tableName', ['nickname = Jason']);

// 条件为 key-value 数组
$rows = DB::row('tableName', ['nickname' => 'Jason']);

// 查询结果
// $rows > ['nickname' => 'Jason','age' => 21]
```

#### Mysql::update($tableName, $updates[, $conditions = '', $operator = 'and', $suffix = ''])

从数据库中查询单条数据

##### 参数

- `$tableName` - 要操作的数据表名（必填）
- `$updates` - 更新的数据对象
- `$conditions` - 查询条件，支持 string、array 和 key-value array 类型
- `$operator` - 条件之间的操作符
- `$suffix` - SQL 语句的后缀，可以用来插入 order、limit 等

##### 返回值

受影响的行数（数值类型）。

##### 示例

```php
use QCloud_WeApp_SDK\Mysql\Mysql as DB;

// 条件为字符串
$rows = DB::update('tableName', ['age' => 22], 'nickname = Jason');

// 条件为数组
$rows = DB::update('tableName', ['age' => 22], ['nickname = Jason']);

// 条件为 key-value 数组
$rows = DB::update('tableName', ['age' => 22], ['nickname' => 'Jason']);

// 查询结果
// $rows > 1
```

#### Mysql::delete($tableName, $conditions[, $operator = 'and', $suffix = ''])

从数据库中删除数据

##### 参数

- `$tableName` - 要操作的数据表名（必填）
- `$conditions` - 查询条件，支持 string、array 和 key-value array 类型
- `$operator` - 条件之间的操作符
- `$suffix` - SQL 语句的后缀，可以用来插入 order、limit 等

##### 返回值

受影响的行数（数值类型）。

##### 示例

```php
use QCloud_WeApp_SDK\Mysql\Mysql as DB;

// 条件为字符串
$rows = DB::delete('tableName', 'nickname = Jason');

// 条件为数组
$rows = DB::delete('tableName', ['nickname = Jason']);

// 条件为 key-value 数组
$rows = DB::delete('tableName', ['nickname' => 'Jason']);

// 查询结果
// $rows > 1
```

## COS 对象储存 SDK

### 命名空间

`QCloud_WeApp_SDK\Cos`

### API

#### CosAPI::getInstance()

获取 COS 初始化实例

##### 参数

无

##### 示例

```php
use \QCloud_WeApp_SDK\Cos\CosAPI as Cos;

$cosClient = Cos::getInstance();
$cosClient->upload('mybucket', 'test.txt', 'Hello World')->toArray();
```

更多关于 `Cos::getInstance()` 返回 COS 实例的 API，可以查看 [COS PHP SDK V5 文档](https://github.com/tencentyun/cos-php-sdk-v5)。