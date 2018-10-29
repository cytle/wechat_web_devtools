## 开发准备

### 获取bucket列表 listbuckets
#### 方法原型
```php
public Guzzle\Service\Resource\Model listBucket(array $args = array())
```
#### 成功返回值

|      返回值类型               |        返回值描述        |
| :-------------:               | :-----------------: |
| Guzzle\Service\Resource\Model | bucket列表的信息  |

#### 示例

```php
//获取bucket列表
$result = $cosClient->listBuckets();
```


### 简单文件上传 putobject

#### 方法原型

```php
public Guzzle\Service\Resource\Model putObject(array $args = array())
```

#### 参数说明

$args是包含以下字段的关联数组：

| 字段名   |       类型                | 默认值 | 是否必填字段 |                  描述                  |
| :------: | :------------:            | :--:   | :--------:   | :----------------------------------: |
| Bucket   |     string                |  无    | 是           |               bucket名称               |
|    Key   |     string                |  无    | 是           |         对象名称         |
|    Body  |      string\|resource     |  无    | 是           |                 对象的内容                 |
|    ACL   |      string               |  无    | 否           |                 ACL权限控制                 |
| Metadata | associative-array<string> |  无    | 否           | 用户的自定义头(x-cos-meta-)和HTTP头(metadata) |

#### 成功返回值

|      返回值类型               |        返回值描述        |
| :-------------:               | :-----------------: |
| Guzzle\Service\Resource\Model | 文件上传成功后属性信息, 如ETag, |

#### 示例

```php
// 从内存中上传
$cosClient->putObject(array(
    'Bucket' => 'testbucket',
    'Key' => 'hello.txt',
    'Body' => 'Hello World!'));

// 上传本地文件
$cosClient->putObject(array(
    'Bucket' => 'testbucket',
    'Key' => 'hello.txt',
    'Body' => fopen('./hello.txt', 'rb')));
```



### 分块文件上传 multiupload

分块文件上传是通过将文件拆分成多个小块进行上传，多个小块可以并发上传, 最大支持40TB。

分块文件上传的步骤为:

1. 初始化分块上传，获取uploadid。(createMultipartUpload)
2. 分块数据上传(可并发).  (uploadPart)
3. 完成分块上传。 (completeMultipartUpload)

另外还包含获取已上传分块(listParts), 终止分块上传(abortMultipartUpload)。

#### 方法原型

```php
// 初始化分块上传
public Guzzle\Service\Resource\Model createMultipartUpload(array $args = array());

// 上传数据分块
public Guzzle\Service\Resource\Model uploadPart(array $args = array());
            
// 完成分块上传
public Guzzle\Service\Resource\Model completeMultipartUpload(array $args = array());

// 罗列已上传分块
public Guzzle\Service\Resource\Model listParts(array $args = array());

// 终止分块上传
public Guzzle\Service\Resource\Model abortMultipartUpload(array $args = array());
```
### 上传文件 upload
#### 示例
```php
//上传文件
$result = $cosClient->upload(
                 $bucket = 'testbucket',
                 $key = '111.txt',
                 $body = '131213');
```
单文件小于5M时，使用单文件上传
反之使用分片上传

### 下载文件 getobject

将文件下载到本地或者下载到内存中.

#### 方法原型

```php
// 下载文件
public Guzzle\Service\Resource\Model getObject(array $args = array());
```

#### 参数说明

$args是包含以下字段的关联数组：

| 字段名   |       类型     | 默认值 | 是否必填字段 |                  描述                  |
| :------: |    :------------: | :--:   | :--------:   | :----------------------------------: |
| Bucket   |     string     |  无    | 是           |               bucket名称               |
| Key      |     string     |  无    | 是           |         对象名称         |
| SaveAs   |     string     |  无    | 否           | 保存到本地的本地文件路径                 |

#### 成功返回值

|      返回值类型               |        返回值描述        |
| :-------------:               | :-----------------: |
| Guzzle\Service\Resource\Model | 对象下载成功后返回的属性信息，比如ETag、ContentLength等 |

