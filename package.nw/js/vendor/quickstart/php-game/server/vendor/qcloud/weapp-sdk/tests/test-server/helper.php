<?php
defined('FW') OR exit('No direct script access allowed');

$begin = round(microtime(TRUE) * 1000);

function debug() {
    global $_LOG_DEBUG;
    if (!$_LOG_DEBUG) {
        return;
    }

    $messages = func_get_args();

    for ($i = 0, $size = func_num_args(); $i < $size; $i += 1) {
        $message = $messages[$i];

        if (is_array($message)) {
            $message = json_encode($message, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
        }

        if (is_string($message) || is_numeric($message)) {
            $result[] = $message;
        }
    }

    file_put_contents('php://stdout', implode(' ', $result) . PHP_EOL);
}

function send($input, $statusCode = 200) {
    global $_BODY;
    http_response_code($statusCode);

    if (is_array($input)) {
        header('Content-type: application/json; charset=UTF-8');
        $result = json_encode($input, JSON_UNESCAPED_UNICODE);
    } else {
        header('Content-type: text/html; charset=UTF-8');
        $result = $input;
    }

    global $begin;
    $end = round(microtime(TRUE) * 1000);

    debug('----------------------------------------');
    debug("{$_SERVER['REQUEST_METHOD']} {$_SERVER['PATH_INFO']} => [{$statusCode}]", array(
        '[body]' => $_BODY,
        '[result]' => $input,
        '[timecost]' => sprintf('%sms', $end - $begin),
    ));
    debug('----------------------------------------' . PHP_EOL);

    echo $result;
    die;
}
