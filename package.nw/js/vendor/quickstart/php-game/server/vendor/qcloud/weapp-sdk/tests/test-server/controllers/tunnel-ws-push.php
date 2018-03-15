<?php
defined('FW') OR exit('No direct script access allowed');

if (!is_array($_BODY)) {
    return send('Bad Request - 无法解析的 JSON 包', 400);
}

$data = json_decode(@$_BODY['data'], TRUE);
$echo = @$data[0]['tunnelIds'][0];

switch ($echo) {
case 'expect-500':
    return send('Fake Server Error', 500);

case 'expect-invalid-json':
    return send('{invalidJson}');

case 'expect-failed-result':
    return send(array(
        'code' => -1,
        'message' => 'something wrong happened',
        'data' => array(),
    ));

default:
    return send(array(
        'code' => 0,
        'message' => 'OK',
        'data' => array(),
    ));
}
