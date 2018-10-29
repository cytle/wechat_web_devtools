<?php

use \QCloud_WeApp_SDK\Conf;
use \QCloud_WeApp_SDK\Auth\LoginService;
use \QCloud_WeApp_SDK\Auth\Constants;

/**
 * @runTestsInSeparateProcesses
 */
class LoginServiceTest extends PHPUnit_Framework_TestCase {
    public static function setUpBeforeClass() {
        Conf::setup(array(
            'ServerHost' => SERVER_HOST,
            'AuthServerUrl' => AUTH_SERVER_URL,
            'TunnelServerUrl' => TUNNEL_SERVER_URL,
            'TunnelSignatureKey' => TUNNEL_SIGNATURE_KEY,
        ));
    }

    public function setUp() {
        $this->setOutputCallback(function () {});
    }

    public function testLoginUseCase() {
        $this->setHttpHeader(Constants::WX_HEADER_CODE, 'valid-code');
        $this->setHttpHeader(Constants::WX_HEADER_ENCRYPTED_DATA, 'valid-data');
        $this->setHttpHeader(Constants::WX_HEADER_IV, 'valid-iv');

        $result = LoginService::login();
        $this->assertSame(0, $result['code']);
        $this->assertArrayHasKey('userInfo', $result['data']);

        $body = json_decode($this->getActualOutput(), TRUE);
        $this->assertSame(1, $body[Constants::WX_SESSION_MAGIC_ID]);
        $this->assertArrayHasKey('session', $body);
        $this->assertArrayHasKey('id', $body['session']);
        $this->assertArrayHasKey('skey', $body['session']);
    }

    public function testLoginWithoutCodeAndEncryptData() {
        $result = LoginService::login();
        $this->assertInternalType('int', $result['code']);
        $this->assertNotEquals(0, $result['code']);

        $body = json_decode($this->getActualOutput(), TRUE);
        $this->assertSame(1, $body[Constants::WX_SESSION_MAGIC_ID]);
        $this->assertArrayHasKey('error', $body);
    }

    public function testLoginWithInvalidCode() {
        $this->setHttpHeader(Constants::WX_HEADER_CODE, 'invalid-code');
        $this->setHttpHeader(Constants::WX_HEADER_ENCRYPTED_DATA, 'valid-data');
        $this->setHttpHeader(Constants::WX_HEADER_IV, 'valid-iv');

        $result = LoginService::login();
        $this->assertInternalType('int', $result['code']);
        $this->assertNotEquals(0, $result['code']);

        $body = json_decode($this->getActualOutput(), TRUE);
        $this->assertSame(1, $body[Constants::WX_SESSION_MAGIC_ID]);
        $this->assertArrayHasKey('error', $body);
    }

    public function testLoginWithInvalidEncryptData() {
        $this->setHttpHeader(Constants::WX_HEADER_CODE, 'valid-code');
        $this->setHttpHeader(Constants::WX_HEADER_ENCRYPTED_DATA, 'invalid-data');
        $this->setHttpHeader(Constants::WX_HEADER_IV, 'valid-iv');

        $result = LoginService::login();
        $this->assertInternalType('int', $result['code']);
        $this->assertNotEquals(0, $result['code']);

        $body = json_decode($this->getActualOutput(), TRUE);
        $this->assertSame(1, $body[Constants::WX_SESSION_MAGIC_ID]);
        $this->assertArrayHasKey('error', $body);
    }

    public function testLoginWithInvalidIV() {
        $this->setHttpHeader(Constants::WX_HEADER_CODE, 'valid-code');
        $this->setHttpHeader(Constants::WX_HEADER_ENCRYPTED_DATA, 'valid-data');
        $this->setHttpHeader(Constants::WX_HEADER_IV, 'invalid-iv');

        $result = LoginService::login();
        $this->assertInternalType('int', $result['code']);
        $this->assertNotEquals(0, $result['code']);

        $body = json_decode($this->getActualOutput(), TRUE);
        $this->assertSame(1, $body[Constants::WX_SESSION_MAGIC_ID]);
        $this->assertArrayHasKey('error', $body);
    }

    public function testLoginWhenAuthServerRespondWithInvalidData() {
        $this->setHttpHeader(Constants::WX_HEADER_CODE, 'expect-invalid-json');
        $this->setHttpHeader(Constants::WX_HEADER_ENCRYPTED_DATA, 'valid-data');
        $this->setHttpHeader(Constants::WX_HEADER_IV, 'valid-iv');

        $result = LoginService::login();
        $this->assertInternalType('int', $result['code']);
        $this->assertNotEquals(0, $result['code']);

        $body = json_decode($this->getActualOutput(), TRUE);
        $this->assertSame(1, $body[Constants::WX_SESSION_MAGIC_ID]);
        $this->assertArrayHasKey('error', $body);
    }

    public function testLoginWhenAuthServerRespondWith500() {
        $this->setHttpHeader(Constants::WX_HEADER_CODE, 'expect-500');
        $this->setHttpHeader(Constants::WX_HEADER_ENCRYPTED_DATA, 'valid-data');
        $this->setHttpHeader(Constants::WX_HEADER_IV, 'valid-iv');

        $result = LoginService::login();
        $this->assertInternalType('int', $result['code']);
        $this->assertNotEquals(0, $result['code']);

        $body = json_decode($this->getActualOutput(), TRUE);
        $this->assertSame(1, $body[Constants::WX_SESSION_MAGIC_ID]);
        $this->assertArrayHasKey('error', $body);
    }

