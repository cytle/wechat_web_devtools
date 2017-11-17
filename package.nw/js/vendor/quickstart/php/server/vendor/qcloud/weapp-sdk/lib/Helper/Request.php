<?php
namespace QCloud_WeApp_SDK\Helper;

class Request {
    /**
     * @codeCoverageIgnore
     */
    public static function get($options) {
        $options['method'] = 'GET';
        return self::send($options);
    }

    public static function jsonPost($options) {
        if (isset($options['data'])) {
            $options['data'] = json_encode($options['data']);
        }

        $options = array_merge_recursive($options, array(
            'method' => 'POST',
            'headers' => array('Content-Type: application/json; charset=utf-8'),
        ));

        return self::send($options);
    }

    public static function send($options) {
        $ch = curl_init();

        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $options['method']);
        curl_setopt($ch, CURLOPT_URL, $options['url']);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);

        if (isset($options['headers'])) {
            curl_setopt($ch, CURLOPT_HTTPHEADER, $options['headers']);
        }

        if (isset($options['timeout'])) {
            curl_setopt($ch, CURLOPT_TIMEOUT_MS, $options['timeout']);
        }

        if (isset($options['data'])) {
            curl_setopt($ch, CURLOPT_POSTFIELDS, $options['data']);
        }

        $result = curl_exec($ch);
        $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);

        $body = json_decode($result, TRUE);
        if ($body === NULL) {
            $body = $result;
        }

        curl_close($ch);
        return compact('status', 'body');
    }
}
