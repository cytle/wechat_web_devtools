<?php

if (php_sapi_name() !== 'cli-server') {
    exit('Script access only allowed in `cli-server` mode');
}

define('FW', TRUE);

require('./helper.php');

// log debug info?
$_LOG_DEBUG = TRUE;

// parse `application/json` payload
$_BODY = json_decode(file_get_contents('php://input'), TRUE);

switch ("{$_SERVER['REQUEST_METHOD']} {$_SERVER['PATH_INFO']}") {
case 'GET /':
    send('Welcome to SDK Test Server/1.0');
    break;

case 'POST /auth':
    require('./controllers/auth.php');
    break;

case 'POST /tunnel/get/wsurl':
    require('./controllers/tunnel-get-wsurl.php');
    break;

case 'POST /tunnel/ws/push':
    require('./controllers/tunnel-ws-push.php');
    break;

default:
    send(array(
        'code' => 501,
        'message' => 'Not Implemented',
    ), 501);
    break;
}
