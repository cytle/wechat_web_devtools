//index.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({
    data: {
        requestResult: '',
        canIUseClipboard: wx.canIUse('setClipboardData')
    },

    testCgi: function () {
        util.showBusy('请求中...')
        var that = this
        qcloud.request({
            url: `${config.service.host}/weapp/demo`,
            login: false,
            success (result) {
                util.showSuccess('请求成功完成')
                that.setData({
                    requestResult: JSON.stringify(result.data)
                })
            },
            fail (error) {
                util.showModel('请求失败', error);
                console.log('request fail', error);
            }
        })
    },

    copyCode: function (e) {
        var codeId = e.target.dataset.codeId
        wx.setClipboardData({
            data: code[codeId - 1],
            success: function () {
                util.showSuccess('复制成功')
            }
        })
    }
})

var code = [
`<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Demo extends CI_Controller {
    public function index() {
        $this->json([
            'code' => 0,
            'data' => [
                'msg' => 'Hello World'
            ]
        ]);
    }
}`
]
