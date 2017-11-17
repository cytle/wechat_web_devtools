<?php
defined('BASEPATH') OR exit('No direct script access allowed');

// 加载 SDK
require_once './vendor/autoload.php';
require_once './config.php';

use \QCloud_WeApp_SDK\Conf as Conf;

// 系统判断
if (PHP_OS === 'WINNT') {
    $sdkConfigPath = 'C:\qcloud\sdk.config';
} else {
    $sdkConfigPath = '/data/release/sdk.config.json';
}

if (!file_exists($sdkConfigPath)) {
    echo "SDK 配置文件（{$sdkConfigPath}）不存在";
    die;
}

// 合并 sdk config 和原来的配置
$sdkConfig = json_decode(file_get_contents($sdkConfigPath), true);

if (!is_array($sdkConfig)) {
    echo "SDK 配置文件（{$sdkConfigPath}）内容不合法";
    die;
}

$config = array_merge($sdkConfig, $config);

/**
 * --------------------------------------------------------------------
 * 设置 SDK 基本配置
 * --------------------------------------------------------------------
 */
Conf::setup($config);

/**
 * --------------------------------------------------------------------
 * 设置 SDK 日志输出配置（主要是方便调试）
 * --------------------------------------------------------------------
 */

// 开启日志输出功能
Conf::setEnableOutputLog(true);

// 指定 SDK 日志输出目录（注意尾斜杠不能省略）
Conf::setLogPath(APPPATH . 'logs/');

// 设置日志输出级别
// 1 => ERROR, 2 => DEBUG, 3 => INFO, 4 => ALL
Conf::setLogThresholdArray([2]); // output debug log only
