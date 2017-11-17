<?php

use \QCloud_WeApp_SDK\Conf;
use \QCloud_WeApp_SDK\Helper\Util;
use \QCloud_WeApp_SDK\Auth\Constants;
use \QCloud_WeApp_SDK\Tunnel\TunnelService;

/**
 * @runTestsInSeparateProcesses
 */
class TunnelServiceTest extends PHPUnit_Framework_TestCase {
    private $mockedTunnelHandler;

    public static function setUpBeforeClass() {
        Conf::setup(array(
            'ServerHost' => SERVER_HOST,
            'AuthServerUrl' => AUTH_SERVER_URL,
            'TunnelServerUrl' => TUNNEL_SERVER_URL,
            'TunnelSignatureKey' => TUNNEL_SIGNATURE_KEY,
            'TunnelCheckSignature' => FALSE,
        ));
    }

    public function setUp() {
        $this->setOutputCallback(function () {});
        $this->mockedTunnelHandler = $this->getMock('\QCloud_WeApp_SDK\Tunnel\ITunnelHandler');
    }

    public function testHandleNeitherGetNorPostRequest() {
        $_SERVER['REQUEST_METHOD'] = 'PUT';

        TunnelService::handle($this->mockedTunnelHandler);

        $body = json_decode($this->getActualOutput(), TRUE);
        $this->assertSame(501, $body['code']);
    }

    public function testHandleGetWithNoCheckLogin() {
        $_SERVER['REQUEST_METHOD'] = 'GET';
        $_SERVER['REQUEST_URI'] = '/tunnel';

        $this->mockedTunnelHandler
            ->expects($this->once())
            ->method('onRequest')
            ->with($this->isType('string'), $this->isNull());

        TunnelService::handle($this->mockedTunnelHandler);

        $body = json_decode($this->getActualOutput(), TRUE);
        $this->assertInternalType('string', $body['url']);
    }

    public function testHandleGetWithCheckLogin() {
        $this->setHttpHeader(Constants::WX_HEADER_ID, 'valid-id');
        $this->setHttpHeader(Constants::WX_HEADER_SKEY, 'valid-skey');

        $_SERVER['REQUEST_METHOD'] = 'GET';
        $_SERVER['REQUEST_URI'] = '/tunnel';

        $this->mockedTunnelHandler
            ->expects($this->once())
            ->method('onRequest')
            ->with($this->isType('string'), $this->isType('array'));

        TunnelService::handle($this->mockedTunnelHandler, array(
            'checkLogin' => TRUE
        ));

        $body = json_decode($this->getActualOutput(), TRUE);
        $this->assertInternalType('string', $body['url']);
    }

    public function testHandleGetWithCheckLoginAndNoSessionInfo() {
        $_SERVER['REQUEST_METHOD'] = 'GET';
        $_SERVER['REQUEST_URI'] = '/tunnel';

        $this->mockedTunnelHandler
            ->expects($this->never())
            ->method('onRequest');

        TunnelService::handle($this->mockedTunnelHandler, array(
            'checkLogin' => TRUE
        ));

        $body = json_decode($this->getActualOutput(), TRUE);
        $this->assertSame(1, $body[Constants::WX_SESSION_MAGIC_ID]);
        $this->assertArrayHasKey('error', $body);
    }

    public function testHandleGetWithCheckLoginAndInvalidSessionInfo() {
        $this->setHttpHeader(Constants::WX_HEADER_ID, 'invalid-id');
        $this->setHttpHeader(Constants::WX_HEADER_SKEY, 'valid-skey');

        $_SERVER['REQUEST_METHOD'] = 'GET';
        $_SERVER['REQUEST_URI'] = '/tunnel';

        $this->mockedTunnelHandler
            ->expects($this->never())
            ->method('onRequest');

        TunnelService::handle($this->mockedTunnelHandler, array(
            'checkLogin' => TRUE
        ));

        $body = json_decode($this->getActualOutput(), TRUE);
        $this->assertSame(1, $body[Constants::WX_SESSION_MAGIC_ID]);
        $this->assertArrayHasKey('error', $body);
    }

    public function testHandleGetWhenTunnelServerRespondWithInvalidSignature() {
        Conf::setTunnelCheckSignature(TRUE);

        $_SERVER['REQUEST_METHOD'] = 'GET';
        $_SERVER['REQUEST_URI'] = '/tunnel';

        TunnelService::handle($this->mockedTunnelHandler);

        $body = json_decode($this->getActualOutput(), TRUE);
        $this->assertArrayHasKey('error', $body);
    }

    public function testHandlePostWithoutPayload() {
        $_SERVER['REQUEST_METHOD'] = 'POST';
        $_SERVER['REQUEST_URI'] = '/tunnel';

        TunnelService::handle($this->mockedTunnelHandler);

        $body = json_decode($this->getActualOutput(), TRUE);
        $this->assertSame(9001, $body['code']);
    }

