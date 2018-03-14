<?php
namespace QCloud_WeApp_SDK\Auth;

use \Exception as Exception;

use \QCloud_WeApp_SDK\Helper\Util as Util;
use \QCloud_WeApp_SDK\Constants as Constants;

class LoginService {
    public static function login() {
        try {
            $code = self::getHttpHeader(Constants::WX_HEADER_CODE);
            $encryptedData = self::getHttpHeader(Constants::WX_HEADER_ENCRYPTED_DATA);
            $iv = self::getHttpHeader(Constants::WX_HEADER_IV);

            return AuthAPI::login($code, $encryptedData, $iv);
        } catch (Exception $e) {
            return [
                'loginState' => Constants::E_AUTH,
                'error' => $e->getMessage()
            ];
        }
    }

    public static function check() {
        try {
            $skey = self::getHttpHeader(Constants::WX_HEADER_SKEY);

            return AuthAPI::checkLogin($skey);
        } catch (Exception $e) {
            return [
                'loginState' => Constants::E_AUTH,
                'error' => $e->getMessage()
            ];
        }
    }

    private static function getHttpHeader($headerKey) {
        $headerValue = Util::getHttpHeader($headerKey);

        if (!$headerValue) {
            throw new Exception("请求头未包含 {$headerKey}，请配合客户端 SDK 登录后再进行请求");
        }

        return $headerValue;
    }
}
