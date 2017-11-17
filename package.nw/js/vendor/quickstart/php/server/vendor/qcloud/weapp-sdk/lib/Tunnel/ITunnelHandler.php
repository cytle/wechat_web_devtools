<?php
namespace QCloud_WeApp_SDK\Tunnel;

interface ITunnelHandler {
    public function __construct($userinfo);
    public function onRequest($tunnelId, $tunnelUrl);
    public function onConnect($tunnelId);
    public function onMessage($tunnelId, $type, $content);
    public function onClose($tunnelId);
}
