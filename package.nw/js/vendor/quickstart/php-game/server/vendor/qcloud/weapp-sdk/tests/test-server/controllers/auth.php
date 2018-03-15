<?php
defined('FW') OR exit('No direct script access allowed');

class AuthController {
    public function handle() {
        global $_BODY;

        if (!is_array($_BODY)) {
            return send('Bad Request - 无法解析的 JSON 包', 400);
        }

        $interfaceName = @$_BODY['interface']['interfaceName'];
        $code = @$_BODY['interface']['para']['code'];
        $encrypt_data = @$_BODY['interface']['para']['encrypt_data'];
        $iv = @$_BODY['interface']['para']['iv'];
        $id = @$_BODY['interface']['para']['id'];
        $skey = @$_BODY['interface']['para']['skey'];

        switch ($interfaceName) {
        case 'qcloud.cam.id_skey':
            $this->handleLoginRequest($code, $encrypt_data, $iv);
            break;

        case 'qcloud.cam.auth':
            $this->handleCheckRequest($id, $skey);
            break;

        default:
            send("Bad Request - unknown interfaceName({$interfaceName})", 400);
            break;
        }
    }

    private function handleLoginRequest($code, $encryptedData, $iv) {
        $this->respond4CommonErrors($code);

        if ($code === 'valid-code' && $encryptedData === 'valid-data' && $iv === 'valid-iv') {
            return send(array(
                'returnCode' => 0,
                'returnMessage' => 'OK',
                'returnData' => array(
                    'id' => 'success_id',
                    'skey' => 'success_skey',
                    'user_info' => array(
                        'nickName' => 'fake_user',
                        'gender' => 0,
                    ),
                ),
            ));
        }

        send(array(
            'returnCode' => -1,
            'returnMessage' => 'invalid code, encryptedData or iv',
        ));
    }

    private function handleCheckRequest($id, $skey) {
        $this->respond4CommonErrors($id);

        if ($id === 'valid-id' && $skey === 'valid-skey') {
            return send(array(
                'returnCode' => 0,
                'returnMessage' => 'OK',
                'returnData' => array(
                    'user_info' => array(
                        'nickName' => 'fake_user',
                        'gender' => 0,
                    ),
                ),
            ));
        }

        if ($id === 'expect-60011') {
            return send(array(
                'returnCode' => 60011,
                'returnMessage' => 'ERR_60011',
            ));
        }

        if ($id === 'expect-60012') {
            return send(array(
                'returnCode' => 60012,
                'returnMessage' => 'ERR_60012',
            ));
        }

        send(array(
            'returnCode' => -1,
            'returnMessage' => 'invalid id or skey',
        ));
    }

    private function respond4CommonErrors($indicator) {
        switch ($indicator) {
        case 'expect-500':
            return send('Fake Server Error', 500);

        case 'expect-invalid-json':
            return send('{invalidJson}');

        case 'expect-timeout':
            usleep(100 * 1000);
            return send('Timedout');

        default:
            return FALSE;
        }
    }
}

$ctrl = new AuthController;
$ctrl->handle();
