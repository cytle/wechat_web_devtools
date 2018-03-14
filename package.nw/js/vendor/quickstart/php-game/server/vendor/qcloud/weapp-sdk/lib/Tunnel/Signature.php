<?php
namespace QCloud_WeApp_SDK\Tunnel;

use \QCloud_WeApp_SDK\Conf as Conf;

class Signature {
    /**
     * 计算签名
     */
    public static function compute($input) {
        return sha1($input . Conf::getTunnelSignatureKey(), FALSE);
    }

    /**
     * 校验签名
     */
    public static function check($input, $signature) {
        return self::compute($input) === $signature;
    }
}
