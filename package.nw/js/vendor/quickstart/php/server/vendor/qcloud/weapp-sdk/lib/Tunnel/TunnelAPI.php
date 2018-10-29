<?php
namespace QCloud_WeApp_SDK\Tunnel;

use \Exception as Exception;

use \QCloud_WeApp_SDK\Conf as Conf;
use \QCloud_WeApp_SDK\Helper\Request as Request;
use \QCloud_WeApp_SDK\Helper\Logger as Logger;

class TunnelAPI {
    public static function requestConnect($receiveUrl) {
        $protocolType = 'wss';
        $param = compact('receiveUrl', 'protocolType');
        return self::sendRequest('/get/wsurl', $param, TRUE);
    }

    public static function emitMessage($tunnelIds, $messageType, $messageContent) {
        $packetType = 'message';
        $packetContent = json_encode(array(
            'type' => $messageType,
            'content' => $messageContent,
        ), JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);

        return self::emitPacket($tunnelIds, $packetType, $packetContent);
    }

    public static function emitPacket($tunnelIds, $packetType, $packetContent = NULL) {
        $param = array('tunnelIds' => $tunnelIds, 'type' => $packetType);
        if ($packetContent) {
            $param['content'] = $packetContent;
        }

        return self::sendRequest('/ws/push', array($param), FALSE);
    }

    private static function sendRequest($apiPath, $apiParam, $withTcKey = FALSE) {
        $url = Conf::getTunnelServerUrl() . $apiPath;
        $timeout = Conf::getNetworkTimeout();
        $data = self::packReqData($apiParam, $withTcKey);

        $begin = round(microtime(TRUE) * 1000);
        list($status, $body) = array_values(Request::jsonPost(compact('url', 'timeout', 'data')));
        $end = round(microtime(TRUE) * 1000);

        // 记录请求日志
        Logger::debug("POST {$url} => [{$status}]", array(
            '[请求]' => $data,
            '[响应]' => $body,
            '[耗时]' => sprintf('%sms', $end - $begin),
        ));

        if ($status !== 200) {
            throw new Exception('请求信道 API 失败，网络异常或信道服务器错误', -500);
        }

        if (!is_array($body)) {
            throw new Exception('信道服务器响应格式错误，无法解析 JSON 字符串', -400);
        }

        if ($body['code'] !== 0) {
            throw new TunnelAPIException("信道服务调用失败：{$body['code']} - {$body['message']}", $body['code']);
        }

        return $body;
    }

    private static function packReqData($data, $withTcKey = FALSE) {
        $data = json_encode($data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
        $tcId = md5(Conf::getServerHost());
        $result = compact('data', 'tcId');

        if ($withTcKey) {
            $result['tcKey'] = Conf::getTunnelSignatureKey();
        }

        $result['signature'] = Signature::compute($data);
        return $result;
    }
}
