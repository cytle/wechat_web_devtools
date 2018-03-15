<?php
/**
 * COS 操作类
 */

namespace QCloud_WeApp_SDK\Cos;

use \QCloud_WeApp_SDK\Conf as Conf;
use \QCloud_WeApp_SDK\Constants as Constants;
use \Qcloud\Cos\Client as Client;

/**
 * 简单的使用 COS 初始化实例
 * 类为静态类，全部静态调用
 */
class CosAPI
{
    private static $cosClient = NULL;

    public static function getInstance () {
        if (!self::$cosClient) {
            $cos = Conf::getCos();
            $config = [
                'region' => $cos['region'],
                'credentials' => [
                    'appId' => Conf::getQcloudAppId(),
                    'secretId' => Conf::getQcloudSecretId(),
                    'secretKey' => Conf::getQcloudSecretKey(),
                ]
            ];

            try {
                self::$cosClient = new Client($config);
            } catch (Exception $e) {
                throw new Exception(Constants::E_INIT_COS_SDK . ': '. $e->getMessage());
            }
        }

        return self::$cosClient;
    }
}

