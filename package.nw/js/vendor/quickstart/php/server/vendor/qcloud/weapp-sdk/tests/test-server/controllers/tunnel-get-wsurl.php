<?php
defined('FW') OR exit('No direct script access allowed');

send(array(
    'code' => 0,
    'message' => 'OK',
    'data' => json_encode(array(
        'tunnelId' => 'tunnel1',
        'connectUrl' => 'wss://ws.qcloud.com/ws/tunnel1',
    ), JSON_UNESCAPED_UNICODE),
    'signature' => 'fake_signature',
));