    public function testHandlePostWithEmptyObject() {
        $_SERVER['REQUEST_METHOD'] = 'POST';
        $_SERVER['REQUEST_URI'] = '/tunnel';

        Util::setPostPayload('{}');
        TunnelService::handle($this->mockedTunnelHandler);

        $body = json_decode($this->getActualOutput(), TRUE);
        $this->assertSame(9002, $body['code']);
    }

    public function testHandlePostWithInvalidSignature() {
        Conf::setTunnelCheckSignature(TRUE);

        $_SERVER['REQUEST_METHOD'] = 'POST';
        $_SERVER['REQUEST_URI'] = '/tunnel';

        Util::setPostPayload(json_encode(array(
            'data' => '{}',
            'signature' => 'invalid-signature',
        )));

        TunnelService::handle($this->mockedTunnelHandler);

        $body = json_decode($this->getActualOutput(), TRUE);
        $this->assertSame(9003, $body['code']);
    }

    public function testHandlePostWithNonObjectData() {
        $_SERVER['REQUEST_METHOD'] = 'POST';
        $_SERVER['REQUEST_URI'] = '/tunnel';

        Util::setPostPayload(json_encode(array(
            'data' => 'this is an object',
            'signature' => 'valid-signature',
        )));

        TunnelService::handle($this->mockedTunnelHandler);

        $body = json_decode($this->getActualOutput(), TRUE);
        $this->assertSame(9004, $body['code']);
    }

    public function testHandlePostWithValidPayload() {
        $_SERVER['REQUEST_METHOD'] = 'POST';
        $_SERVER['REQUEST_URI'] = '/tunnel';

        Util::setPostPayload(json_encode(array(
            'data' => '{}',
            'signature' => 'valid-signature',
        )));

        TunnelService::handle($this->mockedTunnelHandler);

        $body = json_decode($this->getActualOutput(), TRUE);
        $this->assertSame(0, $body['code']);
    }

    public function testHandlePostShouldCallOnConnect() {
        $_SERVER['REQUEST_METHOD'] = 'POST';
        $_SERVER['REQUEST_URI'] = '/tunnel';

        Util::setPostPayload(json_encode(array(
            'data' => '{"tunnelId":"tunnel1","type":"connect"}',
            'signature' => 'valid-signature',
        )));

        $this->mockedTunnelHandler
            ->expects($this->once())
            ->method('onConnect')
            ->with($this->identicalTo('tunnel1'));

        TunnelService::handle($this->mockedTunnelHandler);

        $body = json_decode($this->getActualOutput(), TRUE);
        $this->assertSame(0, $body['code']);
    }

    public function testHandlePostShouldCallOnMessage() {
        $_SERVER['REQUEST_METHOD'] = 'POST';
        $_SERVER['REQUEST_URI'] = '/tunnel';

        Util::setPostPayload(json_encode(array(
            'data' => json_encode(array(
                'tunnelId' => 'tunnel1',
                'type' => 'message',
                'content' => json_encode(array(
                    'type' => 'hi',
                    'content' => 'hello, everyone.',
                )),
            )),
            'signature' => 'valid-signature',
        )));

        $this->mockedTunnelHandler
            ->expects($this->once())
            ->method('onMessage')
            ->with(
                $this->identicalTo('tunnel1'),
                $this->identicalTo('hi'),
                $this->identicalTo('hello, everyone.')
            );

        TunnelService::handle($this->mockedTunnelHandler);

        $body = json_decode($this->getActualOutput(), TRUE);
        $this->assertSame(0, $body['code']);
    }

    public function testHandlePostShouldCallOnMessageEvenWithoutContent() {
        $_SERVER['REQUEST_METHOD'] = 'POST';
        $_SERVER['REQUEST_URI'] = '/tunnel';

        Util::setPostPayload(json_encode(array(
            'data' => json_encode(array(
                'tunnelId' => 'tunnel1',
                'type' => 'message',
            )),
            'signature' => 'valid-signature',
        )));

        $this->mockedTunnelHandler
            ->expects($this->once())
            ->method('onMessage')
            ->with(
                $this->identicalTo('tunnel1'),
                $this->identicalTo('UnknownRaw'),
                $this->identicalTo(NULL)
            );

        TunnelService::handle($this->mockedTunnelHandler);

        $body = json_decode($this->getActualOutput(), TRUE);
        $this->assertSame(0, $body['code']);
    }

