<?php
namespace QCloud_WeApp_SDK\Helper;

class Util {
    private static $postPayload = NULL;

    public static function getHttpHeader($headerKey) {
        $headerKey = strtoupper($headerKey);
        $headerKey = str_replace('-', '_', $headerKey);
        $headerKey = 'HTTP_' . $headerKey;
        return isset($_SERVER[$headerKey]) ? $_SERVER[$headerKey] : '';
    }

    public static function writeJsonResult($obj, $statusCode = 200) {
        header('Content-type: application/json; charset=utf-8');

        http_response_code($statusCode);
        echo json_encode($obj, JSON_FORCE_OBJECT | JSON_UNESCAPED_UNICODE);

        Logger::debug("Util::writeJsonResult => [{$statusCode}]", $obj);
    }

    public static function getPostPayload() {
        if (is_string(self::$postPayload)) {
            return self::$postPayload;
        }

        return file_get_contents('php://input');
    }

    public static function setPostPayload($payload) {
        self::$postPayload = $payload;
    }
}
