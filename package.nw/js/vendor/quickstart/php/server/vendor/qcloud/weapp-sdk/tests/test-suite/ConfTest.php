<?php

use \QCloud_WeApp_SDK\Conf;

/**
 * @runTestsInSeparateProcesses
 */
class ConfTest extends PHPUnit_Framework_TestCase {
    public function setUp() {
        Conf::setup(array(
            'ServerHost' => '',
            'AuthServerUrl' => '',
            'TunnelServerUrl' => '',
            'TunnelSignatureKey' => '',
            'NetworkTimeout' => (int)NETWORK_TIMEOUT,
        ));
    }

    public function testSetupUseCase() {
        Conf::setup(array(
            'ServerHost' => SERVER_HOST,
            'LogPath' => '(empty)',
        ));

        $this->assertSame(SERVER_HOST, Conf::getServerHost());
        $this->assertSame('(empty)', Conf::getLogPath());
    }

    public function testSetupWithNonArrayValue() {
        Conf::setup('not an array');
    }

    public function testGetConfig() {
        $result = Conf::getNetworkTimeout();
        $this->assertSame((int)NETWORK_TIMEOUT, $result);
    }

    /**
     * @expectedException Exception
     */
    public function testGetNothing() {
        Conf::getServerHost();
    }

    /**
     * @expectedException Exception
     */
    public function testGetNotExistMethod() {
        Conf::getNotExistMethod();
    }

    public function testSetConfig() {
        Conf::setTunnelServerUrl(TUNNEL_SERVER_URL);
        $this->assertSame(TUNNEL_SERVER_URL, Conf::getTunnelServerUrl());
    }

    /**
     * @expectedException Exception
     */
    public function testSetWrongType() {
        Conf::setTunnelSignatureKey(array('signature key should be string value'));
    }

    /**
     * @expectedException Exception
     */
    public function testSetNotExistMethod() {
        Conf::setNotExistMethod();
    }

    /**
     * @expectedException Exception
     */
    public function testCallNonExistsMethod() {
        Conf::callNotExistsMethod();
    }
}