    public function testHandlePostShouldCallOnMessageEvenWithUnknownContent() {
        $_SERVER['REQUEST_METHOD'] = 'POST';
        $_SERVER['REQUEST_URI'] = '/tunnel';

        Util::setPostPayload(json_encode(array(
            'data' => json_encode(array(
                'tunnelId' => 'tunnel1',
                'type' => 'message',
                'content' => 'hi, there',
            )),
            'signature' => 'valid-signature',
        )));

        $this->mockedTunnelHandler
            ->expects($this->once())
            ->method('onMessage')
            ->with(
                $this->identicalTo('tunnel1'),
                $this->identicalTo('UnknownRaw'),
                $this->identicalTo('hi, there')
            );

        TunnelService::handle($this->mockedTunnelHandler);

        $body = json_decode($this->getActualOutput(), TRUE);
        $this->assertSame(0, $body['code']);
    }

    public function testHandlePostShouldCallOnClose() {
        $_SERVER['REQUEST_METHOD'] = 'POST';
        $_SERVER['REQUEST_URI'] = '/tunnel';

        Util::setPostPayload(json_encode(array(
            'data' => '{"tunnelId":"tunnel1","type":"close"}',
            'signature' => 'valid-signature',
        )));

        $this->mockedTunnelHandler
            ->expects($this->once())
            ->method('onClose')
            ->with($this->identicalTo('tunnel1'));

        TunnelService::handle($this->mockedTunnelHandler);

        $body = json_decode($this->getActualOutput(), TRUE);
        $this->assertSame(0, $body['code']);
    }

    public function testBroadcastUseCase() {
        $tunnelIds = array('tunnel1', 'tunnel2');
        $messageType = 'hi';
        $messageContent = 'hello, everybody!';

        $result = TunnelService::broadcast($tunnelIds, $messageType, $messageContent);

        $this->assertSame(0, $result['code']);
    }

    public function testBroadcastExpect500() {
        $tunnelIds = array('expect-500', 'tunnel2');
        $messageType = 'hi';
        $messageContent = 'hello, everybody!';

        $result = TunnelService::broadcast($tunnelIds, $messageType, $messageContent);

        $this->assertNotEquals(0, $result['code']);
    }

    public function testBroadcastExpectInvalidJson() {
        $tunnelIds = array('expect-invalid-json', 'tunnel2');
        $messageType = 'hi';
        $messageContent = 'hello, everybody!';

        $result = TunnelService::broadcast($tunnelIds, $messageType, $messageContent);

        $this->assertNotEquals(0, $result['code']);
    }

    public function testBroadcastExpectFailedResult() {
        $tunnelIds = array('expect-failed-result', 'tunnel2');
        $messageType = 'hi';
        $messageContent = 'hello, everybody!';

        $result = TunnelService::broadcast($tunnelIds, $messageType, $messageContent);

        $this->assertNotEquals(0, $result['code']);
    }

    public function testEmitUseCase() {
        $tunnelId = 'tunnel1';
        $messageType = 'hi';
        $messageContent = 'hello, how are you!';

        $result = TunnelService::emit($tunnelId, $messageType, $messageContent);

        $this->assertSame(0, $result['code']);
    }

    public function testEmitExpect500() {
        $tunnelId = 'expect-500';
        $messageType = 'hi';
        $messageContent = 'hello, how are you!';

        $result = TunnelService::emit($tunnelId, $messageType, $messageContent);

        $this->assertNotEquals(0, $result['code']);
    }

    public function testEmitExpectInvalidJson() {
        $tunnelId = 'expect-invalid-json';
        $messageType = 'hi';
        $messageContent = 'hello, how are you!';

        $result = TunnelService::emit($tunnelId, $messageType, $messageContent);
        var_export($result);

        $this->assertNotEquals(0, $result['code']);
    }

    public function testEmitExpectFailedResult() {
        $tunnelId = 'expect-failed-result';
        $messageType = 'hi';
        $messageContent = 'hello, how are you!';

        $result = TunnelService::emit($tunnelId, $messageType, $messageContent);

        $this->assertNotEquals(0, $result['code']);
    }

    public function testCloseTunnelUseCase() {
        $tunnelId = 'tunnel1';
        $result = TunnelService::closeTunnel($tunnelId);
        $this->assertSame(0, $result['code']);
    }

    public function testCloseTunnelExpect500() {
        $tunnelId = 'expect-500';
        $result = TunnelService::closeTunnel($tunnelId);
        $this->assertNotEquals(0, $result['code']);
    }

    public function testCloseTunnelExpectInvalidJson() {
        $tunnelId = 'expect-invalid-json';
        $result = TunnelService::closeTunnel($tunnelId);
        $this->assertNotEquals(0, $result['code']);
    }

    public function testCloseTunnelExpectFailedResult() {
        $tunnelId = 'expect-failed-result';
        $result = TunnelService::closeTunnel($tunnelId);
        $this->assertNotEquals(0, $result['code']);
    }

    private function setHttpHeader($headerKey, $headerVal) {
        $headerKey = strtoupper($headerKey);
        $headerKey = str_replace('-', '_', $headerKey);
        $headerKey = 'HTTP_' . $headerKey;
        $_SERVER[$headerKey] = $headerVal;
    }
}
