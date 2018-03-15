<?php

namespace Qcloud\Cos;

use Guzzle\Http\Message\RequestInterface;

class Signature {
    private $accessKey;           // string: access key.
    private $secretKey;           // string: secret key.

    public function __construct($accessKey, $secretKey) {
        $this->accessKey = $accessKey;
        $this->secretKey = $secretKey;
    }

    public function __destruct() {
    }

    public function signRequest(RequestInterface $request) {
        $signTime = (string)(time() - 60) . ';' . (string)(time() + 3600);
        $httpString = strtolower($request->getMethod()) . "\n" . urldecode($request->getPath()) .
            "\n\nhost=" . $request->getHost() . "\n";
        $sha1edHttpString = sha1($httpString);
        $stringToSign = "sha1\n$signTime\n$sha1edHttpString\n";
        $signKey = hash_hmac('sha1', $signTime, $this->secretKey);
        $signature = hash_hmac('sha1', $stringToSign, $signKey);
        $authorization = 'q-sign-algorithm=sha1&q-ak='. $this->accessKey .
            "&q-sign-time=$signTime&q-key-time=$signTime&q-header-list=host&q-url-param-list=&" .
            "q-signature=$signature";

        $request->setHeader('Authorization', $authorization);
    }

    public function createPresignedUrl(
        RequestInterface $request,
        $expires = ""
    ) {
        $signTime = (string)(time() - 60) . ';' . (string)(time() + 3600);
        $httpString = strtolower($request->getMethod()) . "\n" . urldecode($request->getPath()) .
            "\n\nhost=" . $request->getHost() . "\n";
        $sha1edHttpString = sha1($httpString);
        $stringToSign = "sha1\n$signTime\n$sha1edHttpString\n";
        $signKey = hash_hmac('sha1', $signTime, $this->secretKey);
        $signature = hash_hmac('sha1', $stringToSign, $signKey);
        $authorization = 'q-sign-algorithm=sha1&q-ak='. $this->accessKey .
            "&q-sign-time=$signTime&q-key-time=$signTime&q-header-list=host&q-url-param-list=&" .
            "q-signature=$signature";
        return $request->getUrl()."?"."sign=".urlencode($authorization);
    }
}