    public function testLoginWhenAuthServerTimedout() {
        Conf::setNetworkTimeout(10);
        $this->setHttpHeader(Constants::WX_HEADER_CODE, 'expect-timeout');
        $this->setHttpHeader(Constants::WX_HEADER_ENCRYPTED_DATA, 'valid-data');
        $this->setHttpHeader(Constants::WX_HEADER_IV, 'valid-iv');

        $result = LoginService::login();
        $this->assertInternalType('int', $result['code']);
        $this->assertNotEquals(0, $result['code']);

        $body = json_decode($this->getActualOutput(), TRUE);
        $this->assertSame(1, $body[Constants::WX_SESSION_MAGIC_ID]);
        $this->assertArrayHasKey('error', $body);
    }

    public function testCheckUseCase() {
        $this->setHttpHeader(Constants::WX_HEADER_ID, 'valid-id');
        $this->setHttpHeader(Constants::WX_HEADER_SKEY, 'valid-skey');

        $result = LoginService::check();
        $this->assertSame(0, $result['code']);
        $this->assertArrayHasKey('userInfo', $result['data']);

        $this->expectOutputString('');
    }

    public function testCheckWithoutIdAndSkey() {
        $result = LoginService::check();
        $this->assertInternalType('int', $result['code']);
        $this->assertNotEquals(0, $result['code']);

        $body = json_decode($this->getActualOutput(), TRUE);
        $this->assertSame(1, $body[Constants::WX_SESSION_MAGIC_ID]);
        $this->assertArrayHasKey('error', $body);
    }

    public function testCheckWithInvalidId() {
        $this->setHttpHeader(Constants::WX_HEADER_ID, 'invalid-id');
        $this->setHttpHeader(Constants::WX_HEADER_SKEY, 'valid-skey');

        $result = LoginService::check();
        $this->assertInternalType('int', $result['code']);
        $this->assertNotEquals(0, $result['code']);

        $body = json_decode($this->getActualOutput(), TRUE);
        $this->assertSame(1, $body[Constants::WX_SESSION_MAGIC_ID]);
        $this->assertArrayHasKey('error', $body);
    }

    public function testCheckWithInvalidSkey() {
        $this->setHttpHeader(Constants::WX_HEADER_ID, 'valid-id');
        $this->setHttpHeader(Constants::WX_HEADER_SKEY, 'invalid-skey');

        $result = LoginService::check();
        $this->assertInternalType('int', $result['code']);
        $this->assertNotEquals(0, $result['code']);

        $body = json_decode($this->getActualOutput(), TRUE);
        $this->assertSame(1, $body[Constants::WX_SESSION_MAGIC_ID]);
        $this->assertArrayHasKey('error', $body);
    }

    public function testCheckWhenAuthServerRespondWithInvalidData() {
        $this->setHttpHeader(Constants::WX_HEADER_ID, 'expect-invalid-json');
        $this->setHttpHeader(Constants::WX_HEADER_SKEY, 'valid-skey');

        $result = LoginService::check();
        $this->assertInternalType('int', $result['code']);
        $this->assertNotEquals(0, $result['code']);

        $body = json_decode($this->getActualOutput(), TRUE);
        $this->assertSame(1, $body[Constants::WX_SESSION_MAGIC_ID]);
        $this->assertArrayHasKey('error', $body);
    }

    public function testCheckWhenAuthServerRespondWith500() {
        $this->setHttpHeader(Constants::WX_HEADER_ID, 'expect-500');
        $this->setHttpHeader(Constants::WX_HEADER_SKEY, 'valid-skey');

        $result = LoginService::check();
        $this->assertInternalType('int', $result['code']);
        $this->assertNotEquals(0, $result['code']);

        $body = json_decode($this->getActualOutput(), TRUE);
        $this->assertSame(1, $body[Constants::WX_SESSION_MAGIC_ID]);
        $this->assertArrayHasKey('error', $body);
    }

    public function testCheckWhenAuthServerTimedout() {
        Conf::setNetworkTimeout(10);
        $this->setHttpHeader(Constants::WX_HEADER_ID, 'expect-timeout');
        $this->setHttpHeader(Constants::WX_HEADER_SKEY, 'valid-skey');

        $result = LoginService::check();
        $this->assertInternalType('int', $result['code']);
        $this->assertNotEquals(0, $result['code']);

        $body = json_decode($this->getActualOutput(), TRUE);
        $this->assertSame(1, $body[Constants::WX_SESSION_MAGIC_ID]);
        $this->assertArrayHasKey('error', $body);
    }

    public function testCheckWhenAuthServerRespondWith60011ErrorCode() {
        $this->setHttpHeader(Constants::WX_HEADER_ID, 'expect-60011');
        $this->setHttpHeader(Constants::WX_HEADER_SKEY, 'valid-skey');

        $result = LoginService::check();
        $this->assertInternalType('int', $result['code']);
        $this->assertNotEquals(0, $result['code']);

        $body = json_decode($this->getActualOutput(), TRUE);
        $this->assertSame(1, $body[Constants::WX_SESSION_MAGIC_ID]);
        $this->assertArrayHasKey('error', $body);
    }

    public function testCheckWhenAuthServerRespondWith60012ErrorCode() {
        $this->setHttpHeader(Constants::WX_HEADER_ID, 'expect-60012');
        $this->setHttpHeader(Constants::WX_HEADER_SKEY, 'valid-skey');

        $result = LoginService::check();
        $this->assertInternalType('int', $result['code']);
        $this->assertNotEquals(0, $result['code']);

        $body = json_decode($this->getActualOutput(), TRUE);
        $this->assertSame(1, $body[Constants::WX_SESSION_MAGIC_ID]);
        $this->assertArrayHasKey('error', $body);
    }

    private function setHttpHeader($headerKey, $headerVal) {
        $headerKey = strtoupper($headerKey);
        $headerKey = str_replace('-', '_', $headerKey);
        $headerKey = 'HTTP_' . $headerKey;
        $_SERVER[$headerKey] = $headerVal;
    }
}