#### 示例

```php
// 下载文件到内存
$result = $cosClient->getObject(array(
    'Bucket' => 'testbucket',
    'Key' => 'hello.txt'));

// 下载文件到本地
$result = $cosClient->getObject(array(
    'Bucket' => 'testbucket',
    'Key' => 'hello.txt',
    'SaveAs' => './hello.txt'));
```


### 删除文件 deleteobject

删除COS上的对象.

#### 方法原型

```php
// 删除文件
public Guzzle\Service\Resource\Model deleteObject(array $args = array());
```

#### 参数说明

$args是包含以下字段的关联数组：

| 字段名   |       类型     | 默认值 | 是否必填字段 |                  描述                  |
| :------: | :------------: | :--:   | :--------:   | :----------------------------------: |
| Bucket   |     string     |  无    | 是           |               bucket名称               |
| Key      |     string     |  无    | 是           |         对象名称         |

#### 成功返回值

|      返回值类型               |        返回值描述        |
| :-------------:               | :-----------------: |
| Guzzle\Service\Resource\Model | 包含RequestId等信息 |

#### 示例

```php
// 删除COS对象
$result = $cosClient->deleteObject(array(
    'Bucket' => 'testbucket',
    'Key' => 'hello.txt'));
```



### 获取对象属性 headobject

查询获取COS上的对象属性

#### 方法原型

```php
// 获取文件属性
public Guzzle\Service\Resource\Model headObject(array $args = array());
```

#### 参数说明

$args是包含以下字段的关联数组：

| 字段名   |       类型     | 默认值 | 是否必填字段 |                  描述                  |
| :------: | :------------: | :--:   | :--------:   | :----------------------------------: |
| Bucket   |     string     |  无    | 是           |               bucket名称               |
| Key      |     string     |  无    | 是           |         对象名称         |

#### 成功返回值

|      返回值类型               |        返回值描述        |
| :-------------:               | :-----------------: |
| Guzzle\Service\Resource\Model | 对象的相关属性信息 |

#### 示例

```java
// 获取COS文件属性
$result $cosClient->headObject(array('Bucket' => 'testbucket', 'Key' => 'hello.txt'));
```


### 获取文件列表 listbucket

查询获取COS上的文件列表

#### 方法原型

```php
// 获取文件列表
public Guzzle\Service\Resource\Model listObjects(array $args = array());
```

#### 参数说明

$args是包含以下字段的关联数组：

| 字段名   |       类型     | 默认值 | 是否必填字段 |                  描述                  |
| :------: | :------------: | :--:   | :--------:   | :----------------------------------: |
| Bucket   |     string     |  无    | 是           |               bucket名称               |
| Delimiter      |     string     |  无    | 否          |         分隔符         |
| Marker      |     string     |  无    | 否          |         标记        |
| MaxKeys      |     int     |  无    | 否          |         最大对象个数         |
| Prefix      |     string     |  无    | 否           |         前缀         |

#### 成功返回值

|      返回值类型               |        返回值描述        |
| :-------------:               | :-----------------: |
| Guzzle\Service\Resource\Model | 对象列表的结果信息 |

#### 示例

```php
// 获取bucket下成员
$result = $cosClient->listObjects(array('Bucket' => 'testbucket'));
```

### 获得object下载url

获得object带签名的下载url

#### 示例

```php
//获得object的下载url
$bucket =  'testbucket';
$key = 'hello.txt';
$region = 'cn-south';
$url = "/{$key}";
$request = $cosClient->get($url);
$signedUrl = $cosClient->getObjectUrl($bucket, $key, '+10 minutes');
```
### 使用临时密钥

```php
$cosClient = new Qcloud\Cos\Client(
    array(
        'region' => 'cn-south',
        'timeout' => ,
        'credentials'=> array(
            'appId' => '',
            'secretId'    => '',
            'secretKey' => '',
            'token' => '')));

