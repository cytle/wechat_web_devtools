<?php
namespace QCloud_WeApp_SDK\Auth;

use \Exception as Exception;

use \QCloud_WeApp_SDK\Conf as Conf;
use \QCloud_WeApp_SDK\Model\User as User;
use \QCloud_WeApp_SDK\Constants as Constants;
use \QCloud_WeApp_SDK\Helper\Logger as Logger;
use \QCloud_WeApp_SDK\Helper\Request as Request;

class AuthAPI {
    /**
     * 用户登录接口
     * @param {string} $code        wx.login 颁发的 code
     * @param {string} $encryptData 加密过的用户信息
     * @param {string} $iv          解密用户信息的向量
     * @return {array} { loginState, userinfo }
     */
    public static function login($code, $encryptData, $iv) {
        // 1. 获取 session key
        list($session_key, $openid) = array_values(self::getSessionKey($code));

        // 2. 生成 3rd key (skey)
        $skey = sha1($session_key . mt_rand());

        // 如果只提供了 code
        // 就用 code 解出来的 openid 去查数据库
        if ($code && !$encryptData && !$iv) {
            $userInfo = User::findUserByOpenId($openid);
            $wxUserInfo = json_decode($userInfo->user_info);
            
            // 更新登录态
            User::storeUserInfo($wxUserInfo, $skey, $session_key);

            return [
                'loginState' => Constants::S_AUTH,
                'userinfo' => [
                    'userinfo' => $wxUserInfo,
                    'skey' => $skey
                ]
            ];
        }
        
        /**
         * 3. 解密数据
         * 由于官方的解密方法不兼容 PHP 7.1+ 的版本
         * 这里弃用微信官方的解密方法
         * 采用推荐的 openssl_decrypt 方法（支持 >= 5.3.0 的 PHP）
         * @see http://php.net/manual/zh/function.openssl-decrypt.php
         */
        $decryptData = \openssl_decrypt(
            base64_decode($encryptData),
            'AES-128-CBC',
            base64_decode($session_key),
            OPENSSL_RAW_DATA,
            base64_decode($iv)
        );
        $userinfo = json_decode($decryptData);

        // 4. 储存到数据库中
        User::storeUserInfo($userinfo, $skey, $session_key);

        return [
            'loginState' => Constants::S_AUTH,
            'userinfo' => compact('userinfo', 'skey')
        ];
    }

    public static function checkLogin($skey) {
        $userinfo = User::findUserBySKey($skey);
        if ($userinfo === NULL) {
            return [
                'loginState' => Constants::E_AUTH,
                'userinfo' => []
            ];
        }

        $wxLoginExpires = Conf::getWxLoginExpires();
        $timeDifference = time() - strtotime($userinfo->last_visit_time);
        
        if ($timeDifference > $wxLoginExpires) {
            return [
                'loginState' => Constants::E_AUTH,
                'userinfo' => []
            ];
        } else {
            return [
                'loginState' => Constants::S_AUTH,
                'userinfo' => json_decode($userinfo->user_info, true)
            ];
        }
    }

    /**
     * 通过 code 换取 session key
     * @param {string} $code
     */
    public static function getSessionKey ($code) {
        $useQcProxy = Conf::getUseQcloudLogin();

        /**
         * 是否使用腾讯云代理登录
         * $useQcProxy 为 true，sdk 将会使用腾讯云的 QcloudSecretId 和 QcloudSecretKey 获取 session key
         * 反之将会使用小程序的 AppID 和 AppSecret 获取 session key
         */
        if ($useQcProxy) {
            $secretId = Conf::getQcloudSecretId();
            $secretKey = Conf::getQcloudSecretKey();
            return self::useQcloudProxyGetSessionKey($secretId, $secretKey, $code);
        } else {
            $appId = Conf::getAppId();
            $appSecret = Conf::getAppSecret();
            return self::getSessionKeyDirectly($appId, $appSecret, $code);
        }
    }

    /**
     * 直接请求微信获取 session key
     * @param {string} $secretId  腾讯云的 secretId
     * @param {string} $secretKey 腾讯云的 secretKey
     * @param {string} $code
     * @return {array} { $session_key, $openid }
     */
    private static function getSessionKeyDirectly ($appId, $appSecret, $code) {
        $requestParams = [
            'appid' => $appId,
            'secret' => $appSecret,
            'js_code' => $code,
            'grant_type' => 'authorization_code'
        ];

        list($status, $body) = array_values(Request::get([
            'url' => 'https://api.weixin.qq.com/sns/jscode2session?' . http_build_query($requestParams),
            'timeout' => Conf::getNetworkTimeout()
        ]));

        if ($status !== 200 || !$body || isset($body['errcode'])) {
            throw new Exception(Constants::E_PROXY_LOGIN_FAILED . ': ' . json_encode($body));
        }

        return $body;
    }

    /**
     * 通过腾讯云代理获取 session key
     * 这里是一个完整的腾讯云云 API 实现
     * @param {string} $secretId  腾讯云的 secretId
     * @param {string} $secretKey 腾讯云的 secretKey
     * @param {string} $code
     * @return {array} { $session_key, $openid }
     */
    private static function useQcloudProxyGetSessionKey ($secretId, $secretKey, $code) {
        if (!isset($secretId, $secretKey, $code)) {
            throw new Exception(Constants::E_PROXY_LOGIN_LOST_PRAMA);
        }

        $requestUrl = 'wss.api.qcloud.com/v2/index.php';
        $requestMethod = 'GET';
        $requestData = [
            'Action' => 'GetSessionKey',
            'js.code' => $code,
            'Timestamp' => time(),
            'Nonce' => mt_rand(),
            'SecretId' => $secretId,
            'SignatureMethod' => 'HmacSHA256'
        ];

        ksort($requestData);
        $requestString = http_build_query($requestData);
        $signatureRawString = $requestMethod . $requestUrl . '?' . $requestString;

        $requestData['Signature'] = base64_encode(hash_hmac('sha256', $signatureRawString, $secretKey, true));

        list($status, $body) = array_values(Request::get([
            'url' => 'https://' . $requestUrl . '?' . http_build_query($requestData),
            'timeout' => Conf::getNetworkTimeout()
        ]));

        if ($status !== 200 || !$body || $body['code'] !== 0) {
            throw new Exception(Constants::E_PROXY_LOGIN_REQUEST_FAILED);
        }

        if (isset($body['data']['errcode'])) {
            throw new Exception(Constants::E_PROXY_LOGIN_FAILED . ': ' . json_encode($body['data']));
        }

        return $body['data'];
    }
}
