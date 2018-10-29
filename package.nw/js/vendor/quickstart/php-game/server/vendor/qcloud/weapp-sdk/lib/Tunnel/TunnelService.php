<?php
namespace QCloud_WeApp_SDK\Tunnel;

use \Exception as Exception;

use \QCloud_WeApp_SDK\Conf as Conf;
use \QCloud_WeApp_SDK\Constants as Constants;
use \QCloud_WeApp_SDK\Helper\Util as Util;
use \QCloud_WeApp_SDK\Helper\Logger as Logger;

class TunnelService {
    public static function handle(ITunnelHandler $handler, array $options = array()) {
        $options = array_merge(array('checkLogin' => FALSE), $options);

        switch ($_SERVER['REQUEST_METHOD']) {
            case 'GET':
                self::handleGet($handler, $options);
                break;

            case 'POST':
                self::handlePost($handler, $options);
                break;

            default:
                break;
        }
    }

    /**
     * 广播消息到多个信道
     * @param  Array $tunnelIds       信道IDs
     * @param  String $messageType    消息类型
     * @param  String $messageContent 消息内容
     */
    public static function broadcast($tunnelIds, $messageType, $messageContent) {
        Logger::debug('TunnelService [broadcast] =>', compact('tunnelIds', 'messageType', 'messageContent'));

        try {
            return TunnelAPI::emitMessage($tunnelIds, $messageType, $messageContent);
        } catch (Exception $e) {
            return array('code' => $e->getCode(), 'message' => $e->getMessage());
        }
    }

    /**
     * 发送消息到指定信道
     * @param  String $tunnelId       信道ID
     * @param  String $messageType    消息类型
     * @param  String $messageContent 消息内容
     */
    public static function emit($tunnelId, $messageType, $messageContent) {
        Logger::debug('TunnelService [emit] =>', compact('tunnelId', 'messageType', 'messageContent'));

        try {
            return TunnelAPI::emitMessage(array($tunnelId), $messageType, $messageContent);
        } catch (Exception $e) {
            return array('code' => $e->getCode(), 'message' => $e->getMessage());
        }
    }

    /**
     * 关闭指定信道
     * @param  String $tunnelId 信道ID
     */
    public static function closeTunnel($tunnelId) {
        Logger::debug('TunnelService [closeTunnel] =>', compact('tunnelId'));

        try {
            return TunnelAPI::emitPacket(array($tunnelId), 'close');
        } catch (Exception $e) {
            return array('code' => $e->getCode(), 'message' => $e->getMessage());
        }
    }

    private static function handleGet(ITunnelHandler $handler, $options) {
        $tunnelId = '';

        try {
            $body = TunnelAPI::requestConnect(self::buildReceiveUrl());

            $data = $body['data'];
            $signature = $body['signature'];

            // 校验签名
            if (!Signature::check($data, $signature)) {
                throw new Exception('签名校验失败');
            }

            $data = json_decode($data, TRUE);
            $tunnelId = $data['tunnelId'];
        } catch (Exception $e) {
            throw new Exception(Constants::E_CONNECT_TO_TUNNEL_SERVER . ': ' . $e->getMessage());
        }

        Logger::debug('ITunnelHandler [onRequest] =>', compact('tunnelId'));
        $handler->onRequest($tunnelId, $data['connectUrl']);
    }

    private static function handlePost(ITunnelHandler $handler, $options) {
        // $packet => array('tunnelId' => '', 'type' => '', 'content'? => '');
        if (!($packet = self::parsePostPayloadData())) {
            return;
        }

        $tunnelId = $packet['tunnelId'];

        try {
            switch ($packet['type']) {
            case 'connect':
                Logger::debug('ITunnelHandler [onConnect] =>', compact('tunnelId'));
                $handler->onConnect($tunnelId);
                break;

            case 'message':
                list($type, $content) = self::decodePacketContent($packet);

                Logger::debug('ITunnelHandler [onMessage] =>', compact('tunnelId', 'type', 'content'));
                $handler->onMessage($tunnelId, $type, $content);
                break;

            case 'close':
                Logger::debug('ITunnelHandler [onClose] =>', compact('tunnelId'));
                $handler->onClose($tunnelId);
                break;
            }
        } catch (Exception $e) {}
    }

    /**
     * 构建提交给 WebSocket 信道服务器推送消息的地址
     *
     * 构建过程如下：
     *   1. 从信道服务器地址得到其通信协议（http/https），如 https
     *   2. 获取当前服务器主机名，如 109447.qcloud.la
     *   3. 获得当前 HTTP 请求的路径，如 /tunnel
     *   4. 拼接推送地址为 https://109447.qcloud.la/tunnel
     */
    private static function buildReceiveUrl() {
        $scheme = parse_url(Conf::getTunnelServerUrl(), PHP_URL_SCHEME);
        $hostname = Conf::getServerHost();
        $path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        return "{$scheme}://{$hostname}{$path}";
    }

    /**
     * 解析 Post Payload 数据
     */
    private static function parsePostPayloadData() {
        $contents = Util::getPostPayload();
        $body = json_decode($contents, TRUE);
        Logger::debug('TunnelService::handle [post payload] =>', $body ? $body : $contents);

        if (!is_array($body)) {
            Util::writeJsonResult(array(
                'code' => 9001,
                'message' => 'Bad request - request data is not json',
            ), 400);
            return FALSE;
        }

        if (!isset($body['data']) || !isset($body['signature'])) {
            Util::writeJsonResult(array(
                'code' => 9002,
                'message' => 'Bad request - invalid request data',
            ), 400);
            return FALSE;
        }

        // 校验签名
        if (!Signature::check($body['data'], $body['signature'])) {
            Util::writeJsonResult(array(
                'code' => 9003,
                'message' => 'Bad request - check signature failed',
            ), 400);
            return FALSE;
        }

        $data = json_decode($body['data'], TRUE);
        if (!is_array($data)) {
            Util::writeJsonResult(array(
                'code' => 9004,
                'message' => 'Bad request - parse data failed',
            ), 400);
            return FALSE;
        }

        Util::writeJsonResult(array('code' => 0, 'message' => 'ok'));
        return $data;
    }

    private static function decodePacketContent($packet)  {
        if (isset($packet['content'])) {
            $content = json_decode($packet['content'], TRUE);

            if (!is_array($content)) {
                $content = array();
            }
        } else {
            $packet['content'] = NULL;
            $content = array();
        }

        if (!isset($content['type'])) {
            $content['type'] = 'UnknownRaw';
        }

        if (!isset($content['content'])) {
            $content['content'] = $packet['content'];
        }

        return array($content['type'], $content['content']);;
    }
}
