window.API.JSAPI = {
  "interfaces": [
    {
      "type": "object",
      "name": "wx",
      "members": [
        {
          "type": "function",
          "name": "addCard",
          "parameters": [
            {
              "type": "object",
              "name": "object",
              "members": [
                {
                  "name": "cardList",
                  "type": "object[]",
                  "must": true,
                  "desc": "需要添加的卡券列表，列表内对象说明请参见[请求对象说明](#请求对象说明)"
                },
                {
                  "name": "success",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用成功的回调函数",
                  "parameters": [
                    {
                      "type": "object",
                      "name": "result",
                      "members": [
                        {
                          "name": "cardList",
                          "type": "object[]",
                          "desc": "卡券添加结果列表，列表内对象说明请详见[返回对象说明](#返回对象说明)"
                        }
                      ]
                    }
                  ]
                },
                {
                  "name": "fail",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用失败的回调函数",
                  "parameters": []
                },
                {
                  "name": "complete",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用结束的回调函数（调用成功、失败都会执行）",
                  "parameters": []
                }
              ]
            }
          ],
          "desc": "批量添加卡券。"
        },
        {
          "type": "function",
          "name": "addPhoneContact",
          "parameters": [
            {
              "type": "object",
              "name": "object",
              "members": [
                {
                  "name": "photoFilePath",
                  "type": "string",
                  "must": false,
                  "desc": "头像本地文件路径"
                },
                {
                  "name": "nickName",
                  "type": "string",
                  "must": false,
                  "desc": "昵称"
                },
                {
                  "name": "lastName",
                  "type": "string",
                  "must": false,
                  "desc": "姓氏"
                },
                {
                  "name": "middleName",
                  "type": "string",
                  "must": false,
                  "desc": "中间名"
                },
                {
                  "name": "firstName",
                  "type": "string",
                  "must": true,
                  "desc": "名字"
                },
                {
                  "name": "remark",
                  "type": "string",
                  "must": false,
                  "desc": "备注"
                },
                {
                  "name": "mobilePhoneNumber",
                  "type": "string",
                  "must": false,
                  "desc": "手机号"
                },
                {
                  "name": "weChatNumber",
                  "type": "string",
                  "must": false,
                  "desc": "微信号"
                },
                {
                  "name": "addressCountry",
                  "type": "string",
                  "must": false,
                  "desc": "联系地址国家"
                },
                {
                  "name": "addressState",
                  "type": "string",
                  "must": false,
                  "desc": "联系地址省份"
                },
                {
                  "name": "addressCity",
                  "type": "string",
                  "must": false,
                  "desc": "联系地址城市"
                },
                {
                  "name": "addressStreet",
                  "type": "string",
                  "must": false,
                  "desc": "联系地址街道"
                },
                {
                  "name": "addressPostalCode",
                  "type": "string",
                  "must": false,
                  "desc": "联系地址邮政编码"
                },
                {
                  "name": "organization",
                  "type": "string",
                  "must": false,
                  "desc": "公司"
                },
                {
                  "name": "title",
                  "type": "string",
                  "must": false,
                  "desc": "职位"
                },
                {
                  "name": "workFaxNumber",
                  "type": "string",
                  "must": false,
                  "desc": "工作传真"
                },
                {
                  "name": "workPhoneNumber",
                  "type": "string",
                  "must": false,
                  "desc": "工作电话"
                },
                {
                  "name": "hostNumber",
                  "type": "string",
                  "must": false,
                  "desc": "公司电话"
                },
                {
                  "name": "email",
                  "type": "string",
                  "must": false,
                  "desc": "电子邮件"
                },
                {
                  "name": "url",
                  "type": "string",
                  "must": false,
                  "desc": "网站"
                },
                {
                  "name": "workAddressCountry",
                  "type": "string",
                  "must": false,
                  "desc": "工作地址国家"
                },
                {
                  "name": "workAddressState",
                  "type": "string",
                  "must": false,
                  "desc": "工作地址省份"
                },
                {
                  "name": "workAddressCity",
                  "type": "string",
                  "must": false,
                  "desc": "工作地址城市"
                },
                {
                  "name": "workAddressStreet",
                  "type": "string",
                  "must": false,
                  "desc": "工作地址街道"
                },
                {
                  "name": "workAddressPostalCode",
                  "type": "string",
                  "must": false,
                  "desc": "工作地址邮政编码"
                },
                {
                  "name": "homeFaxNumber",
                  "type": "string",
                  "must": false,
                  "desc": "住宅传真"
                },
                {
                  "name": "homePhoneNumber",
                  "type": "string",
                  "must": false,
                  "desc": "住宅电话"
                },
                {
                  "name": "homeAddressCountry",
                  "type": "string",
                  "must": false,
                  "desc": "住宅地址国家"
                },
                {
                  "name": "homeAddressState",
                  "type": "string",
                  "must": false,
                  "desc": "住宅地址省份"
                },
                {
                  "name": "homeAddressCity",
                  "type": "string",
                  "must": false,
                  "desc": "住宅地址城市"
                },
                {
                  "name": "homeAddressStreet",
                  "type": "string",
                  "must": false,
                  "desc": "住宅地址街道"
                },
                {
                  "name": "homeAddressPostalCode",
                  "type": "string",
                  "must": false,
                  "desc": "住宅地址邮政编码"
                },
                {
                  "name": "success",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用成功",
                  "parameters": []
                },
                {
                  "name": "fail",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用失败的回调函数",
                  "parameters": []
                },
                {
                  "name": "complete",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用结束的回调函数（调用成功、失败都会执行）",
                  "parameters": []
                }
              ]
            }
          ],
          "desc": "调用后，用户可以选择将该表单以“新增联系人”或“添加到已有联系人”的方式，写入手机系统通讯录，完成手机通讯录联系人和联系方式的增加。"
        },
        {
          "type": "function",
          "name": "arrayBufferToBase64",
          "parameters": [
            {
              "type": "string[]",
              "name": "arraybuffer"
            }
          ],
          "desc": "将 ArrayBuffer 数据转成 Base64 字符串"
        },
        {
          "type": "function",
          "name": "authorize",
          "parameters": [
            {
              "type": "object",
              "name": "object",
              "members": [
                {
                  "name": "scope",
                  "type": "string",
                  "must": true,
                  "desc": "需要获取权限的scope，详见 [scope 列表](./authorize.md#scope-列表)"
                },
                {
                  "name": "success",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用成功的回调函数",
                  "parameters": [
                    {
                      "type": "object",
                      "name": "result",
                      "members": [
                        {
                          "name": "errMsg",
                          "type": "string",
                          "desc": "调用结果"
                        }
                      ]
                    }
                  ]
                },
                {
                  "name": "fail",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用失败的回调函数",
                  "parameters": []
                },
                {
                  "name": "complete",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用结束的回调函数（调用成功、失败都会执行）",
                  "parameters": []
                }
              ]
            }
          ],
          "desc": "部分接口需要获得同意后才能调用。此类接口调用时，如果用户未授权过，会弹窗询问用户，用户点击同意后方可调用接口。如果用户点了拒绝，则短期内调用不会出现弹窗，而是直接进入 fail 回调。用户可以在小程序设置界面中修改对该小程序的授权信息。本接口用于提前向用户发起授权，调用后会立刻弹窗询问用户是否同意小程序使用某项功能或获取用户的某些数据，但不会实际调用接口。如果用户之前已经同意，则不会出现弹窗，直接返回成功。"
        },
        {
          "type": "function",
          "name": "base64ToArrayBuffer",
          "parameters": [
            {
              "type": "string",
              "name": "base64"
            }
          ],
          "desc": "将 Base64 字符串转成 ArrayBuffer 数据"
        },
        {
          "type": "function",
          "name": "canIUse",
          "parameters": [
            {
              "type": "string",
              "name": "string"
            }
          ],
          "desc": "判断小程序的API，回调，参数，组件等是否在当前版本可用。"
        },
        {
          "type": "function",
          "name": "canvasToTempFilePath",
          "parameters": [
            {
              "type": "object",
              "name": "object",
              "members": [
                {
                  "name": "x",
                  "type": "number",
                  "must": false,
                  "desc": "画布x轴起点（默认0）"
                },
                {
                  "name": "y",
                  "type": "number",
                  "must": false,
                  "desc": "画布y轴起点（默认0）"
                },
                {
                  "name": "width",
                  "type": "number",
                  "must": false,
                  "desc": "画布宽度（默认为canvas宽度-x）"
                },
                {
                  "name": "height",
                  "type": "number",
                  "must": false,
                  "desc": "画布高度（默认为canvas高度-y）"
                },
                {
                  "name": "destWidth",
                  "type": "number",
                  "must": false,
                  "desc": "输出图片宽度（默认为width）"
                },
                {
                  "name": "destHeight",
                  "type": "number",
                  "must": false,
                  "desc": "输出图片高度（默认为height）"
                },
                {
                  "name": "canvasId",
                  "type": "string",
                  "must": true,
                  "desc": "画布标识，传入 [`<canvas/>`](../../component/canvas.md) 的 cavas-id"
                },
                {
                  "name": "success",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用成功的回调函数",
                  "parameters": []
                },
                {
                  "name": "fail",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用失败的回调函数",
                  "parameters": []
                },
                {
                  "name": "complete",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用结束的回调函数（调用成功、失败都会执行）",
                  "parameters": []
                }
              ]
            }
          ],
          "desc": "把当前画布指定区域的内容导出生成指定大小的图片，并返回文件路径。"
        },
        {
          "type": "function",
          "name": "captureScreen",
          "parameters": [
            {
              "type": "object",
              "name": "object",
              "members": [
                {
                  "name": "success",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用成功的回调函数",
                  "parameters": [
                    {
                      "type": "object",
                      "name": "result",
                      "members": [
                        {
                          "name": "tempFilePath",
                          "type": "string",
                          "desc": "截屏产生图片的本地文件路径"
                        },
                        {
                          "name": "errMsg",
                          "type": "string",
                          "desc": "调用结果"
                        }
                      ]
                    }
                  ]
                },
                {
                  "name": "fail",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用失败的回调函数",
                  "parameters": []
                },
                {
                  "name": "complete",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用结束的回调函数（调用成功、失败都会执行）",
                  "parameters": []
                }
              ]
            }
          ],
          "desc": "截取当前屏幕内容"
        },
        {
          "type": "function",
          "name": "checkSession",
          "parameters": [
            {
              "type": "object",
              "name": "object",
              "members": [
                {
                  "name": "success",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用成功的回调函数，登录态未过期",
                  "parameters": []
                },
                {
                  "name": "fail",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用失败的回调函数，登录态已过期",
                  "parameters": []
                },
                {
                  "name": "complete",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用结束的回调函数（调用成功、失败都会执行）",
                  "parameters": []
                }
              ]
            }
          ],
          "desc": "通过上述接口获得的用户登录态拥有一定的时效性。用户越久未使用小程序，用户登录态越有可能失效。反之如果用户一直在使用小程序，则用户登录态一直保持有效。具体时效逻辑由微信维护，对开发者透明。开发者只需要调用wx.checkSession接口**检测当前用户登录态是否有效**。登录态过期后开发者可以再调用wx.login获取新的用户登录态。"
        },
        {
          "type": "function",
          "name": "chooseAddress",
          "parameters": [
            {
              "type": "object",
              "name": "object",
              "members": [
                {
                  "name": "success",
                  "type": "function",
                  "must": false,
                  "desc": "返回用户选择的收货地址信息",
                  "parameters": [
                    {
                      "type": "object",
                      "name": "result",
                      "members": [
                        {
                          "name": "errMsg",
                          "type": "string",
                          "desc": "调用结果"
                        },
                        {
                          "name": "userName",
                          "type": "string",
                          "desc": "收货人姓名"
                        },
                        {
                          "name": "postalCode",
                          "type": "string",
                          "desc": "邮编"
                        },
                        {
                          "name": "provinceName",
                          "type": "string",
                          "desc": "国标收货地址第一级地址"
                        },
                        {
                          "name": "cityName",
                          "type": "string",
                          "desc": "国标收货地址第二级地址"
                        },
                        {
                          "name": "countyName",
                          "type": "string",
                          "desc": "国标收货地址第三级地址"
                        },
                        {
                          "name": "detailInfo",
                          "type": "string",
                          "desc": "详细收货地址信息"
                        },
                        {
                          "name": "nationalCode",
                          "type": "string",
                          "desc": "收货地址国家码"
                        },
                        {
                          "name": "telNumber",
                          "type": "string",
                          "desc": "收货人手机号码"
                        }
                      ]
                    }
                  ]
                },
                {
                  "name": "fail",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用失败的回调函数",
                  "parameters": []
                },
                {
                  "name": "complete",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用结束的回调函数（调用成功、失败都会执行）",
                  "parameters": []
                }
              ]
            }
          ],
          "desc": "调起用户编辑收货地址原生界面，并在编辑完成后返回用户选择的地址。"
        },
        {
          "type": "function",
          "name": "chooseContact",
          "parameters": [
            {
              "type": "object",
              "name": "object",
              "members": [
                {
                  "name": "success",
                  "type": "function",
                  "must": false,
                  "desc": "返回用户选择的联系人信息",
                  "parameters": [
                    {
                      "type": "object",
                      "name": "result",
                      "members": [
                        {
                          "name": "phoneNumber",
                          "desc": "电话号码"
                        },
                        {
                          "name": "displayName",
                          "desc": "联系人名称"
                        }
                      ]
                    }
                  ]
                },
                {
                  "name": "fail",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用失败的回调函数",
                  "parameters": []
                },
                {
                  "name": "complete",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用结束的回调函数（调用成功、失败都会执行）",
                  "parameters": []
                }
              ]
            }
          ],
          "desc": "调起选择手机通讯录联系人界面，返回用户选择的联系人信息。"
        },
        {
          "type": "function",
          "name": "chooseImage",
          "parameters": [
            {
              "type": "object",
              "name": "object",
              "members": [
                {
                  "name": "count",
                  "type": "number",
                  "must": false,
                  "desc": "最多可以选择的图片张数，默认9"
                },
                {
                  "name": "sizeType",
                  "type": "string[]",
                  "must": false,
                  "desc": "original 原图，compressed 压缩图，默认二者都有"
                },
                {
                  "name": "sourceType",
                  "type": "string[]",
                  "must": false,
                  "desc": "album 从相册选图，camera 使用相机，默认二者都有"
                },
                {
                  "name": "success",
                  "type": "function",
                  "must": true,
                  "desc": "成功则返回图片的本地文件路径列表 tempFilePaths",
                  "parameters": [
                    {
                      "type": "object",
                      "name": "result",
                      "members": [
                        {
                          "name": "tempFilePaths",
                          "type": "string[]",
                          "desc": "图片的本地文件路径列表"
                        },
                        {
                          "name": "tempFiles",
                          "type": "object[]",
                          "desc": "图片的本地文件列表，每一项是一个 File 对象"
                        }
                      ]
                    }
                  ]
                },
                {
                  "name": "fail",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用失败的回调函数",
                  "parameters": []
                },
                {
                  "name": "complete",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用结束的回调函数（调用成功、失败都会执行）",
                  "parameters": []
                }
              ]
            }
          ],
          "desc": "从本地相册选择图片或使用相机拍照。"
        },
        {
          "type": "function",
          "name": "chooseLocation",
          "parameters": [
            {
              "type": "object",
              "name": "object",
              "members": [
                {
                  "name": "success",
                  "type": "function",
                  "must": true,
                  "desc": "接口调用成功的回调函数，返回内容详见返回参数说明。",
                  "parameters": [
                    {
                      "type": "object",
                      "name": "result",
                      "members": [
                        {
                          "name": "name",
                          "desc": "位置名称"
                        },
                        {
                          "name": "address",
                          "desc": "详细地址"
                        },
                        {
                          "name": "latitude",
                          "desc": "纬度，浮点数，范围为-90~90，负数表示南纬"
                        },
                        {
                          "name": "longitude",
                          "desc": "经度，浮点数，范围为-180~180，负数表示西经"
                        }
                      ]
                    }
                  ]
                },
                {
                  "name": "cancel",
                  "type": "function",
                  "must": false,
                  "desc": "用户取消时调用",
                  "parameters": []
                },
                {
                  "name": "fail",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用失败的回调函数",
                  "parameters": []
                },
                {
                  "name": "complete",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用结束的回调函数（调用成功、失败都会执行）",
                  "parameters": []
                }
              ]
            }
          ],
          "desc": "打开地图选择位置"
        },
        {
          "type": "function",
          "name": "chooseVideo",
          "parameters": [
            {
              "type": "object",
              "name": "object",
              "members": [
                {
                  "name": "sourceType",
                  "type": "string[]",
                  "must": false,
                  "desc": "album 从相册选视频，camera 使用相机拍摄，默认为：['album', 'camera']"
                },
                {
                  "name": "maxDuration",
                  "type": "number",
                  "must": false,
                  "desc": "拍摄视频最长拍摄时间，单位秒。最长支持 60 秒"
                },
                {
                  "name": "camera",
                  "type": "string",
                  "must": false,
                  "desc": "默认调起的为前置还是后置摄像头。front: 前置，back: 后置，默认 back"
                },
                {
                  "name": "success",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用成功，返回视频文件的临时文件路径，详见返回参数说明",
                  "parameters": [
                    {
                      "type": "object",
                      "name": "result",
                      "members": [
                        {
                          "name": "tempFilePath",
                          "desc": "选定视频的临时文件路径"
                        },
                        {
                          "name": "duration",
                          "desc": "选定视频的时间长度"
                        },
                        {
                          "name": "size",
                          "desc": "选定视频的数据量大小"
                        },
                        {
                          "name": "height",
                          "desc": "返回选定视频的长"
                        },
                        {
                          "name": "width",
                          "desc": "返回选定视频的宽"
                        }
                      ]
                    }
                  ]
                },
                {
                  "name": "fail",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用失败的回调函数",
                  "parameters": []
                },
                {
                  "name": "complete",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用结束的回调函数（调用成功、失败都会执行）",
                  "parameters": []
                }
              ]
            }
          ],
          "desc": "拍摄视频或从手机相册中选视频，返回视频的临时文件路径。"
        },
        {
          "type": "function",
          "name": "clearStorage",
          "parameters": [],
          "desc": "清理本地数据缓存。"
        },
        {
          "type": "function",
          "name": "clearStorageSync",
          "parameters": [],
          "desc": "同步清理本地数据缓存"
        },
        {
          "type": "function",
          "name": "closeBLEConnection",
          "parameters": [
            {
              "type": "object",
              "name": "object",
              "members": [
                {
                  "name": "deviceId",
                  "type": "string",
                  "must": true,
                  "desc": "蓝牙设备 id，参考 getDevices 接口"
                },
                {
                  "name": "success",
                  "type": "function",
                  "must": true,
                  "desc": "成功则返回本机蓝牙适配器状态",
                  "parameters": [
                    {
                      "type": "object",
                      "name": "result",
                      "members": [
                        {
                          "name": "errMsg",
                          "type": "string",
                          "desc": "成功：ok，错误：详细信息"
                        }
                      ]
                    }
                  ]
                },
                {
                  "name": "fail",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用失败的回调函数",
                  "parameters": []
                },
                {
                  "name": "complete",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用结束的回调函数（调用成功、失败都会执行）",
                  "parameters": []
                }
              ]
            }
          ],
          "desc": "断开与低功耗蓝牙设备的连接"
        },
        {
          "type": "function",
          "name": "closeBluetoothAdapter",
          "parameters": [
            {
              "type": "object",
              "name": "object",
              "members": [
                {
                  "name": "success",
                  "type": "function",
                  "must": true,
                  "desc": "成功则返回成功关闭模块信息",
                  "parameters": []
                },
                {
                  "name": "fail",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用失败的回调函数",
                  "parameters": []
                },
                {
                  "name": "complete",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用结束的回调函数（调用成功、失败都会执行）",
                  "parameters": []
                }
              ]
            }
          ],
          "desc": "关闭蓝牙模块。调用该方法将断开所有已建立的链接并释放系统资源"
        },
        {
          "type": "function",
          "name": "closeSocket",
          "parameters": [
            {
              "type": "object",
              "name": "object",
              "members": [
                {
                  "name": "code",
                  "type": "number",
                  "must": false,
                  "desc": "一个数字值表示关闭连接的状态号，表示连接被关闭的原因。如果这个参数没有被指定，默认的取值是1000 （表示正常连接关闭）"
                },
                {
                  "name": "reason",
                  "type": "string",
                  "must": false,
                  "desc": "一个可读的字符串，表示连接被关闭的原因。这个字符串必须是不长于123字节的UTF-8 文本（不是字符）"
                },
                {
                  "name": "success",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用成功的回调函数",
                  "parameters": []
                },
                {
                  "name": "fail",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用失败的回调函数",
                  "parameters": []
                },
                {
                  "name": "complete",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用结束的回调函数（调用成功、失败都会执行）",
                  "parameters": []
                }
              ]
            }
          ],
          "desc": "关闭WebSocket连接。"
        },
        {
          "type": "function",
          "name": "connectSocket",
          "parameters": [
            {
              "type": "object",
              "name": "object",
              "members": [
                {
                  "name": "url",
                  "type": "string",
                  "must": true,
                  "desc": "开发者服务器接口地址，必须是 wss 协议，且域名必须是后台配置的合法域名"
                },
                {
                  "name": "data",
                  "type": "object",
                  "must": false,
                  "desc": "请求的数据"
                },
                {
                  "name": "header",
                  "type": "object",
                  "must": false,
                  "desc": "HTTP Header , header 中不能设置 Referer"
                },
                {
                  "name": "method",
                  "type": "string",
                  "must": false,
                  "desc": "默认是GET，有效值： OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT"
                },
                {
                  "name": "protocols",
                  "type": "string[]",
                  "must": false,
                  "desc": "子协议数组"
                },
                {
                  "name": "success",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用成功的回调函数",
                  "parameters": []
                },
                {
                  "name": "fail",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用失败的回调函数",
                  "parameters": []
                },
                {
                  "name": "complete",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用结束的回调函数（调用成功、失败都会执行）",
                  "parameters": []
                }
              ]
            }
          ],
          "desc": "创建一个 [WebSocket](https://developer.mozilla.org/zh-CN/docs/Web/API/WebSocket) 连接；**一个微信小程序同时只能有一个 WebSocket 连接，如果当前已存在一个 WebSocket 连接，会自动关闭该连接，并重新创建一个 WebSocket 连接。**"
        },
        {
          "type": "function",
          "name": "createAnimation",
          "parameters": [
            {
              "type": "object",
              "name": "object",
              "members": [
                {
                  "name": "duration",
                  "type": "integer",
                  "must": false,
                  "default": "400",
                  "desc": "动画持续时间，单位ms"
                },
                {
                  "name": "timingFunction",
                  "type": "string",
                  "must": false,
                  "default": "\"linear\"",
                  "desc": "定义动画的效果"
                },
                {
                  "name": "delay",
                  "type": "integer",
                  "must": false,
                  "default": "0",
                  "desc": "动画延迟时间，单位 ms"
                },
                {
                  "name": "transformOrigin",
                  "type": "string",
                  "must": false,
                  "default": "\"50% 50% 0\"",
                  "desc": "设置transform-origin"
                }
              ]
            }
          ],
          "desc": "创建一个动画实例[animation](#animation)。调用实例的方法来描述动画。最后通过动画实例的`export`方法导出动画数据传递给组件的`animation`属性。"
        },
        {
          "type": "function",
          "name": "createAudioContext",
          "parameters": [
            {
              "type": "string",
              "name": "audioid"
            }
          ],
          "desc": "创建并返回 audio 上下文 `audioContext` 对象"
        },
        {
          "type": "function",
          "name": "createBLEConnection",
          "parameters": [
            {
              "type": "object",
              "name": "object",
              "members": [
                {
                  "name": "deviceId",
                  "type": "string",
                  "must": true,
                  "desc": "蓝牙设备 id，参考 getDevices 接口"
                },
                {
                  "name": "success",
                  "type": "function",
                  "must": true,
                  "desc": "成功则返回本机蓝牙适配器状态",
                  "parameters": [
                    {
                      "type": "object",
                      "name": "result",
                      "members": [
                        {
                          "name": "errMsg",
                          "type": "string",
                          "desc": "成功：ok，错误：详细信息"
                        }
                      ]
                    }
                  ]
                },
                {
                  "name": "fail",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用失败的回调函数",
                  "parameters": []
                },
                {
                  "name": "complete",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用结束的回调函数（调用成功、失败都会执行）",
                  "parameters": []
                }
              ]
            }
          ],
          "desc": "连接低功耗蓝牙设备"
        },
        {
          "type": "function",
          "name": "createCanvasContext",
          "parameters": [
            {
              "type": "string",
              "name": "canvasid"
            }
          ],
          "desc": "创建 canvas 绘图上下文（指定 canvasId）"
        },
        {
          "type": "function",
          "name": "createContext",
          "parameters": [],
          "desc": "创建并返回绘图上下文。"
        },
        {
          "type": "function",
          "name": "createMapContext",
          "parameters": [
            {
              "type": "string",
              "name": "mapid"
            }
          ],
          "desc": "创建并返回 map 上下文 `mapContext` 对象"
        },
        {
          "type": "function",
          "name": "createSelectorQuery",
          "parameters": []
        },
        {
          "type": "function",
          "name": "createVideoContext",
          "parameters": [
            {
              "type": "string",
              "name": "videoid"
            }
          ],
          "desc": "创建并返回 video 上下文 `videoContext` 对象\r"
        },
        {
          "type": "function",
          "name": "downloadFile",
          "parameters": [
            {
              "type": "object",
              "name": "object",
              "members": [
                {
                  "name": "url",
                  "type": "string",
                  "must": false
                },
                {
                  "name": "header",
                  "type": "object",
                  "must": false
                },
                {
                  "name": "success",
                  "type": "function",
                  "must": false,
                  "parameters": []
                },
                {
                  "name": "fail",
                  "type": "function",
                  "must": false,
                  "parameters": []
                },
                {
                  "name": "complete",
                  "type": "function",
                  "must": false,
                  "parameters": []
                }
              ]
            }
          ],
          "desc": "下载文件资源到本地。客户端直接发起一个 HTTP GET 请求，返回文件的本地临时路径。"
        },
        {
          "type": "function",
          "name": "getBLEDeviceCharacteristics",
          "parameters": [
            {
              "type": "object",
              "name": "object",
              "members": [
                {
                  "name": "deviceId",
                  "type": "string",
                  "must": true,
                  "desc": "蓝牙设备 id，参考 device 对象"
                },
                {
                  "name": "serviceId",
                  "type": "string",
                  "must": true,
                  "desc": "蓝牙服务 uuid"
                },
                {
                  "name": "success",
                  "type": "function",
                  "must": true,
                  "desc": "成功则返回本机蓝牙适配器状态",
                  "parameters": [
                    {
                      "type": "object",
                      "name": "result",
                      "members": [
                        {
                          "name": "characteristics",
                          "type": "string[]",
                          "desc": "设备特征值列表"
                        },
                        {
                          "name": "errMsg",
                          "type": "string",
                          "desc": "成功：ok，错误：详细信息"
                        }
                      ]
                    }
                  ]
                },
                {
                  "name": "fail",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用失败的回调函数",
                  "parameters": []
                },
                {
                  "name": "complete",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用结束的回调函数（调用成功、失败都会执行）",
                  "parameters": []
                }
              ]
            }
          ],
          "desc": "蓝牙设备characteristic(特征值)信息"
        },
        {
          "type": "function",
          "name": "getBLEDeviceServices",
          "parameters": [
            {
              "type": "object",
              "name": "object",
              "members": [
                {
                  "name": "deviceId",
                  "type": "string",
                  "must": true,
                  "desc": "蓝牙设备 id，参考 getDevices 接口"
                },
                {
                  "name": "success",
                  "type": "function",
                  "must": true,
                  "desc": "成功则返回本机蓝牙适配器状态",
                  "parameters": [
                    {
                      "type": "object",
                      "name": "result",
                      "members": [
                        {
                          "name": "services",
                          "type": "string[]",
                          "desc": "设备服务列表"
                        },
                        {
                          "name": "errMsg",
                          "type": "string",
                          "desc": "成功：ok，错误：详细信息"
                        }
                      ]
                    }
                  ]
                },
                {
                  "name": "fail",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用失败的回调函数",
                  "parameters": []
                },
                {
                  "name": "complete",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用结束的回调函数（调用成功、失败都会执行）",
                  "parameters": []
                }
              ]
            }
          ],
          "desc": "获取蓝牙设备所有 service（服务）"
        },
        {
          "type": "function",
          "name": "getBackgroundAudioManager",
          "parameters": [],
          "desc": "获取**全局唯一**的背景音频管理器 `backgroundAudioManager`",
          "return": {
            "type": "object",
            "name": "backgroundAudioManager",
            "members": [
              {
                "name": "duration",
                "type": "number",
                "desc": "当前音频的长度（单位：s），只有在当前有合法的 src 时返回"
              },
              {
                "name": "currentTime",
                "type": "number",
                "desc": "当前音频的播放位置（单位：s），只有在当前有合法的 src 时返回"
              },
              {
                "name": "paused",
                "type": "boolean",
                "desc": "当前是是否暂停或停止状态，true 表示暂停或停止，false 表示正在播放"
              },
              {
                "name": "src",
                "type": "string",
                "desc": "音频的数据源，默认为空字符串，**当设置了新的 src 时，会自动开始播放** ，目前支持的格式有 m4a, aac, mp3, wav"
              },
              {
                "name": "startTime",
                "type": "number",
                "desc": "音频开始播放的位置（单位：s）"
              },
              {
                "name": "buffered",
                "type": "number",
                "desc": "音频缓冲的时间点，仅保证当前播放时间点到此时间点内容已缓冲。"
              },
              {
                "name": "title",
                "type": "string",
                "desc": "音频标题，用于做原生音频播放器音频标题。原生音频播放器中的分享功能，分享出去的卡片标题，也将使用该值。"
              },
              {
                "name": "epname",
                "type": "string",
                "desc": "专辑名，原生音频播放器中的分享功能，分享出去的卡片简介，也将使用该值。"
              },
              {
                "name": "singer",
                "type": "string",
                "desc": "歌手名，原生音频播放器中的分享功能，分享出去的卡片简介，也将使用该值。"
              },
              {
                "name": "coverImgUrl",
                "type": "string",
                "desc": "封面图url，用于做原生音频播放器背景图。原生音频播放器中的分享功能，分享出去的卡片配图及背景也将使用该图。"
              },
              {
                "name": "webUrl",
                "type": "string",
                "desc": "页面链接，原生音频播放器中的分享功能，分享出去的卡片简介，也将使用该值。"
              },
              {
                "name": "play",
                "parameters": [],
                "desc": "播放",
                "type": "function"
              },
              {
                "name": "pause",
                "parameters": [],
                "desc": "暂停",
                "type": "function"
              },
              {
                "name": "stop",
                "parameters": [],
                "desc": "停止",
                "type": "function"
              },
              {
                "name": "seek",
                "parameters": [
                  "position"
                ],
                "desc": "跳转到指定位置，单位 s",
                "type": "function"
              },
              {
                "name": "onCanplay",
                "parameters": [
                  "callback"
                ],
                "desc": "背景音频进入可以播放状态，但不保证后面可以流畅播放",
                "type": "function"
              },
              {
                "name": "onPlay",
                "parameters": [
                  "callback"
                ],
                "desc": "背景音频播放事件",
                "type": "function"
              },
              {
                "name": "onPause",
                "parameters": [
                  "callback"
                ],
                "desc": "背景音频暂停事件",
                "type": "function"
              },
              {
                "name": "onStop",
                "parameters": [
                  "callback"
                ],
                "desc": "背景音频停止事件",
                "type": "function"
              },
              {
                "name": "onEnded",
                "parameters": [
                  "callback"
                ],
                "desc": "背景音频自然播放结束事件",
                "type": "function"
              },
              {
                "name": "onTimeUpdate",
                "parameters": [
                  "callback"
                ],
                "desc": "背景音频播放进度更新事件",
                "type": "function"
              },
              {
                "name": "onPrev",
                "parameters": [
                  "callback"
                ],
                "desc": "用户在系统音乐播放面板点击上一曲事件（iOS only）",
                "type": "function"
              },
              {
                "name": "onNext",
                "parameters": [
                  "callback"
                ],
                "desc": "用户在系统音乐播放面板点击下一曲事件（iOS only）",
                "type": "function"
              },
              {
                "name": "onError",
                "parameters": [
                  "callback"
                ],
                "desc": "背景音频播放错误事件",
                "type": "function"
              },
              {
                "name": "onWaiting",
                "parameters": [
                  "callback"
                ],
                "desc": "音频加载中事件，当音频因为数据不足，需要停下来加载时会触发",
                "type": "function"
              }
            ]
          }
        },
        {
          "type": "function",
          "name": "getBackgroundAudioPlayerState",
          "parameters": [
            {
              "type": "object",
              "name": "object",
              "members": [
                {
                  "name": "success",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用成功的回调函数",
                  "parameters": [
                    {
                      "type": "object",
                      "name": "result",
                      "members": [
                        {
                          "name": "duration",
                          "desc": "选定音频的长度（单位：s），只有在当前有音乐播放时返回"
                        },
                        {
                          "name": "currentPosition",
                          "desc": "选定音频的播放位置（单位：s），只有在当前有音乐播放时返回"
                        },
                        {
                          "name": "status",
                          "desc": "播放状态（2：没有音乐在播放，1：播放中，0：暂停中）"
                        },
                        {
                          "name": "downloadPercent",
                          "desc": "音频的下载进度（整数，80 代表 80%），只有在当前有音乐播放时返回"
                        },
                        {
                          "name": "dataUrl",
                          "desc": "歌曲数据链接，只有在当前有音乐播放时返回"
                        }
                      ]
                    }
                  ]
                },
                {
                  "name": "fail",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用失败的回调函数",
                  "parameters": []
                },
                {
                  "name": "complete",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用结束的回调函数（调用成功、失败都会执行）",
                  "parameters": []
                }
              ]
            }
          ],
          "desc": "获取后台音乐播放状态。"
        },
        {
          "type": "function",
          "name": "getBeacons",
          "parameters": [
            {
              "type": "object",
              "name": "object",
              "members": [
                {
                  "name": "success",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用成功的回调函数",
                  "parameters": [
                    {
                      "type": "object",
                      "name": "result",
                      "members": [
                        {
                          "name": "beacons",
                          "type": "object[]",
                          "desc": "iBeacon 设备列表"
                        },
                        {
                          "name": "errMsg",
                          "type": "string",
                          "desc": "调用结果"
                        }
                      ]
                    }
                  ]
                },
                {
                  "name": "fail",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用失败的回调函数",
                  "parameters": []
                },
                {
                  "name": "complete",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用结束的回调函数（调用成功、失败都会执行）",
                  "parameters": []
                }
              ]
            }
          ],
          "desc": "获取所有已搜索到的`iBeacon`设备"
        },
        {
          "type": "function",
          "name": "getBluetoothAdapterState",
          "parameters": [
            {
              "type": "object",
              "name": "object",
              "members": [
                {
                  "name": "success",
                  "type": "function",
                  "must": true,
                  "desc": "成功则返回本机蓝牙适配器状态",
                  "parameters": [
                    {
                      "type": "object",
                      "name": "result",
                      "members": [
                        {
                          "name": "discovering",
                          "type": "boolean",
                          "desc": "是否正在搜索设备"
                        },
                        {
                          "name": "available",
                          "type": "boolean",
                          "desc": "蓝牙适配器是否可用"
                        },
                        {
                          "name": "errMsg",
                          "type": "string",
                          "desc": "成功：ok，错误：详细信息"
                        }
                      ]
                    }
                  ]
                },
                {
                  "name": "fail",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用失败的回调函数",
                  "parameters": []
                },
                {
                  "name": "complete",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用结束的回调函数（调用成功、失败都会执行）",
                  "parameters": []
                }
              ]
            }
          ],
          "desc": "获取本机蓝牙适配器状态"
        },
        {
          "type": "function",
          "name": "getBluetoothDevices",
          "parameters": [
            {
              "type": "object",
              "name": "object",
              "members": [
                {
                  "name": "success",
                  "type": "function",
                  "must": true,
                  "desc": "成功则返回本机蓝牙适配器状态",
                  "parameters": [
                    {
                      "type": "object",
                      "name": "result",
                      "members": [
                        {
                          "name": "devices",
                          "type": "string[]",
                          "desc": "uuid 对应的的已连接设备列表"
                        },
                        {
                          "name": "errMsg",
                          "type": "string",
                          "desc": "成功：ok，错误：详细信息"
                        }
                      ]
                    }
                  ]
                },
                {
                  "name": "fail",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用失败的回调函数",
                  "parameters": []
                },
                {
                  "name": "complete",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用结束的回调函数（调用成功、失败都会执行）",
                  "parameters": []
                }
              ]
            }
          ],
          "desc": "获取所有已发现的蓝牙设备，包括已经和本机处于连接状态的设备"
        },
        {
          "type": "function",
          "name": "getClipboardData",
          "parameters": [
            {
              "type": "object",
              "name": "object",
              "members": [
                {
                  "name": "success",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用成功的回调函数",
                  "parameters": [
                    {
                      "type": "object",
                      "name": "result",
                      "members": [
                        {
                          "name": "data",
                          "type": "string",
                          "desc": "剪贴板的内容"
                        }
                      ]
                    }
                  ]
                },
                {
                  "name": "fail",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用失败的回调函数",
                  "parameters": []
                },
                {
                  "name": "complete",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用结束的回调函数（调用成功、失败都会执行）",
                  "parameters": []
                }
              ]
            }
          ],
          "desc": "获取系统剪贴板内容"
        },
        {
          "type": "function",
          "name": "getConnectedBluetoothDevices",
          "parameters": [
            {
              "type": "object",
              "name": "object",
              "members": [
                {
                  "name": "services",
                  "type": "string[]",
                  "must": true,
                  "desc": "蓝牙设备主 service 的 uuid 列表"
                },
                {
                  "name": "success",
                  "type": "function",
                  "must": true,
                  "desc": "成功则返回本机蓝牙适配器状态",
                  "parameters": [
                    {
                      "type": "object",
                      "name": "result",
                      "members": [
                        {
                          "name": "devices",
                          "type": "string[]",
                          "desc": "搜索到的设备列表"
                        },
                        {
                          "name": "errMsg",
                          "type": "string",
                          "desc": "成功：ok，错误：详细信息"
                        }
                      ]
                    }
                  ]
                },
                {
                  "name": "fail",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用失败的回调函数",
                  "parameters": []
                },
                {
                  "name": "complete",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用结束的回调函数（调用成功、失败都会执行）",
                  "parameters": []
                }
              ]
            }
          ],
          "desc": "根据 uuid 获取处于已连接状态的设备"
        },
        {
          "type": "function",
          "name": "getExtConfig",
          "parameters": [
            {
              "type": "object",
              "name": "object",
              "members": [
                {
                  "name": "success",
                  "type": "function",
                  "must": false,
                  "desc": "返回第三方平台自定义的数据",
                  "parameters": [
                    {
                      "type": "object",
                      "name": "result",
                      "members": [
                        {
                          "name": "errMsg",
                          "type": "string",
                          "desc": "调用结果"
                        },
                        {
                          "name": "extConfig",
                          "type": "object",
                          "desc": "第三方平台自定义的数据"
                        }
                      ]
                    }
                  ]
                },
                {
                  "name": "fail",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用失败的回调函数",
                  "parameters": []
                },
                {
                  "name": "complete",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用结束的回调函数（调用成功、失败都会执行）",
                  "parameters": []
                }
              ]
            }
          ],
          "desc": "获取第三方平台自定义的数据字段。\r"
        },
        {
          "type": "function",
          "name": "getExtConfigSync",
          "parameters": [],
          "desc": "获取第三方平台自定义的数据字段的同步接口。\r",
          "return": {
            "type": "object",
            "name": "object",
            "members": [
              {
                "name": "extConfig",
                "type": "object",
                "desc": "第三方平台自定义的数据"
              }
            ]
          }
        },
        {
          "type": "function",
          "name": "getFileInfo",
          "parameters": [
            {
              "type": "object",
              "name": "object",
              "members": [
                {
                  "name": "filePath",
                  "type": "string",
                  "must": true,
                  "desc": "本地文件路径"
                },
                {
                  "name": "digestAlgorithm",
                  "type": "string",
                  "must": false,
                  "desc": "计算文件摘要的算法，默认值 md5，有效值：md5，sha1"
                },
                {
                  "name": "success",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用成功的回调函数",
                  "parameters": [
                    {
                      "type": "object",
                      "name": "result",
                      "members": [
                        {
                          "name": "size",
                          "type": "number",
                          "desc": "文件大小，单位：B"
                        },
                        {
                          "name": "digest",
                          "type": "string",
                          "desc": "按照传入的 digestAlgorithm 计算得出的的文件摘要"
                        },
                        {
                          "name": "errMsg",
                          "type": "string",
                          "desc": "调用结果"
                        }
                      ]
                    }
                  ]
                },
                {
                  "name": "fail",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用失败的回调函数",
                  "parameters": []
                },
                {
                  "name": "complete",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用结束的回调函数（调用成功、失败都会执行）",
                  "parameters": []
                }
              ]
            }
          ],
          "desc": "获取文件信息"
        },
        {
          "type": "function",
          "name": "getImageInfo",
          "parameters": [
            {
              "type": "object",
              "name": "object",
              "members": [
                {
                  "name": "src",
                  "type": "string",
                  "must": true,
                  "desc": "图片的路径，可以是相对路径，临时文件路径，存储文件路径，网络图片路径"
                },
                {
                  "name": "success",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用成功的回调函数",
                  "parameters": [
                    {
                      "type": "object",
                      "name": "result",
                      "members": [
                        {
                          "name": "width",
                          "type": "number",
                          "desc": "图片宽度，单位px"
                        },
                        {
                          "name": "height",
                          "type": "number",
                          "desc": "图片高度 单位px"
                        },
                        {
                          "name": "path",
                          "type": "string",
                          "desc": "返回图片的本地路径"
                        }
                      ]
                    }
                  ]
                },
                {
                  "name": "fail",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用失败的回调函数",
                  "parameters": []
                },
                {
                  "name": "complete",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用结束的回调函数（调用成功、失败都会执行）",
                  "parameters": []
                }
              ]
            }
          ],
          "desc": "获取图片信息"
        },
        {
          "type": "function",
          "name": "getLocation",
          "parameters": [
            {
              "type": "object",
              "name": "object",
              "members": [
                {
                  "name": "type",
                  "type": "string",
                  "must": false,
                  "desc": "默认为 wgs84 返回 gps 坐标，gcj02 返回可用于`wx.openLocation`的坐标"
                },
                {
                  "name": "success",
                  "type": "function",
                  "must": true,
                  "desc": "接口调用成功的回调函数，返回内容详见返回参数说明。",
                  "parameters": [
                    {
                      "type": "object",
                      "name": "result",
                      "members": [
                        {
                          "name": "latitude",
                          "desc": "纬度，浮点数，范围为-90~90，负数表示南纬"
                        },
                        {
                          "name": "longitude",
                          "desc": "经度，浮点数，范围为-180~180，负数表示西经"
                        },
                        {
                          "name": "speed",
                          "desc": "速度，浮点数，单位m/s"
                        },
                        {
                          "name": "accuracy",
                          "desc": "位置的精确度"
                        },
                        {
                          "name": "altitude",
                          "desc": "高度，单位 m"
                        },
                        {
                          "name": "verticalAccuracy",
                          "desc": "垂直精度，单位 m（Android 无法获取，返回 0）"
                        },
                        {
                          "name": "horizontalAccuracy",
                          "desc": "水平精度，单位 m"
                        }
                      ]
                    }
                  ]
                },
                {
                  "name": "fail",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用失败的回调函数",
                  "parameters": []
                },
                {
                  "name": "complete",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用结束的回调函数（调用成功、失败都会执行）",
                  "parameters": []
                }
              ]
            }
          ],
          "desc": "获取当前的地理位置、速度。当用户离开小程序后，此接口无法调用；当用户点击“显示在聊天顶部”时，此接口可继续调用。"
        },
        {
          "type": "function",
          "name": "getNetworkType",
          "parameters": [
            {
              "type": "object",
              "name": "object",
              "members": [
                {
                  "name": "success",
                  "type": "function",
                  "must": true,
                  "desc": "接口调用成功，返回网络类型 networkType",
                  "parameters": [
                    {
                      "type": "object",
                      "name": "result",
                      "members": [
                        {
                          "name": "networkType",
                          "desc": "网络类型"
                        }
                      ]
                    }
                  ]
                },
                {
                  "name": "fail",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用失败的回调函数",
                  "parameters": []
                },
                {
                  "name": "complete",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用结束的回调函数（调用成功、失败都会执行）",
                  "parameters": []
                }
              ]
            }
          ],
          "desc": "获取网络类型。"
        },
        {
          "type": "function",
          "name": "getSavedFileInfo",
          "parameters": [
            {
              "type": "object",
              "name": "object",
              "members": [
                {
                  "name": "filePath",
                  "type": "string",
                  "must": true,
                  "desc": "文件路径"
                },
                {
                  "name": "success",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用成功的回调函数，返回结果见`success返回参数说明`",
                  "parameters": [
                    {
                      "type": "object",
                      "name": "result",
                      "members": [
                        {
                          "name": "errMsg",
                          "type": "string",
                          "desc": "接口调用结果"
                        },
                        {
                          "name": "size",
                          "type": "number",
                          "desc": "文件大小，单位B"
                        },
                        {
                          "name": "createTime",
                          "type": "number",
                          "desc": "文件的保存是的时间戳，从1970/01/01 08:00:00 到当前时间的秒数"
                        }
                      ]
                    }
                  ]
                },
                {
                  "name": "fail",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用失败的回调函数",
                  "parameters": []
                },
                {
                  "name": "complete",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用结束的回调函数（调用成功、失败都会执行）",
                  "parameters": []
                }
              ]
            }
          ],
          "desc": "获取本地文件的文件信息。此接口只能用于获取已保存到本地的文件，若需要获取临时文件信息，请使用 [wx.getFileInfo](./getFileInfo.md) 接口。"
        },
        {
          "type": "function",
          "name": "getSavedFileList",
          "parameters": [
            {
              "type": "object",
              "name": "object",
              "members": [
                {
                  "name": "success",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用成功的回调函数，返回结果见`success返回参数说明`",
                  "parameters": [
                    {
                      "type": "object",
                      "name": "result",
                      "members": [
                        {
                          "name": "errMsg",
                          "type": "string",
                          "desc": "接口调用结果"
                        },
                        {
                          "name": "fileList",
                          "type": "object[]",
                          "desc": "文件列表"
                        }
                      ]
                    }
                  ]
                },
                {
                  "name": "fail",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用失败的回调函数",
                  "parameters": []
                },
                {
                  "name": "complete",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用结束的回调函数（调用成功、失败都会执行）",
                  "parameters": []
                }
              ]
            }
          ],
          "desc": "获取本地已保存的文件列表"
        },
        {
          "type": "function",
          "name": "getScreenBrightness",
          "parameters": [
            {
              "type": "object",
              "name": "object",
              "members": [
                {
                  "name": "success",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用成功",
                  "parameters": [
                    {
                      "type": "object",
                      "name": "result",
                      "members": [
                        {
                          "name": "value",
                          "type": "number",
                          "desc": "屏幕亮度值，范围 0~1，0 最暗，1 最亮"
                        }
                      ]
                    }
                  ]
                },
                {
                  "name": "fail",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用失败的回调函数",
                  "parameters": []
                },
                {
                  "name": "complete",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用结束的回调函数（调用成功、失败都会执行）",
                  "parameters": []
                }
              ]
            }
          ],
          "desc": "获取屏幕亮度。"
        },
        {
          "type": "function",
          "name": "getSetting",
          "parameters": [
            {
              "type": "object",
              "name": "object",
              "members": [
                {
                  "name": "success",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用成功的回调函数，返回内容详见返回参数说明。",
                  "parameters": [
                    {
                      "type": "object",
                      "name": "result",
                      "members": [
                        {
                          "name": "authSetting",
                          "type": "object",
                          "desc": "用户授权结果，其中 key 为 scope 值，value 为 Bool 值，表示用户是否允许授权，详见 [scope 列表](./authorize.md#scope-列表)"
                        }
                      ]
                    }
                  ]
                },
                {
                  "name": "fail",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用失败的回调函数",
                  "parameters": []
                },
                {
                  "name": "complete",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用结束的回调函数（调用成功、失败都会执行）",
                  "parameters": []
                }
              ]
            }
          ],
          "desc": "获取用户的当前设置"
        },
        {
          "type": "function",
          "name": "getShareInfo",
          "parameters": [
            {
              "type": "object",
              "name": "object",
              "members": [
                {
                  "name": "shareTicket",
                  "type": "string",
                  "must": true,
                  "desc": "shareTicket"
                },
                {
                  "name": "success",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用成功的回调函数",
                  "parameters": [
                    {
                      "type": "object",
                      "name": "result",
                      "members": [
                        {
                          "name": "errMsg",
                          "type": "string",
                          "desc": "错误信息"
                        },
                        {
                          "name": "encryptedData",
                          "type": "string",
                          "desc": "包括敏感数据在内的完整转发信息的加密数据，详细见[加密数据解密算法](./signature.md#加密数据解密算法)"
                        },
                        {
                          "name": "iv",
                          "type": "string",
                          "desc": "加密算法的初始向量，详细见[加密数据解密算法](./signature.md#加密数据解密算法)"
                        }
                      ]
                    }
                  ]
                },
                {
                  "name": "fail",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用失败的回调函数",
                  "parameters": []
                },
                {
                  "name": "complete",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用结束的回调函数（调用成功、失败都会执行）",
                  "parameters": []
                }
              ]
            }
          ],
          "desc": "获取转发详细信息"
        },
        {
          "type": "function",
          "name": "getStorage",
          "parameters": [
            {
              "type": "object",
              "name": "object",
              "members": [
                {
                  "name": "key",
                  "type": "string",
                  "must": true,
                  "desc": "本地缓存中的指定的 key"
                },
                {
                  "name": "success",
                  "type": "function",
                  "must": true,
                  "desc": "接口调用的回调函数,res = {data: key对应的内容}",
                  "parameters": [
                    {
                      "type": "object",
                      "name": "result",
                      "members": [
                        {
                          "name": "data",
                          "type": "string",
                          "desc": "key对应的内容"
                        }
                      ]
                    }
                  ]
                },
                {
                  "name": "fail",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用失败的回调函数",
                  "parameters": []
                },
                {
                  "name": "complete",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用结束的回调函数（调用成功、失败都会执行）",
                  "parameters": []
                }
              ]
            }
          ],
          "desc": "从本地缓存中异步获取指定 key 对应的内容。"
        },
        {
          "type": "function",
          "name": "getStorageInfo",
          "parameters": [
            {
              "type": "object",
              "name": "object",
              "members": [
                {
                  "name": "success",
                  "type": "function",
                  "must": true,
                  "desc": "接口调用的回调函数，详见返回参数说明",
                  "parameters": [
                    {
                      "type": "object",
                      "name": "result",
                      "members": [
                        {
                          "name": "keys",
                          "type": "string[]",
                          "desc": "当前storage中所有的key"
                        },
                        {
                          "name": "currentSize",
                          "type": "number",
                          "desc": "当前占用的空间大小, 单位kb"
                        },
                        {
                          "name": "limitSize",
                          "type": "number",
                          "desc": "限制的空间大小，单位kb"
                        }
                      ]
                    }
                  ]
                },
                {
                  "name": "fail",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用失败的回调函数",
                  "parameters": []
                },
                {
                  "name": "complete",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用结束的回调函数（调用成功、失败都会执行）",
                  "parameters": []
                }
              ]
            }
          ],
          "desc": "异步获取当前storage的相关信息"
        },
        {
          "type": "function",
          "name": "getStorageInfoSync",
          "parameters": [],
          "desc": "同步获取当前storage的相关信息"
        },
        {
          "type": "function",
          "name": "getStorageSync",
          "parameters": [
            {
              "name": "key",
              "type": "string",
              "desc": "本地缓存中的指定的 key"
            }
          ],
          "desc": "从本地缓存中同步获取指定 key 对应的内容。"
        },
        {
          "type": "function",
          "name": "getSystemInfo",
          "parameters": [
            {
              "type": "object",
              "name": "object",
              "members": [
                {
                  "name": "success",
                  "type": "function",
                  "must": true,
                  "desc": "接口调用成功的回调",
                  "parameters": [
                    {
                      "type": "object",
                      "name": "result",
                      "members": [
                        {
                          "name": "model",
                          "desc": "手机型号"
                        },
                        {
                          "name": "pixelRatio",
                          "desc": "设备像素比"
                        },
                        {
                          "name": "screenWidth",
                          "desc": "屏幕宽度"
                        },
                        {
                          "name": "screenHeight",
                          "desc": "屏幕高度"
                        },
                        {
                          "name": "windowWidth",
                          "desc": "可使用窗口宽度"
                        },
                        {
                          "name": "windowHeight",
                          "desc": "可使用窗口高度"
                        },
                        {
                          "name": "language",
                          "desc": "微信设置的语言"
                        },
                        {
                          "name": "version",
                          "desc": "微信版本号"
                        },
                        {
                          "name": "system",
                          "desc": "操作系统版本"
                        },
                        {
                          "name": "platform",
                          "desc": "客户端平台"
                        },
                        {
                          "name": "SDKVersion",
                          "desc": "客户端基础库版本"
                        }
                      ]
                    }
                  ]
                },
                {
                  "name": "fail",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用失败的回调函数",
                  "parameters": []
                },
                {
                  "name": "complete",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用结束的回调函数（调用成功、失败都会执行）",
                  "parameters": []
                }
              ]
            }
          ],
          "desc": "获取系统信息。"
        },
        {
          "type": "function",
          "name": "getSystemInfoSync",
          "parameters": [],
          "desc": "获取系统信息同步接口",
          "return": {
            "type": "object",
            "name": "object",
            "members": [
              {
                "name": "model",
                "desc": "手机型号"
              },
              {
                "name": "pixelRatio",
                "desc": "设备像素比"
              },
              {
                "name": "screenWidth",
                "desc": "屏幕宽度"
              },
              {
                "name": "screenHeight",
                "desc": "屏幕高度"
              },
              {
                "name": "windowWidth",
                "desc": "可使用窗口宽度"
              },
              {
                "name": "windowHeight",
                "desc": "可使用窗口高度"
              },
              {
                "name": "language",
                "desc": "微信设置的语言"
              },
              {
                "name": "version",
                "desc": "微信版本号"
              },
              {
                "name": "system",
                "desc": "操作系统版本"
              },
              {
                "name": "platform",
                "desc": "客户端平台"
              },
              {
                "name": "SDKVersion",
                "desc": "客户端基础库版本"
              }
            ]
          }
        },
        {
          "type": "function",
          "name": "getUserInfo",
          "parameters": [
            {
              "type": "object",
              "name": "object",
              "members": [
                {
                  "name": "withCredentials",
                  "type": "boolean",
                  "must": false,
                  "desc": "是否带上登录态信息"
                },
                {
                  "name": "lang",
                  "type": "string",
                  "must": false,
                  "desc": "指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文"
                },
                {
                  "name": "success",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用成功的回调函数",
                  "parameters": [
                    {
                      "type": "object",
                      "name": "result",
                      "members": [
                        {
                          "name": "userInfo",
                          "type": "object",
                          "desc": "用户信息对象，不包含 openid 等敏感信息"
                        },
                        {
                          "name": "rawData",
                          "type": "string",
                          "desc": "不包括敏感信息的原始数据字符串，用于计算签名。"
                        },
                        {
                          "name": "signature",
                          "type": "string",
                          "desc": "使用 sha1( rawData + sessionkey ) 得到字符串，用于校验用户信息，参考文档 [signature](./signature.md)。"
                        },
                        {
                          "name": "encryptedData",
                          "type": "string",
                          "desc": "包括敏感数据在内的完整用户信息的加密数据，详细见[加密数据解密算法](./signature.md#加密数据解密算法)"
                        },
                        {
                          "name": "iv",
                          "type": "string",
                          "desc": "加密算法的初始向量，详细见[加密数据解密算法](./signature.md#加密数据解密算法)"
                        }
                      ]
                    }
                  ]
                },
                {
                  "name": "fail",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用失败的回调函数",
                  "parameters": []
                },
                {
                  "name": "complete",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用结束的回调函数（调用成功、失败都会执行）",
                  "parameters": []
                }
              ]
            }
          ],
          "desc": "获取用户信息，需要先调用 [wx.login](./api-login.md#wxloginobject) 接口。"
        },
        {
          "type": "function",
          "name": "getWeRunData",
          "parameters": [
            {
              "type": "object",
              "name": "object",
              "members": [
                {
                  "name": "success",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用成功的回调函数",
                  "parameters": [
                    {
                      "type": "object",
                      "name": "result",
                      "members": [
                        {
                          "name": "errMsg",
                          "type": "string",
                          "desc": "调用结果"
                        },
                        {
                          "name": "encryptedData",
                          "type": "string",
                          "desc": "包括敏感数据在内的完整用户信息的加密数据，详细见[加密数据解密算法](./signature.md#加密数据解密算法)"
                        },
                        {
                          "name": "iv",
                          "type": "string",
                          "desc": "加密算法的初始向量，详细见[加密数据解密算法](./signature.md#加密数据解密算法)"
                        }
                      ]
                    }
                  ]
                },
                {
                  "name": "fail",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用失败的回调函数",
                  "parameters": []
                },
                {
                  "name": "complete",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用结束的回调函数（调用成功、失败都会执行）",
                  "parameters": []
                }
              ]
            }
          ],
          "desc": "获取用户过去三十天微信运动步数，需要先调用 [wx.login](./api-login.md#wxloginobject) 接口。"
        },
        {
          "type": "function",
          "name": "hideLoading",
          "parameters": [],
          "desc": "隐藏 loading 提示框"
        },
        {
          "type": "function",
          "name": "hideNavigationBarLoading",
          "parameters": [],
          "desc": "隐藏导航条加载动画。"
        },
        {
          "type": "function",
          "name": "hideShareMenu",
          "parameters": [
            {
              "type": "object",
              "name": "object",
              "members": [
                {
                  "name": "success",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用成功的回调函数",
                  "parameters": []
                },
                {
                  "name": "fail",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用失败的回调函数",
                  "parameters": []
                },
                {
                  "name": "complete",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用结束的回调函数（调用成功、失败都会执行）",
                  "parameters": []
                }
              ]
            }
          ],
          "desc": "隐藏转发按钮"
        },
        {
          "type": "function",
          "name": "hideToast",
          "parameters": [],
          "desc": "隐藏消息提示框"
        },
        {
          "type": "function",
          "name": "login",
          "parameters": [
            {
              "type": "object",
              "name": "object",
              "members": [
                {
                  "name": "success",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用成功的回调函数",
                  "parameters": [
                    {
                      "type": "object",
                      "name": "result",
                      "members": [
                        {
                          "name": "errMsg",
                          "type": "string",
                          "desc": "调用结果"
                        },
                        {
                          "name": "code",
                          "type": "string",
                          "desc": "用户允许登录后，回调内容会带上 code（有效期五分钟），开发者需要将 code 发送到开发者服务器后台，使用`code 换取 session_key` api，将 code 换成 openid 和 session_key"
                        }
                      ]
                    }
                  ]
                },
                {
                  "name": "fail",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用失败的回调函数",
                  "parameters": []
                },
                {
                  "name": "complete",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用结束的回调函数（调用成功、失败都会执行）",
                  "parameters": []
                }
              ]
            }
          ],
          "desc": "调用接口获取**登录凭证（code）**进而换取用户登录态信息，包括用户的**唯一标识（openid）** 及本次登录的 **会话密钥（session_key）**。**用户数据的加解密通讯**需要依赖会话密钥完成。"
        },
        {
          "type": "function",
          "name": "makePhoneCall",
          "parameters": [
            {
              "type": "object",
              "name": "object",
              "members": [
                {
                  "name": "phoneNumber",
                  "type": "string",
                  "must": true,
                  "desc": "需要拨打的电话号码"
                },
                {
                  "name": "success",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用成功的回调",
                  "parameters": []
                },
                {
                  "name": "fail",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用失败的回调函数",
                  "parameters": []
                },
                {
                  "name": "complete",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用结束的回调函数（调用成功、失败都会执行）",
                  "parameters": []
                }
              ]
            }
          ],
          "desc": "wx.makePhoneCall({"
        },
        {
          "type": "function",
          "name": "navigateBack",
          "parameters": [
            {
              "type": "object",
              "name": "object",
              "members": [
                {
                  "name": "delta",
                  "type": "number",
                  "default": "1",
                  "desc": "返回的页面数，如果 delta 大于现有页面数，则返回到首页。"
                }
              ]
            }
          ],
          "desc": "关闭当前页面，返回上一页面或多级页面。可通过 [`getCurrentPages()`](../framework/app-service/page.md#getCurrentPages()) 获取当前的页面栈，决定需要返回几层。"
        },
        {
          "type": "function",
          "name": "navigateBackMiniProgram",
          "parameters": [
            {
              "type": "object",
              "name": "object",
              "members": [
                {
                  "name": "extraData",
                  "type": "object",
                  "must": false,
                  "desc": "需要返回给上一个小程序的数据，上一个小程序可在 `App.onShow()` 中获取到这份数据。[详情](../framework/app-service/app.md)"
                },
                {
                  "name": "success",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用成功的回调函数",
                  "parameters": [
                    {
                      "type": "object",
                      "name": "result",
                      "members": [
                        {
                          "name": "errMsg",
                          "type": "string",
                          "desc": "调用结果"
                        }
                      ]
                    }
                  ]
                },
                {
                  "name": "fail",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用失败的回调函数",
                  "parameters": []
                },
                {
                  "name": "complete",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用结束的回调函数（调用成功、失败都会执行）",
                  "parameters": []
                }
              ]
            }
          ],
          "desc": "返回到上一个小程序，只有在当前小程序是被其他小程序打开时可以调用成功"
        },
        {
          "type": "function",
          "name": "navigateTo",
          "parameters": [
            {
              "type": "object",
              "name": "object",
              "members": [
                {
                  "name": "url",
                  "type": "string",
                  "must": true,
                  "desc": "需要跳转的应用内非 tabBar 的页面的路径 , 路径后可以带参数。参数与路径之间使用`?`分隔，参数键与参数值用`=`相连，不同参数用`&`分隔；如 'path?key=value&key2=value2'"
                },
                {
                  "name": "success",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用成功的回调函数",
                  "parameters": []
                },
                {
                  "name": "fail",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用失败的回调函数",
                  "parameters": []
                },
                {
                  "name": "complete",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用结束的回调函数（调用成功、失败都会执行）",
                  "parameters": []
                }
              ]
            }
          ],
          "desc": "保留当前页面，跳转到应用内的某个页面，使用`wx.navigateBack`可以返回到原页面。"
        },
        {
          "type": "function",
          "name": "navigateToMiniProgram",
          "parameters": [
            {
              "type": "object",
              "name": "object",
              "members": [
                {
                  "name": "appId",
                  "type": "string",
                  "must": true,
                  "desc": "要打开的小程序 appId"
                },
                {
                  "name": "path",
                  "type": "string",
                  "must": false,
                  "desc": "打开的页面路径，如果为空则打开首页"
                },
                {
                  "name": "extraData",
                  "type": "object",
                  "must": false,
                  "desc": "需要传递给目标小程序的数据，目标小程序可在 `App.onLaunch()`，`App.onShow()` 中获取到这份数据。[详情](../framework/app-service/app.md)"
                },
                {
                  "name": "envVersion",
                  "type": "string",
                  "must": false,
                  "desc": "要打开的小程序版本，有效值 develop（开发版），trial（体验版），release（正式版） ，仅在当前小程序为开发版或体验版时此参数有效；如果当前小程序是体验版或正式版，则打开的小程序必定是正式版。默认值 release"
                },
                {
                  "name": "success",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用成功的回调函数",
                  "parameters": [
                    {
                      "type": "object",
                      "name": "result",
                      "members": [
                        {
                          "name": "errMsg",
                          "type": "string",
                          "desc": "调用结果"
                        }
                      ]
                    }
                  ]
                },
                {
                  "name": "fail",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用失败的回调函数",
                  "parameters": []
                },
                {
                  "name": "complete",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用结束的回调函数（调用成功、失败都会执行）",
                  "parameters": []
                }
              ]
            }
          ],
          "desc": "打开同一公众号下关联的另一个小程序。"
        },
        {
          "type": "function",
          "name": "notifyBLECharacteristicValueChange",
          "parameters": [
            {
              "type": "object",
              "name": "object",
              "members": [
                {
                  "name": "deviceId",
                  "type": "string",
                  "must": true,
                  "desc": "蓝牙设备 id，参考 device 对象"
                },
                {
                  "name": "serviceId",
                  "type": "string",
                  "must": true,
                  "desc": "蓝牙特征值对应服务的 uuid"
                },
                {
                  "name": "characteristicId",
                  "type": "string",
                  "must": true,
                  "desc": "蓝牙特征值的 uuid"
                },
                {
                  "name": "state",
                  "type": "boolean",
                  "must": true,
                  "desc": "true: 启用 notify; false: 停用 notify"
                },
                {
                  "name": "success",
                  "type": "function",
                  "must": true,
                  "desc": "成功则返回本机蓝牙适配器状态",
                  "parameters": [
                    {
                      "type": "object",
                      "name": "result",
                      "members": [
                        {
                          "name": "errMsg",
                          "type": "string",
                          "desc": "成功：ok，错误：详细信息"
                        }
                      ]
                    }
                  ]
                },
                {
                  "name": "fail",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用失败的回调函数",
                  "parameters": []
                },
                {
                  "name": "complete",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用结束的回调函数（调用成功、失败都会执行）",
                  "parameters": []
                }
              ]
            }
          ],
          "desc": "启用低功耗蓝牙设备特征值变化时的 notify 功能。注意：必须设备的特征值支持`notify`才可以成功调用，具体参照 characteristic 的 properties 属性"
        },
        {
          "type": "function",
          "name": "onAccelerometerChange",
          "parameters": [
            {
              "type": "function",
              "name": "callback",
              "parameters": [
                {
                  "type": "object",
                  "name": "result",
                  "members": [
                    {
                      "name": "x",
                      "type": "number",
                      "desc": "X 轴"
                    },
                    {
                      "name": "y",
                      "type": "number",
                      "desc": "Y 轴"
                    },
                    {
                      "name": "z",
                      "type": "number",
                      "desc": "Z 轴"
                    }
                  ]
                }
              ]
            }
          ],
          "desc": "监听加速度数据，频率：5次/秒，接口调用后会自动开始监听，可使用 `wx.stopAccelerometer` 停止监听。"
        },
        {
          "type": "function",
          "name": "onBLECharacteristicValueChange",
          "parameters": [
            {
              "type": "function",
              "name": "callback",
              "parameters": [
                {
                  "type": "object",
                  "name": "result",
                  "members": [
                    {
                      "name": "deviceId",
                      "type": "string",
                      "desc": "蓝牙设备 id，参考 device 对象"
                    },
                    {
                      "name": "serviceId",
                      "type": "string",
                      "desc": "特征值所属服务 uuid"
                    },
                    {
                      "name": "characteristicId",
                      "type": "string",
                      "desc": "特征值 uuid"
                    },
                    {
                      "name": "value",
                      "type": "string[]",
                      "desc": "特征值最新的值**（注意：vConsole 无法打印出 ArrayBuffer 类型数据）**"
                    }
                  ]
                }
              ]
            }
          ],
          "desc": "监听低功耗蓝牙设备的特征值变化。必须先启用`notify`接口才能接收到设备推送的notification。"
        },
        {
          "type": "function",
          "name": "onBLEConnectionStateChange",
          "parameters": [
            {
              "type": "function",
              "name": "callback",
              "parameters": [
                {
                  "type": "object",
                  "name": "result",
                  "members": [
                    {
                      "name": "deviceId",
                      "type": "string",
                      "desc": "蓝牙设备 id，参考 device 对象"
                    },
                    {
                      "name": "connected",
                      "type": "boolean",
                      "desc": "连接目前的状态"
                    }
                  ]
                }
              ]
            }
          ],
          "desc": "监听低功耗蓝牙连接的错误事件，包括设备丢失，连接异常断开等等。"
        },
        {
          "type": "function",
          "name": "onBackgroundAudioPause",
          "parameters": [
            {
              "type": "string",
              "name": "callback"
            }
          ],
          "desc": "监听音乐暂停。"
        },
        {
          "type": "function",
          "name": "onBackgroundAudioPlay",
          "parameters": [
            {
              "type": "string",
              "name": "callback"
            }
          ],
          "desc": "监听音乐播放。"
        },
        {
          "type": "function",
          "name": "onBackgroundAudioStop",
          "parameters": [
            {
              "type": "string",
              "name": "callback"
            }
          ],
          "desc": "监听音乐停止。"
        },
        {
          "type": "function",
          "name": "onBeaconServiceChange",
          "parameters": [
            {
              "type": "function",
              "name": "callback",
              "parameters": [
                {
                  "type": "object",
                  "name": "result",
                  "members": [
                    {
                      "name": "available",
                      "type": "boolean",
                      "desc": "服务目前是否可用"
                    },
                    {
                      "name": "discovering",
                      "type": "boolean",
                      "desc": "目前是否处于搜索状态"
                    }
                  ]
                }
              ]
            }
          ],
          "desc": "监听 `iBeacon` 服务的状态变化"
        },
        {
          "type": "function",
          "name": "onBeaconUpdate",
          "parameters": [
            {
              "type": "function",
              "name": "callback",
              "parameters": [
                {
                  "type": "object",
                  "name": "result",
                  "members": [
                    {
                      "name": "beacons",
                      "type": "object[]",
                      "desc": "当前搜寻到的所有 iBeacon 设备列表"
                    }
                  ]
                }
              ]
            }
          ],
          "desc": "监听 `iBeacon` 设备的更新事件"
        },
        {
          "type": "function",
          "name": "onBluetoothAdapterStateChange",
          "parameters": [
            {
              "type": "function",
              "name": "callback",
              "parameters": [
                {
                  "type": "object",
                  "name": "result",
                  "members": [
                    {
                      "name": "available",
                      "type": "boolean",
                      "desc": "蓝牙适配器是否可用"
                    },
                    {
                      "name": "discovering",
                      "type": "boolean",
                      "desc": "蓝牙适配器是否处于搜索状态"
                    }
                  ]
                }
              ]
            }
          ],
          "desc": "监听蓝牙适配器状态变化事件"
        },
        {
          "type": "function",
          "name": "onBluetoothDeviceFound",
          "parameters": [
            {
              "type": "function",
              "name": "callback",
              "parameters": [
                {
                  "type": "object",
                  "name": "result",
                  "members": [
                    {
                      "name": "devices",
                      "type": "string[]",
                      "desc": "新搜索到的设备列表"
                    }
                  ]
                }
              ]
            }
          ],
          "desc": "监听寻找到新设备的事件"
        },
        {
          "type": "function",
          "name": "onCompassChange",
          "parameters": [
            {
              "type": "function",
              "name": "callback",
              "parameters": [
                {
                  "type": "object",
                  "name": "result",
                  "members": [
                    {
                      "name": "direction",
                      "type": "number",
                      "desc": "面对的方向度数"
                    }
                  ]
                }
              ]
            }
          ],
          "desc": "监听罗盘数据，频率：5次/秒，接口调用后会自动开始监听，可使用`wx.stopCompass`停止监听。"
        },
        {
          "type": "function",
          "name": "onNetworkStatusChange",
          "parameters": [
            {
              "type": "function",
              "name": "callback",
              "parameters": [
                {
                  "type": "object",
                  "name": "result",
                  "members": [
                    {
                      "name": "isConnected",
                      "type": "boolean",
                      "desc": "当前是否有网络连接"
                    },
                    {
                      "name": "networkType",
                      "type": "string",
                      "desc": "网络类型"
                    }
                  ]
                }
              ]
            }
          ],
          "desc": "监听网络状态变化。"
        },
        {
          "type": "function",
          "name": "onSocketClose",
          "parameters": [
            {
              "type": "string",
              "name": "callback"
            }
          ],
          "desc": "监听WebSocket关闭。"
        },
        {
          "type": "function",
          "name": "onSocketError",
          "parameters": [
            {
              "type": "string",
              "name": "callback"
            }
          ],
          "desc": "监听WebSocket错误。"
        },
        {
          "type": "function",
          "name": "onSocketMessage",
          "parameters": [
            {
              "type": "function",
              "name": "callback",
              "parameters": [
                {
                  "type": "object",
                  "name": "result",
                  "members": [
                    {
                      "name": "data",
                      "type": "string[]",
                      "desc": "服务器返回的消息"
                    }
                  ]
                }
              ]
            }
          ],
          "desc": "监听WebSocket接受到服务器的消息事件。"
        },
        {
          "type": "function",
          "name": "onSocketOpen",
          "parameters": [
            {
              "type": "string",
              "name": "callback"
            }
          ],
          "desc": "监听WebSocket连接打开事件。"
        },
        {
          "type": "function",
          "name": "onUserCaptureScreen",
          "parameters": [
            {
              "type": "function",
              "name": "callback",
              "parameters": [
                {
                  "type": "object",
                  "name": "result",
                  "members": []
                }
              ]
            }
          ],
          "desc": "监听用户主动截屏事件，用户使用系统截屏按键截屏时触发此事件"
        },
        {
          "type": "function",
          "name": "openBluetoothAdapter",
          "parameters": [
            {
              "type": "object",
              "name": "object",
              "members": [
                {
                  "name": "success",
                  "type": "function",
                  "must": true,
                  "desc": "成功则返回成功初始化信息",
                  "parameters": []
                },
                {
                  "name": "fail",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用失败的回调函数",
                  "parameters": []
                },
                {
                  "name": "complete",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用结束的回调函数（调用成功、失败都会执行）",
                  "parameters": []
                }
              ]
            }
          ],
          "desc": "初始化蓝牙适配器"
        },
        {
          "type": "function",
          "name": "openCard",
          "parameters": [
            {
              "type": "object",
              "name": "object",
              "members": [
                {
                  "name": "cardList",
                  "type": "object[]",
                  "must": true,
                  "desc": "需要打开的卡券列表，列表内参数详见[openCard 请求对象说明](#opencard-请求对象说明)"
                },
                {
                  "name": "success",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用成功的回调函数",
                  "parameters": []
                },
                {
                  "name": "fail",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用失败的回调函数",
                  "parameters": []
                },
                {
                  "name": "complete",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用结束的回调函数（调用成功、失败都会执行）",
                  "parameters": []
                }
              ]
            }
          ],
          "desc": "查看微信卡包中的卡券。"
        },
        {
          "type": "function",
          "name": "openDocument",
          "parameters": [
            {
              "type": "object",
              "name": "object",
              "members": [
                {
                  "name": "filePath",
                  "desc": "文件路径，可通过 downFile 获得",
                  "must": true
                },
                {
                  "name": "fileType",
                  "desc": "文件类型，指定文件类型打开文件，有效值 doc, xls, ppt, pdf, docx, xlsx, pptx",
                  "must": false
                },
                {
                  "name": "success",
                  "desc": "接口调用成功的回调函数",
                  "must": false
                },
                {
                  "name": "fail",
                  "desc": "接口调用失败的回调函数",
                  "must": false
                },
                {
                  "name": "complete",
                  "desc": "接口调用结束的回调函数（调用成功、失败都会执行）",
                  "must": false
                }
              ]
            }
          ],
          "desc": "新开页面打开文档，支持格式：doc, xls, ppt, pdf, docx, xlsx, pptx"
        },
        {
          "type": "function",
          "name": "openLocation",
          "parameters": [
            {
              "type": "object",
              "name": "object",
              "members": [
                {
                  "name": "latitude",
                  "type": "float",
                  "must": true,
                  "desc": "纬度，范围为-90~90，负数表示南纬"
                },
                {
                  "name": "longitude",
                  "type": "float",
                  "must": true,
                  "desc": "经度，范围为-180~180，负数表示西经"
                },
                {
                  "name": "scale",
                  "type": "int",
                  "must": false,
                  "desc": "缩放比例，范围5~18，默认为18"
                },
                {
                  "name": "name",
                  "type": "string",
                  "must": false,
                  "desc": "位置名"
                },
                {
                  "name": "address",
                  "type": "string",
                  "must": false,
                  "desc": "地址的详细说明"
                },
                {
                  "name": "success",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用成功的回调函数",
                  "parameters": []
                },
                {
                  "name": "fail",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用失败的回调函数",
                  "parameters": []
                },
                {
                  "name": "complete",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用结束的回调函数（调用成功、失败都会执行）",
                  "parameters": []
                }
              ]
            }
          ],
          "desc": "​\t使用微信内置地图查看位置"
        },
        {
          "type": "function",
          "name": "openSetting",
          "parameters": [
            {
              "type": "object",
              "name": "object",
              "members": [
                {
                  "name": "success",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用成功的回调函数，返回内容详见返回参数说明。",
                  "parameters": [
                    {
                      "type": "object",
                      "name": "result",
                      "members": [
                        {
                          "name": "authSetting",
                          "type": "object",
                          "desc": "用户授权结果，其中 key 为 scope 值，value 为 Bool 值，表示用户是否允许授权，详见 [scope 列表](./authorize.md#scope-列表)"
                        }
                      ]
                    }
                  ]
                },
                {
                  "name": "fail",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用失败的回调函数",
                  "parameters": []
                },
                {
                  "name": "complete",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用结束的回调函数（调用成功、失败都会执行）",
                  "parameters": []
                }
              ]
            }
          ],
          "desc": "调起客户端小程序设置界面，返回用户设置的操作结果"
        },
        {
          "type": "function",
          "name": "pageScrollTo",
          "parameters": [
            {
              "type": "object",
              "name": "object",
              "members": [
                {
                  "name": "scrollTop",
                  "type": "number",
                  "must": true,
                  "desc": "滚动到页面的目标位置（单位px）"
                }
              ]
            }
          ],
          "desc": "将页面滚动到目标位置。"
        },
        {
          "type": "function",
          "name": "pauseBackgroundAudio",
          "parameters": [],
          "desc": "暂停播放音乐。"
        },
        {
          "type": "function",
          "name": "pauseVoice",
          "parameters": [],
          "desc": "暂停正在播放的语音。再次调用wx.playVoice播放同一个文件时，会从暂停处开始播放。如果想从头开始播放，需要先调用 wx.stopVoice。"
        },
        {
          "type": "function",
          "name": "playBackgroundAudio",
          "parameters": [
            {
              "type": "object",
              "name": "object",
              "members": [
                {
                  "name": "dataUrl",
                  "type": "string",
                  "must": true,
                  "desc": "音乐链接"
                },
                {
                  "name": "title",
                  "type": "string",
                  "must": false,
                  "desc": "音乐标题"
                },
                {
                  "name": "coverImgUrl",
                  "type": "string",
                  "must": false,
                  "desc": "封面URL"
                },
                {
                  "name": "success",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用成功的回调函数",
                  "parameters": []
                },
                {
                  "name": "fail",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用失败的回调函数",
                  "parameters": []
                },
                {
                  "name": "complete",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用结束的回调函数（调用成功、失败都会执行）",
                  "parameters": []
                }
              ]
            }
          ],
          "desc": "使用后台播放器播放音乐，对于微信客户端来说，只能同时有一个后台音乐在播放。当用户离开小程序后，音乐将暂停播放；当用户点击“显示在聊天顶部”时，音乐不会暂停播放；当用户在其他小程序占用了音乐播放器，原有小程序内的音乐将停止播放。"
        },
        {
          "type": "function",
          "name": "playVoice",
          "parameters": [
            {
              "type": "object",
              "name": "object",
              "members": [
                {
                  "name": "filePath",
                  "type": "string",
                  "must": true,
                  "desc": "需要播放的语音文件的文件路径"
                },
                {
                  "name": "success",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用成功的回调函数",
                  "parameters": []
                },
                {
                  "name": "fail",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用失败的回调函数",
                  "parameters": []
                },
                {
                  "name": "complete",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用结束的回调函数（调用成功、失败都会执行）",
                  "parameters": []
                }
              ]
            }
          ],
          "desc": "开始播放语音，同时只允许一个语音文件正在播放，如果前一个语音文件还没播放完，将中断前一个语音播放。"
        },
        {
          "type": "function",
          "name": "previewImage",
          "parameters": [
            {
              "type": "object",
              "name": "object",
              "members": [
                {
                  "name": "current",
                  "type": "string",
                  "must": false,
                  "desc": "当前显示图片的链接，不填则默认为 urls 的第一张"
                },
                {
                  "name": "urls",
                  "type": "string[]",
                  "must": true,
                  "desc": "需要预览的图片链接列表"
                },
                {
                  "name": "success",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用成功的回调函数",
                  "parameters": []
                },
                {
                  "name": "fail",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用失败的回调函数",
                  "parameters": []
                },
                {
                  "name": "complete",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用结束的回调函数（调用成功、失败都会执行）",
                  "parameters": []
                }
              ]
            }
          ],
          "desc": "预览图片。"
        },
        {
          "type": "function",
          "name": "reLaunch",
          "parameters": [
            {
              "type": "object",
              "name": "object",
              "members": [
                {
                  "name": "url",
                  "type": "string",
                  "must": true,
                  "desc": "需要跳转的应用内页面路径 , 路径后可以带参数。参数与路径之间使用`?`分隔，参数键与参数值用`=`相连，不同参数用`&`分隔；如 'path?key=value&key2=value2'，如果跳转的页面路径是 tabBar 页面则不能带参数"
                },
                {
                  "name": "success",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用成功的回调函数",
                  "parameters": []
                },
                {
                  "name": "fail",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用失败的回调函数",
                  "parameters": []
                },
                {
                  "name": "complete",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用结束的回调函数（调用成功、失败都会执行）",
                  "parameters": []
                }
              ]
            }
          ],
          "desc": "关闭所有页面，打开到应用内的某个页面。"
        },
        {
          "type": "function",
          "name": "readBLECharacteristicValue",
          "parameters": [
            {
              "type": "object",
              "name": "object",
              "members": [
                {
                  "name": "deviceId",
                  "type": "string",
                  "must": true,
                  "desc": "蓝牙设备 id，参考 device 对象"
                },
                {
                  "name": "serviceId",
                  "type": "string",
                  "must": true,
                  "desc": "蓝牙特征值对应服务的 uuid"
                },
                {
                  "name": "characteristicId",
                  "type": "string",
                  "must": true,
                  "desc": "蓝牙特征值的 uuid"
                },
                {
                  "name": "success",
                  "type": "function",
                  "must": true,
                  "desc": "成功则返回本机蓝牙适配器状态",
                  "parameters": [
                    {
                      "type": "object",
                      "name": "result",
                      "members": [
                        {
                          "name": "characteristic",
                          "type": "object",
                          "desc": "设备特征值信息"
                        },
                        {
                          "name": "errMsg",
                          "type": "string",
                          "desc": "成功：ok，错误：详细信息"
                        }
                      ]
                    }
                  ]
                },
                {
                  "name": "fail",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用失败的回调函数",
                  "parameters": []
                },
                {
                  "name": "complete",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用结束的回调函数（调用成功、失败都会执行）",
                  "parameters": []
                }
              ]
            }
          ],
          "desc": "读取低功耗蓝牙设备的特征值的二进制数据值。注意：必须设备的特征值支持`read`才可以成功调用，具体参照 characteristic 的 properties 属性"
        },
        {
          "type": "function",
          "name": "redirectTo",
          "parameters": [
            {
              "type": "object",
              "name": "object",
              "members": [
                {
                  "name": "url",
                  "type": "string",
                  "must": true,
                  "desc": "需要跳转的应用内非 tabBar 的页面的路径，路径后可以带参数。参数与路径之间使用`?`分隔，参数键与参数值用`=`相连，不同参数用`&`分隔；如 'path?key=value&key2=value2'"
                },
                {
                  "name": "success",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用成功的回调函数",
                  "parameters": []
                },
                {
                  "name": "fail",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用失败的回调函数",
                  "parameters": []
                },
                {
                  "name": "complete",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用结束的回调函数（调用成功、失败都会执行）",
                  "parameters": []
                }
              ]
            }
          ],
          "desc": "关闭当前页面，跳转到应用内的某个页面。"
        },
        {
          "type": "function",
          "name": "removeSavedFile",
          "parameters": [
            {
              "type": "object",
              "name": "object",
              "members": [
                {
                  "name": "filePath",
                  "type": "string",
                  "must": true,
                  "desc": "需要删除的文件路径"
                },
                {
                  "name": "success",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用成功的回调函数",
                  "parameters": []
                },
                {
                  "name": "fail",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用失败的回调函数",
                  "parameters": []
                },
                {
                  "name": "complete",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用结束的回调函数（调用成功、失败都会执行）",
                  "parameters": []
                }
              ]
            }
          ],
          "desc": "删除本地存储的文件"
        },
        {
          "type": "function",
          "name": "removeStorage",
          "parameters": [
            {
              "type": "object",
              "name": "object",
              "members": [
                {
                  "name": "key",
                  "type": "string",
                  "must": true,
                  "desc": "本地缓存中的指定的 key"
                },
                {
                  "name": "success",
                  "type": "function",
                  "must": true,
                  "desc": "接口调用的回调函数",
                  "parameters": []
                },
                {
                  "name": "fail",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用失败的回调函数",
                  "parameters": []
                },
                {
                  "name": "complete",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用结束的回调函数（调用成功、失败都会执行）",
                  "parameters": []
                }
              ]
            }
          ],
          "desc": "从本地缓存中异步移除指定 key 。"
        },
        {
          "type": "function",
          "name": "removeStorageSync",
          "parameters": [
            {
              "name": "key",
              "type": "string",
              "desc": "本地缓存中的指定的 key"
            }
          ],
          "desc": "从本地缓存中同步移除指定 key 。"
        },
        {
          "type": "function",
          "name": "reportAnalytics",
          "parameters": [
            {
              "type": "string",
              "name": "eventname"
            },
            {
              "type": "string",
              "name": "data"
            }
          ],
          "desc": "自定义分析数据上报接口。使用前，需要在小程序管理后台自定义分析中新建事件，配置好事件名与字段。"
        },
        {
          "type": "function",
          "name": "request",
          "parameters": [
            {
              "type": "object",
              "name": "object",
              "members": [
                {
                  "name": "url",
                  "type": "string",
                  "must": true,
                  "desc": "开发者服务器接口地址"
                },
                {
                  "name": "data",
                  "type": "object|string",
                  "must": false,
                  "desc": "请求的参数"
                },
                {
                  "name": "header",
                  "type": "object",
                  "must": false,
                  "desc": "设置请求的 header , header 中不能设置 Referer"
                },
                {
                  "name": "method",
                  "type": "string",
                  "must": false,
                  "desc": "默认为 GET，有效值：OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT"
                },
                {
                  "name": "dataType",
                  "type": "string",
                  "must": false,
                  "desc": "默认为 json。如果设置了 dataType 为 json，则会尝试对响应的数据做一次 JSON.parse"
                },
                {
                  "name": "success",
                  "type": "function",
                  "must": false,
                  "desc": "收到开发者服务成功返回的回调函数，res = {data: '开发者服务器返回的内容'}",
                  "parameters": [
                    {
                      "type": "object",
                      "name": "result",
                      "members": [
                        {
                          "name": "data",
                          "desc": "开发者服务器返回的数据"
                        },
                        {
                          "name": "statusCode",
                          "desc": "开发者服务器返回的状态码"
                        },
                        {
                          "name": "header",
                          "desc": "开发者服务器返回的 HTTP Response Header"
                        }
                      ]
                    }
                  ]
                },
                {
                  "name": "fail",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用失败的回调函数",
                  "parameters": []
                },
                {
                  "name": "complete",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用结束的回调函数（调用成功、失败都会执行）",
                  "parameters": []
                }
              ]
            }
          ],
          "desc": "最终发送给服务器的数据是 String 类型，如果传入的 data 不是 String 类型，会被转换成 String 。转换规则如下："
        },
        {
          "type": "function",
          "name": "requestPayment",
          "parameters": [
            {
              "type": "object",
              "name": "object",
              "members": [
                {
                  "name": "timeStamp",
                  "type": "string",
                  "must": true,
                  "desc": "时间戳从1970年1月1日00:00:00至今的秒数,即当前的时间"
                },
                {
                  "name": "nonceStr",
                  "type": "string",
                  "must": true,
                  "desc": "随机字符串，长度为32个字符以下。"
                },
                {
                  "name": "package",
                  "type": "string",
                  "must": true,
                  "desc": "统一下单接口返回的 prepay_id 参数值，提交格式如：prepay_id=***"
                },
                {
                  "name": "signType",
                  "type": "string",
                  "must": true,
                  "desc": "签名算法，暂支持 MD5"
                },
                {
                  "name": "paySign",
                  "type": "string",
                  "must": true,
                  "desc": "签名,具体签名方案参见[小程序支付接口文档](https://pay.weixin.qq.com/wiki/doc/api/wxa/wxa_api.php?chapter=7_7&index=3);"
                },
                {
                  "name": "success",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用成功的回调函数",
                  "parameters": []
                },
                {
                  "name": "fail",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用失败的回调函数",
                  "parameters": []
                },
                {
                  "name": "complete",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用结束的回调函数（调用成功、失败都会执行）",
                  "parameters": []
                }
              ]
            }
          ],
          "desc": "发起微信支付。"
        },
        {
          "type": "function",
          "name": "saveFile",
          "parameters": [
            {
              "type": "object",
              "name": "object",
              "members": [
                {
                  "name": "tempFilePath",
                  "type": "string",
                  "must": true,
                  "desc": "需要保存的文件的临时路径"
                },
                {
                  "name": "success",
                  "type": "function",
                  "must": false,
                  "desc": "返回文件的保存路径，res = {savedFilePath: '文件的保存路径'}",
                  "parameters": [
                    {
                      "type": "object",
                      "name": "result",
                      "members": [
                        {
                          "name": "savedFilePath",
                          "desc": "文件的保存路径"
                        }
                      ]
                    }
                  ]
                },
                {
                  "name": "fail",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用失败的回调函数",
                  "parameters": []
                },
                {
                  "name": "complete",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用结束的回调函数（调用成功、失败都会执行）",
                  "parameters": []
                }
              ]
            }
          ],
          "desc": "保存文件到本地。"
        },
        {
          "type": "function",
          "name": "saveImageToPhotosAlbum",
          "parameters": [
            {
              "type": "object",
              "name": "object",
              "members": [
                {
                  "name": "filePath",
                  "type": "string",
                  "must": true,
                  "desc": "图片文件路径，可以是临时文件路径也可以是永久文件路径，不支持网络图片路径"
                },
                {
                  "name": "success",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用成功的回调函数",
                  "parameters": [
                    {
                      "type": "object",
                      "name": "result",
                      "members": [
                        {
                          "name": "errMsg",
                          "type": "string",
                          "desc": "调用结果"
                        }
                      ]
                    }
                  ]
                },
                {
                  "name": "fail",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用失败的回调函数",
                  "parameters": []
                },
                {
                  "name": "complete",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用结束的回调函数（调用成功、失败都会执行）",
                  "parameters": []
                }
              ]
            }
          ],
          "desc": "保存图片到系统相册，需要用户授权（scope.writePhotosAlbum），详见 [用户授权](./authorize.md#wxauthorizeobject)"
        },
        {
          "type": "function",
          "name": "saveVideoToPhotosAlbum",
          "parameters": [
            {
              "type": "object",
              "name": "object",
              "members": [
                {
                  "name": "filePath",
                  "type": "string",
                  "must": true,
                  "desc": "视频文件路径，可以是临时文件路径也可以是永久文件路径"
                },
                {
                  "name": "success",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用成功的回调函数",
                  "parameters": [
                    {
                      "type": "object",
                      "name": "result",
                      "members": [
                        {
                          "name": "errMsg",
                          "type": "string",
                          "desc": "调用结果"
                        }
                      ]
                    }
                  ]
                },
                {
                  "name": "fail",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用失败的回调函数",
                  "parameters": []
                },
                {
                  "name": "complete",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用结束的回调函数（调用成功、失败都会执行）",
                  "parameters": []
                }
              ]
            }
          ],
          "desc": "保存视频到系统相册，需要用户授权（scope.writePhotosAlbum），详见 [用户授权](./authorize.md#wxauthorizeobject)"
        },
        {
          "type": "function",
          "name": "scanCode",
          "parameters": [
            {
              "type": "object",
              "name": "object",
              "members": [
                {
                  "name": "onlyFromCamera",
                  "type": "boolean",
                  "must": false,
                  "desc": "是否只能从相机扫码，不允许从相册选择图片"
                },
                {
                  "name": "success",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用成功的回调函数，返回内容详见返回参数说明。",
                  "parameters": [
                    {
                      "type": "object",
                      "name": "result",
                      "members": [
                        {
                          "name": "result",
                          "desc": "所扫码的内容"
                        },
                        {
                          "name": "scanType",
                          "desc": "所扫码的类型"
                        },
                        {
                          "name": "charSet",
                          "desc": "所扫码的字符集"
                        },
                        {
                          "name": "path",
                          "desc": "当所扫的码为当前小程序的合法二维码时，会返回此字段，内容为二维码携带的 path"
                        }
                      ]
                    }
                  ]
                },
                {
                  "name": "fail",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用失败的回调函数",
                  "parameters": []
                },
                {
                  "name": "complete",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用结束的回调函数（调用成功、失败都会执行）",
                  "parameters": []
                }
              ]
            }
          ],
          "desc": "调起客户端扫码界面，扫码成功后返回对应的结果"
        },
        {
          "type": "function",
          "name": "seekBackgroundAudio",
          "parameters": [
            {
              "type": "object",
              "name": "object",
              "members": [
                {
                  "name": "position",
                  "type": "number",
                  "must": true,
                  "desc": "音乐位置，单位：秒"
                },
                {
                  "name": "success",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用成功的回调函数",
                  "parameters": []
                },
                {
                  "name": "fail",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用失败的回调函数",
                  "parameters": []
                },
                {
                  "name": "complete",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用结束的回调函数（调用成功、失败都会执行）",
                  "parameters": []
                }
              ]
            }
          ],
          "desc": "控制音乐播放进度。"
        },
        {
          "type": "function",
          "name": "sendSocketMessage",
          "parameters": [
            {
              "type": "object",
              "name": "object",
              "members": [
                {
                  "name": "data",
                  "type": "string[]",
                  "must": true,
                  "desc": "需要发送的内容"
                },
                {
                  "name": "success",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用成功的回调函数",
                  "parameters": []
                },
                {
                  "name": "fail",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用失败的回调函数",
                  "parameters": []
                },
                {
                  "name": "complete",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用结束的回调函数（调用成功、失败都会执行）",
                  "parameters": []
                }
              ]
            }
          ],
          "desc": "通过 WebSocket 连接发送数据，需要先 [wx.connectSocket](#wxconnectsocketobject)，并在 [wx.onSocketOpen](#wxonsocketopencallback) 回调之后才能发送。"
        },
        {
          "type": "function",
          "name": "setClipboardData",
          "parameters": [
            {
              "type": "object",
              "name": "object",
              "members": [
                {
                  "name": "data",
                  "type": "string",
                  "must": true,
                  "desc": "需要设置的内容"
                },
                {
                  "name": "success",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用成功的回调函数",
                  "parameters": []
                },
                {
                  "name": "fail",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用失败的回调函数",
                  "parameters": []
                },
                {
                  "name": "complete",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用结束的回调函数（调用成功、失败都会执行）",
                  "parameters": []
                }
              ]
            }
          ],
          "desc": "设置系统剪贴板的内容"
        },
        {
          "type": "function",
          "name": "setEnableDebug",
          "parameters": [
            {
              "type": "object",
              "name": "object",
              "members": [
                {
                  "name": "enableDebug",
                  "type": "boolean",
                  "must": true,
                  "desc": "是否打开调试"
                },
                {
                  "name": "success",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用成功的回调函数",
                  "parameters": [
                    {
                      "type": "object",
                      "name": "result",
                      "members": [
                        {
                          "name": "errMsg",
                          "type": "string",
                          "desc": "调用结果"
                        }
                      ]
                    }
                  ]
                },
                {
                  "name": "fail",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用失败的回调函数",
                  "parameters": []
                },
                {
                  "name": "complete",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用结束的回调函数（调用成功、失败都会执行）",
                  "parameters": []
                }
              ]
            }
          ],
          "desc": "设置是否打开调试开关，此开关对正式版也能生效。"
        },
        {
          "type": "function",
          "name": "setKeepScreenOn",
          "parameters": [
            {
              "type": "object",
              "name": "object",
              "members": [
                {
                  "name": "keepScreenOn",
                  "type": "boolean",
                  "must": true,
                  "desc": "是否保持屏幕常亮"
                },
                {
                  "name": "success",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用成功的回调函数",
                  "parameters": [
                    {
                      "type": "object",
                      "name": "result",
                      "members": [
                        {
                          "name": "errMsg",
                          "type": "string",
                          "desc": "调用结果"
                        }
                      ]
                    }
                  ]
                },
                {
                  "name": "fail",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用失败的回调函数",
                  "parameters": []
                },
                {
                  "name": "complete",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用结束的回调函数（调用成功、失败都会执行）",
                  "parameters": []
                }
              ]
            }
          ],
          "desc": "设置是否保持常亮状态。仅在当前小程序生效，离开小程序后设置失效。"
        },
        {
          "type": "function",
          "name": "setNavigationBarColor",
          "parameters": [
            {
              "type": "object",
              "name": "object",
              "members": [
                {
                  "name": "frontColor",
                  "type": "string",
                  "must": true,
                  "desc": "前景颜色值，包括按钮、标题、状态栏的颜色，仅支持 #ffffff 和 #000000"
                },
                {
                  "name": "backgroundColor",
                  "type": "string",
                  "must": true,
                  "desc": "背景颜色值，有效值为十六进制颜色"
                },
                {
                  "name": "animation",
                  "type": "object",
                  "must": false,
                  "desc": "动画效果"
                },
                {
                  "name": "success",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用成功的回调函数",
                  "parameters": [
                    {
                      "type": "object",
                      "name": "result",
                      "members": [
                        {
                          "name": "errMsg",
                          "type": "string",
                          "desc": "调用结果"
                        }
                      ]
                    }
                  ]
                },
                {
                  "name": "fail",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用失败的回调函数",
                  "parameters": []
                },
                {
                  "name": "complete",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用结束的回调函数（调用成功、失败都会执行）",
                  "parameters": []
                }
              ]
            }
          ],
          "desc": "wx.setNavigationBarColor({"
        },
        {
          "type": "function",
          "name": "setNavigationBarTitle",
          "parameters": [
            {
              "type": "object",
              "name": "object",
              "members": [
                {
                  "name": "title",
                  "type": "string",
                  "must": true,
                  "desc": "页面标题"
                },
                {
                  "name": "success",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用成功的回调函数",
                  "parameters": []
                },
                {
                  "name": "fail",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用失败的回调函数",
                  "parameters": []
                },
                {
                  "name": "complete",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用结束的回调函数（调用成功、失败都会执行）",
                  "parameters": []
                }
              ]
            }
          ],
          "desc": "动态设置当前页面的标题。"
        },
        {
          "type": "function",
          "name": "setScreenBrightness",
          "parameters": [
            {
              "type": "object",
              "name": "object",
              "members": [
                {
                  "name": "value",
                  "type": "number",
                  "must": true,
                  "desc": "屏幕亮度值，范围 0~1，0 最暗，1 最亮"
                },
                {
                  "name": "success",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用成功",
                  "parameters": []
                },
                {
                  "name": "fail",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用失败的回调函数",
                  "parameters": []
                },
                {
                  "name": "complete",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用结束的回调函数（调用成功、失败都会执行）",
                  "parameters": []
                }
              ]
            }
          ],
          "desc": "设置屏幕亮度。"
        },
        {
          "type": "function",
          "name": "setStorage",
          "parameters": [
            {
              "type": "object",
              "name": "object",
              "members": [
                {
                  "name": "key",
                  "type": "string",
                  "must": true,
                  "desc": "本地缓存中的指定的 key"
                },
                {
                  "name": "data",
                  "type": "object|string",
                  "must": true,
                  "desc": "需要存储的内容"
                },
                {
                  "name": "success",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用成功的回调函数",
                  "parameters": []
                },
                {
                  "name": "fail",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用失败的回调函数",
                  "parameters": []
                },
                {
                  "name": "complete",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用结束的回调函数（调用成功、失败都会执行）",
                  "parameters": []
                }
              ]
            }
          ],
          "desc": "将数据存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个异步接口。"
        },
        {
          "type": "function",
          "name": "setStorageSync",
          "parameters": [
            {
              "name": "key",
              "type": "string",
              "desc": "本地缓存中的指定的 key"
            },
            {
              "name": "data",
              "type": "object|string",
              "desc": "需要存储的内容"
            }
          ],
          "desc": "将 data 存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个同步接口。"
        },
        {
          "type": "function",
          "name": "showActionSheet",
          "parameters": [
            {
              "type": "object",
              "name": "object",
              "members": [
                {
                  "name": "itemList",
                  "type": "string[]",
                  "must": true,
                  "desc": "按钮的文字数组，数组长度最大为6个"
                },
                {
                  "name": "itemColor",
                  "type": "hexcolor",
                  "must": false,
                  "desc": "按钮的文字颜色，默认为\"#000000\""
                },
                {
                  "name": "success",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用成功的回调函数，详见返回参数说明",
                  "parameters": [
                    {
                      "type": "object",
                      "name": "result",
                      "members": [
                        {
                          "name": "tapIndex",
                          "type": "number",
                          "desc": "用户点击的按钮，从上到下的顺序，从0开始"
                        }
                      ]
                    }
                  ]
                },
                {
                  "name": "fail",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用失败的回调函数",
                  "parameters": []
                },
                {
                  "name": "complete",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用结束的回调函数（调用成功、失败都会执行）",
                  "parameters": []
                }
              ]
            }
          ],
          "desc": "​显示操作菜单"
        },
        {
          "type": "function",
          "name": "showLoading",
          "parameters": [
            {
              "type": "object",
              "name": "object",
              "members": [
                {
                  "name": "title",
                  "type": "string",
                  "must": true,
                  "desc": "提示的内容"
                },
                {
                  "name": "mask",
                  "type": "boolean",
                  "must": false,
                  "desc": "是否显示透明蒙层，防止触摸穿透，默认：false"
                },
                {
                  "name": "success",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用成功的回调函数",
                  "parameters": []
                },
                {
                  "name": "fail",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用失败的回调函数",
                  "parameters": []
                },
                {
                  "name": "complete",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用结束的回调函数（调用成功、失败都会执行）",
                  "parameters": []
                }
              ]
            }
          ],
          "desc": "显示 loading 提示框, 需主动调用 [wx.hideLoading](#wxhideloading) 才能关闭提示框"
        },
        {
          "type": "function",
          "name": "showModal",
          "parameters": [
            {
              "type": "object",
              "name": "object",
              "members": [
                {
                  "name": "title",
                  "type": "string",
                  "must": true,
                  "desc": "提示的标题"
                },
                {
                  "name": "content",
                  "type": "string",
                  "must": true,
                  "desc": "提示的内容"
                },
                {
                  "name": "showCancel",
                  "type": "boolean",
                  "must": false,
                  "desc": "是否显示取消按钮，默认为 true"
                },
                {
                  "name": "cancelText",
                  "type": "string",
                  "must": false,
                  "desc": "取消按钮的文字，默认为\"取消\"，最多 4 个字符"
                },
                {
                  "name": "cancelColor",
                  "type": "hexcolor",
                  "must": false,
                  "desc": "取消按钮的文字颜色，默认为\"#000000\""
                },
                {
                  "name": "confirmText",
                  "type": "string",
                  "must": false,
                  "desc": "确定按钮的文字，默认为\"确定\"，最多 4 个字符"
                },
                {
                  "name": "confirmColor",
                  "type": "hexcolor",
                  "must": false,
                  "desc": "确定按钮的文字颜色，默认为\"#3CC51F\""
                },
                {
                  "name": "success",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用成功的回调函数",
                  "parameters": [
                    {
                      "type": "object",
                      "name": "result",
                      "members": [
                        {
                          "name": "confirm",
                          "type": "boolean",
                          "desc": "为 true 时，表示用户点击了确定按钮"
                        },
                        {
                          "name": "cancel",
                          "type": "boolean",
                          "desc": "为 true 时，表示用户点击了取消（用于 Android 系统区分点击蒙层关闭还是点击取消按钮关闭）"
                        }
                      ]
                    }
                  ]
                },
                {
                  "name": "fail",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用失败的回调函数",
                  "parameters": []
                },
                {
                  "name": "complete",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用结束的回调函数（调用成功、失败都会执行）",
                  "parameters": []
                }
              ]
            }
          ],
          "desc": "​显示模态弹窗"
        },
        {
          "type": "function",
          "name": "showNavigationBarLoading",
          "parameters": [],
          "desc": "在当前页面显示导航条加载动画。"
        },
        {
          "type": "function",
          "name": "showShareMenu",
          "parameters": [
            {
              "type": "object",
              "name": "object",
              "members": [
                {
                  "name": "withShareTicket",
                  "type": "boolean",
                  "must": false,
                  "desc": "是否使用带 shareTicket 的转发[详情](./share.md#获取更多转发信息)"
                },
                {
                  "name": "success",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用成功的回调函数",
                  "parameters": []
                },
                {
                  "name": "fail",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用失败的回调函数",
                  "parameters": []
                },
                {
                  "name": "complete",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用结束的回调函数（调用成功、失败都会执行）",
                  "parameters": []
                }
              ]
            }
          ],
          "desc": "显示当前页面的转发按钮"
        },
        {
          "type": "function",
          "name": "showToast",
          "parameters": [
            {
              "type": "object",
              "name": "object",
              "members": [
                {
                  "name": "title",
                  "type": "string",
                  "must": true,
                  "desc": "提示的内容"
                },
                {
                  "name": "icon",
                  "type": "string",
                  "must": false,
                  "desc": "图标，有效值 \"success\", \"loading\""
                },
                {
                  "name": "image",
                  "type": "string",
                  "must": false,
                  "desc": "自定义图标的本地路径，image 的优先级高于 icon"
                },
                {
                  "name": "duration",
                  "type": "number",
                  "must": false,
                  "desc": "提示的延迟时间，单位毫秒，默认：1500"
                },
                {
                  "name": "mask",
                  "type": "boolean",
                  "must": false,
                  "desc": "是否显示透明蒙层，防止触摸穿透，默认：false"
                },
                {
                  "name": "success",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用成功的回调函数",
                  "parameters": []
                },
                {
                  "name": "fail",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用失败的回调函数",
                  "parameters": []
                },
                {
                  "name": "complete",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用结束的回调函数（调用成功、失败都会执行）",
                  "parameters": []
                }
              ]
            }
          ],
          "desc": "显示消息提示框"
        },
        {
          "type": "function",
          "name": "startAccelerometer",
          "parameters": [
            {
              "type": "object",
              "name": "object",
              "members": [
                {
                  "name": "success",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用成功的回调函数",
                  "parameters": []
                },
                {
                  "name": "fail",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用失败的回调函数",
                  "parameters": []
                },
                {
                  "name": "complete",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用结束的回调函数（调用成功、失败都会执行）",
                  "parameters": []
                }
              ]
            }
          ],
          "desc": "开始监听加速度数据。"
        },
        {
          "type": "function",
          "name": "startBeaconDiscovery",
          "parameters": [
            {
              "type": "object",
              "name": "object",
              "members": [
                {
                  "name": "uuids",
                  "type": "string[]",
                  "must": true,
                  "desc": "iBeacon设备广播的 uuids"
                },
                {
                  "name": "success",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用成功的回调函数",
                  "parameters": [
                    {
                      "type": "object",
                      "name": "result",
                      "members": [
                        {
                          "name": "errMsg",
                          "type": "string",
                          "desc": "调用结果"
                        }
                      ]
                    }
                  ]
                },
                {
                  "name": "fail",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用失败的回调函数",
                  "parameters": []
                },
                {
                  "name": "complete",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用结束的回调函数（调用成功、失败都会执行）",
                  "parameters": []
                }
              ]
            }
          ],
          "desc": "开始搜索附近的`iBeacon`设备"
        },
        {
          "type": "function",
          "name": "startBluetoothDevicesDiscovery",
          "parameters": [
            {
              "type": "object",
              "name": "object",
              "members": [
                {
                  "name": "services",
                  "type": "string[]",
                  "must": false,
                  "desc": "蓝牙设备主 service 的 uuid 列表"
                },
                {
                  "name": "allowDuplicatesKey",
                  "type": "boolean",
                  "must": false,
                  "desc": "是否允许重复上报同一设备， 如果允许重复上报，则onDeviceFound 方法会多次上报同一设备，但是 RSSI 值会有不同"
                },
                {
                  "name": "interval",
                  "type": "integer",
                  "must": false,
                  "desc": "上报设备的间隔，默认为0，意思是找到新设备立即上报，否则根据传入的间隔上报"
                },
                {
                  "name": "success",
                  "type": "function",
                  "must": true,
                  "desc": "成功则返回本机蓝牙适配器状态",
                  "parameters": [
                    {
                      "type": "object",
                      "name": "result",
                      "members": [
                        {
                          "name": "errMsg",
                          "type": "string",
                          "desc": "成功：ok，错误：详细信息"
                        },
                        {
                          "name": "isDiscovering",
                          "type": "boolean",
                          "desc": "当前蓝牙适配器是否处于搜索状态"
                        }
                      ]
                    }
                  ]
                },
                {
                  "name": "fail",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用失败的回调函数",
                  "parameters": []
                },
                {
                  "name": "complete",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用结束的回调函数（调用成功、失败都会执行）",
                  "parameters": []
                }
              ]
            }
          ],
          "desc": "开始搜寻附近的蓝牙外围设备。注意，该操作比较耗费系统资源，请在搜索并连接到设备后调用 stop 方法停止搜索。"
        },
        {
          "type": "function",
          "name": "startCompass",
          "parameters": [
            {
              "type": "object",
              "name": "object",
              "members": [
                {
                  "name": "success",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用成功的回调函数",
                  "parameters": []
                },
                {
                  "name": "fail",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用失败的回调函数",
                  "parameters": []
                },
                {
                  "name": "complete",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用结束的回调函数（调用成功、失败都会执行）",
                  "parameters": []
                }
              ]
            }
          ],
          "desc": "开始监听罗盘数据。"
        },
        {
          "type": "function",
          "name": "startRecord",
          "parameters": [
            {
              "type": "object",
              "name": "object",
              "members": [
                {
                  "name": "success",
                  "type": "function",
                  "must": false,
                  "desc": "录音成功后调用，返回录音文件的临时文件路径，res = {tempFilePath: '录音文件的临时路径'}",
                  "parameters": [
                    {
                      "type": "object",
                      "name": "result",
                      "members": [
                        {
                          "name": "tempFilePath",
                          "desc": "录音文件的临时路径"
                        }
                      ]
                    }
                  ]
                },
                {
                  "name": "fail",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用失败的回调函数",
                  "parameters": []
                },
                {
                  "name": "complete",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用结束的回调函数（调用成功、失败都会执行）",
                  "parameters": []
                }
              ]
            }
          ],
          "desc": "开始录音。当主动调用`wx.stopRecord`，或者录音超过1分钟时自动结束录音，返回录音文件的临时文件路径。当用户离开小程序时，此接口无法调用。"
        },
        {
          "type": "function",
          "name": "stopAccelerometer",
          "parameters": [
            {
              "type": "object",
              "name": "object",
              "members": [
                {
                  "name": "success",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用成功的回调函数",
                  "parameters": []
                },
                {
                  "name": "fail",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用失败的回调函数",
                  "parameters": []
                },
                {
                  "name": "complete",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用结束的回调函数（调用成功、失败都会执行）",
                  "parameters": []
                }
              ]
            }
          ],
          "desc": "停止监听加速度数据。"
        },
        {
          "type": "function",
          "name": "stopBackgroundAudio",
          "parameters": [],
          "desc": "停止播放音乐。"
        },
        {
          "type": "function",
          "name": "stopBeaconDiscovery",
          "parameters": [
            {
              "type": "object",
              "name": "object",
              "members": [
                {
                  "name": "success",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用成功的回调函数",
                  "parameters": [
                    {
                      "type": "object",
                      "name": "result",
                      "members": [
                        {
                          "name": "errMsg",
                          "type": "string",
                          "desc": "调用结果"
                        }
                      ]
                    }
                  ]
                },
                {
                  "name": "fail",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用失败的回调函数",
                  "parameters": []
                },
                {
                  "name": "complete",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用结束的回调函数（调用成功、失败都会执行）",
                  "parameters": []
                }
              ]
            }
          ],
          "desc": "停止搜索附近的`iBeacon`设备"
        },
        {
          "type": "function",
          "name": "stopBluetoothDevicesDiscovery",
          "parameters": [
            {
              "type": "object",
              "name": "object",
              "members": [
                {
                  "name": "success",
                  "type": "function",
                  "must": true,
                  "desc": "成功则返回本机蓝牙适配器状态",
                  "parameters": [
                    {
                      "type": "object",
                      "name": "result",
                      "members": [
                        {
                          "name": "errMsg",
                          "type": "string",
                          "desc": "成功：ok，错误：详细信息"
                        }
                      ]
                    }
                  ]
                },
                {
                  "name": "fail",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用失败的回调函数",
                  "parameters": []
                },
                {
                  "name": "complete",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用结束的回调函数（调用成功、失败都会执行）",
                  "parameters": []
                }
              ]
            }
          ],
          "desc": "停止搜寻附近的蓝牙外围设备。请在确保找到需要连接的设备后调用该方法停止搜索。"
        },
        {
          "type": "function",
          "name": "stopCompass",
          "parameters": [
            {
              "type": "object",
              "name": "object",
              "members": [
                {
                  "name": "success",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用成功的回调函数",
                  "parameters": []
                },
                {
                  "name": "fail",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用失败的回调函数",
                  "parameters": []
                },
                {
                  "name": "complete",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用结束的回调函数（调用成功、失败都会执行）",
                  "parameters": []
                }
              ]
            }
          ],
          "desc": "停止监听罗盘数据。"
        },
        {
          "type": "function",
          "name": "stopPullDownRefresh",
          "parameters": [],
          "desc": "停止当前页面下拉刷新。"
        },
        {
          "type": "function",
          "name": "stopRecord",
          "parameters": [],
          "desc": "​\t主动调用停止录音。"
        },
        {
          "type": "function",
          "name": "stopVoice",
          "parameters": [],
          "desc": "结束播放语音。"
        },
        {
          "type": "function",
          "name": "switchTab",
          "parameters": [
            {
              "type": "object",
              "name": "object",
              "members": [
                {
                  "name": "url",
                  "type": "string",
                  "must": true,
                  "desc": "需要跳转的 tabBar 页面的路径（需在 app.json 的 [tabBar](../framework/config.md#tabbar) 字段定义的页面），路径后不能带参数"
                },
                {
                  "name": "success",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用成功的回调函数",
                  "parameters": []
                },
                {
                  "name": "fail",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用失败的回调函数",
                  "parameters": []
                },
                {
                  "name": "complete",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用结束的回调函数（调用成功、失败都会执行）",
                  "parameters": []
                }
              ]
            }
          ],
          "desc": "跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面"
        },
        {
          "type": "function",
          "name": "updateShareMenu",
          "parameters": [
            {
              "type": "object",
              "name": "object",
              "members": [
                {
                  "name": "withShareTicket",
                  "type": "boolean",
                  "must": false,
                  "desc": "是否使用带 shareTicket 的转发[详情](./share.md#获取更多转发信息)"
                },
                {
                  "name": "success",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用成功的回调函数",
                  "parameters": []
                },
                {
                  "name": "fail",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用失败的回调函数",
                  "parameters": []
                },
                {
                  "name": "complete",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用结束的回调函数（调用成功、失败都会执行）",
                  "parameters": []
                }
              ]
            }
          ],
          "desc": "更新转发属性"
        },
        {
          "type": "function",
          "name": "uploadFile",
          "parameters": [
            {
              "type": "object",
              "name": "object",
              "members": [
                {
                  "name": "url",
                  "type": "string",
                  "must": true,
                  "desc": "开发者服务器 url"
                },
                {
                  "name": "filePath",
                  "type": "string",
                  "must": true,
                  "desc": "要上传文件资源的路径"
                },
                {
                  "name": "name",
                  "type": "string",
                  "must": true,
                  "desc": "文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容"
                },
                {
                  "name": "header",
                  "type": "object",
                  "must": false,
                  "desc": "HTTP 请求 Header , header 中不能设置 Referer"
                },
                {
                  "name": "formData",
                  "type": "object",
                  "must": false,
                  "desc": "HTTP 请求中其他额外的 form data"
                },
                {
                  "name": "success",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用成功的回调函数",
                  "parameters": [
                    {
                      "type": "object",
                      "name": "result",
                      "members": [
                        {
                          "name": "data",
                          "type": "string",
                          "desc": "开发者服务器返回的数据"
                        },
                        {
                          "name": "statusCode",
                          "type": "number",
                          "desc": "HTTP状态码"
                        }
                      ]
                    }
                  ]
                },
                {
                  "name": "fail",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用失败的回调函数",
                  "parameters": []
                },
                {
                  "name": "complete",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用结束的回调函数（调用成功、失败都会执行）",
                  "parameters": []
                }
              ]
            }
          ],
          "desc": "将本地资源上传到开发者服务器。如页面通过 [wx.chooseImage](./media-picture.md#wxchooseimageobject) 等接口获取到一个本地资源的临时文件路径后，可通过此接口将本地资源上传到指定服务器。客户端发起一个 HTTPS POST 请求，其中 `content-type` 为 `multipart/form-data` 。"
        },
        {
          "type": "function",
          "name": "vibrateLong",
          "parameters": [
            {
              "type": "object",
              "name": "object",
              "members": [
                {
                  "name": "success",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用成功的回调函数",
                  "parameters": []
                },
                {
                  "name": "fail",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用失败的回调函数",
                  "parameters": []
                },
                {
                  "name": "complete",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用结束的回调函数（调用成功、失败都会执行）",
                  "parameters": []
                }
              ]
            }
          ],
          "desc": "使手机发生较长时间的振动（400ms）"
        },
        {
          "type": "function",
          "name": "vibrateShort",
          "parameters": [
            {
              "type": "object",
              "name": "object",
              "members": [
                {
                  "name": "success",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用成功的回调函数",
                  "parameters": []
                },
                {
                  "name": "fail",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用失败的回调函数",
                  "parameters": []
                },
                {
                  "name": "complete",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用结束的回调函数（调用成功、失败都会执行）",
                  "parameters": []
                }
              ]
            }
          ],
          "desc": "使手机发生较短时间的振动（15ms）"
        },
        {
          "type": "function",
          "name": "writeBLECharacteristicValue",
          "parameters": [
            {
              "type": "object",
              "name": "object",
              "members": [
                {
                  "name": "deviceId",
                  "type": "string",
                  "must": true,
                  "desc": "蓝牙设备 id，参考 device 对象"
                },
                {
                  "name": "serviceId",
                  "type": "string",
                  "must": true,
                  "desc": "蓝牙特征值对应服务的 uuid"
                },
                {
                  "name": "characteristicId",
                  "type": "string",
                  "must": true,
                  "desc": "蓝牙特征值的 uuid"
                },
                {
                  "name": "value",
                  "type": "string[]",
                  "must": true,
                  "desc": "蓝牙设备特征值对应的二进制值**（注意：vConsole 无法打印出 ArrayBuffer 类型数据）**"
                },
                {
                  "name": "success",
                  "type": "function",
                  "must": true,
                  "desc": "成功则返回本机蓝牙适配器状态",
                  "parameters": [
                    {
                      "type": "object",
                      "name": "result",
                      "members": [
                        {
                          "name": "errMsg",
                          "type": "string",
                          "desc": "成功：ok，错误：详细信息"
                        }
                      ]
                    }
                  ]
                },
                {
                  "name": "fail",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用失败的回调函数",
                  "parameters": []
                },
                {
                  "name": "complete",
                  "type": "function",
                  "must": false,
                  "desc": "接口调用结束的回调函数（调用成功、失败都会执行）",
                  "parameters": []
                }
              ]
            }
          ],
          "desc": "向低功耗蓝牙设备特征值中写入二进制数据。注意：必须设备的特征值支持`write`才可以成功调用，具体参照 characteristic 的 properties 属性"
        }
      ]
    },
    {
      "type": "object",
      "name": "canvasContext",
      "members": [
        {
          "type": "function",
          "name": "addColorStop",
          "parameters": [],
          "desc": "创建一个颜色的渐变点。"
        },
        {
          "type": "function",
          "name": "arc",
          "parameters": [],
          "desc": "画一条弧线。"
        },
        {
          "type": "function",
          "name": "beginPath",
          "parameters": [],
          "desc": "开始创建一个路径，需要调用fill或者stroke才会使用路径进行填充或描边。"
        },
        {
          "type": "function",
          "name": "bezierCurveTo",
          "parameters": [],
          "desc": "创建三次方贝塞尔曲线路径。"
        },
        {
          "type": "function",
          "name": "clearActions",
          "parameters": [],
          "desc": "清空绘图上下文的绘图动作。"
        },
        {
          "type": "function",
          "name": "clearRect",
          "parameters": [],
          "desc": "清除画布上在该矩形区域内的内容。"
        },
        {
          "type": "function",
          "name": "closePath",
          "parameters": [],
          "desc": "关闭一个路径"
        },
        {
          "type": "function",
          "name": "createCircularGradient",
          "parameters": [],
          "desc": "创建一个圆形的渐变颜色。"
        },
        {
          "type": "function",
          "name": "createLinearGradient",
          "parameters": [],
          "desc": "创建一个线性的渐变颜色。"
        },
        {
          "type": "function",
          "name": "draw",
          "parameters": [],
          "desc": "将之前在绘图上下文中的描述（路径、变形、样式）画到 canvas 中。"
        },
        {
          "type": "function",
          "name": "drawImage",
          "parameters": [],
          "desc": "绘制图像，图像保持原始尺寸。"
        },
        {
          "type": "function",
          "name": "fill",
          "parameters": [],
          "desc": "对当前路径中的内容进行填充。默认的填充色为黑色。"
        },
        {
          "type": "function",
          "name": "fillRect",
          "parameters": [],
          "desc": "填充一个矩形。"
        },
        {
          "type": "function",
          "name": "fillText",
          "parameters": [],
          "desc": "在画布上绘制被填充的文本。"
        },
        {
          "type": "function",
          "name": "lineTo",
          "parameters": [],
          "desc": "const ctx = wx.createCanvasContext('myCanvas')"
        },
        {
          "type": "function",
          "name": "moveTo",
          "parameters": [],
          "desc": "把路径移动到画布中的指定点，不创建线条。"
        },
        {
          "type": "function",
          "name": "quadraticCurveTo",
          "parameters": [],
          "desc": "创建二次贝塞尔曲线路径。"
        },
        {
          "type": "function",
          "name": "rect",
          "parameters": [],
          "desc": "创建一个矩形。"
        },
        {
          "type": "function",
          "name": "rotate",
          "parameters": [],
          "desc": "以原点为中心，原点可以用 [translate](#translate)方法修改。顺时针旋转当前坐标轴。多次调用`rotate`，旋转的角度会叠加。"
        },
        {
          "type": "function",
          "name": "save",
          "parameters": [],
          "desc": "保存当前的绘图上下文。"
        },
        {
          "type": "function",
          "name": "scale",
          "parameters": [],
          "desc": "在调用`scale`方法后，之后创建的路径其横纵坐标会被缩放。多次调用`scale`，倍数会相乘。"
        },
        {
          "type": "function",
          "name": "setFillStyle",
          "parameters": [],
          "desc": "设置填充色。"
        },
        {
          "type": "function",
          "name": "setFontSize",
          "parameters": [],
          "desc": "设置字体的字号。"
        },
        {
          "type": "function",
          "name": "setGlobalAlpha",
          "parameters": [],
          "desc": "设置全局画笔透明度。"
        },
        {
          "type": "function",
          "name": "setLineCap",
          "parameters": [],
          "desc": "设置线条的端点样式。"
        },
        {
          "type": "function",
          "name": "setLineJoin",
          "parameters": [],
          "desc": "设置线条的交点样式。"
        },
        {
          "type": "function",
          "name": "setLineWidth",
          "parameters": [],
          "desc": "设置线条的宽度。"
        },
        {
          "type": "function",
          "name": "setMiterLimit",
          "parameters": [],
          "desc": "设置最大斜接长度，斜接长度指的是在两条线交汇处内角和外角之间的距离。 当 `setLineJoin()` 为 miter 时才有效。超过最大倾斜长度的，连接处将以 lineJoin 为 bevel 来显示"
        },
        {
          "type": "function",
          "name": "setShadow",
          "parameters": [],
          "desc": "设置阴影样式。"
        },
        {
          "type": "function",
          "name": "setStrokeStyle",
          "parameters": [],
          "desc": "设置边框颜色。"
        },
        {
          "type": "function",
          "name": "setTextAlign",
          "parameters": [],
          "desc": "用于设置文字的对齐"
        },
        {
          "type": "function",
          "name": "setTextBaseline",
          "parameters": [],
          "desc": "用于设置文字的水平对齐"
        },
        {
          "type": "function",
          "name": "stroke",
          "parameters": [],
          "desc": "画出当前路径的边框。默认颜色色为黑色。"
        },
        {
          "type": "function",
          "name": "strokeRect",
          "parameters": [],
          "desc": "画一个矩形(非填充)。"
        },
        {
          "type": "function",
          "name": "translate",
          "parameters": [],
          "desc": "对当前坐标系的原点(0, 0)进行变换，默认的坐标系原点为页面左上角。"
        }
      ]
    }
  ],
  "global": {
    "wx": {
      "type": "wx",
      "name": "wx"
    },
    "App": {
      "type": "function",
      "name": "App",
      "desc": "App() 函数用来注册一个小程序。接受一个 object 参数，其指定小程序的生命周期函数等。",
      "parameters": [
        {
          "type": "object",
          "name": "options",
          "desc": "App 参数",
          "members": [
            {
              "type": "function",
              "name": "onLaunch",
              "desc": "当小程序初始化完成时，会触发 onLaunch（全局只触发一次）",
              "parameters": [
                {
                  "type": "object",
                  "name": "options",
                  "desc": "options",
                  "members": [
                    {
                      "type": "string",
                      "name": "path",
                      "desc": "打开小程序的路径"
                    },
                    {
                      "type": "object",
                      "name": "query",
                      "desc": "打开小程序的query"
                    },
                    {
                      "type": "number",
                      "name": "scene",
                      "desc": "打开小程序的场景值"
                    },
                    {
                      "type": "string",
                      "name": "shareTicket",
                      "desc": "shareTicket"
                    }
                  ]
                }
              ]
            },
            {
              "type": "function",
              "name": "onShow",
              "desc": "当小程序启动，或从后台进入前台显示，会触发 onShow",
              "parameters": [
                {
                  "type": "object",
                  "name": "options",
                  "desc": "options",
                  "members": [
                    {
                      "type": "string",
                      "name": "path",
                      "desc": "打开小程序的路径"
                    },
                    {
                      "type": "object",
                      "name": "query",
                      "desc": "打开小程序的query"
                    },
                    {
                      "type": "number",
                      "name": "scene",
                      "desc": "打开小程序的场景值"
                    },
                    {
                      "type": "string",
                      "name": "shareTicket",
                      "desc": "shareTicket"
                    }
                  ]
                }
              ]
            },
            {
              "type": "function",
              "name": "onHide",
              "desc": "当小程序从前台进入后台，会触发 onHide",
              "parameters": []
            },
            {
              "type": "function",
              "name": "onError",
              "desc": "当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息",
              "parameters": [
                {
                  "type": "string",
                  "name": "msg",
                  "desc": "错误信息"
                }
              ]
            }
          ]
        }
      ]
    },
    "getApp": {
      "type": "function",
      "name": "getApp",
      "desc": "获取小程序实例",
      "parameters": []
    },
    "Page": {
      "type": "function",
      "name": "Page",
      "desc": "Page() 函数用来注册一个页面。接受一个 object 参数，其指定页面的初始数据、生命周期函数、事件处理函数等。",
      "parameters": [
        {
          "type": "object",
          "name": "options",
          "desc": "options",
          "members": [
            {
              "type": "object",
              "name": "data",
              "desc": "页面的初始数据"
            },
            {
              "type": "function",
              "name": "onLoad",
              "desc": "生命周期函数--监听页面加载",
              "parameters": []
            },
            {
              "type": "function",
              "name": "onReady",
              "desc": "生命周期函数--监听页面初次渲染完成",
              "parameters": []
            },
            {
              "type": "function",
              "name": "onShow",
              "desc": "生命周期函数--监听页面显示",
              "parameters": []
            },
            {
              "type": "function",
              "name": "onHide",
              "desc": "生命周期函数--监听页面隐藏",
              "parameters": []
            },
            {
              "type": "function",
              "name": "onUnload",
              "desc": "生命周期函数--监听页面卸载",
              "parameters": []
            },
            {
              "type": "function",
              "name": "onPullDownRefresh",
              "desc": "页面相关事件处理函数--监听用户下拉动作",
              "parameters": []
            },
            {
              "type": "function",
              "name": "onReachBottom",
              "desc": "页面上拉触底事件的处理函数",
              "parameters": []
            },
            {
              "type": "function",
              "name": "onShareAppMessage",
              "desc": "用户点击右上角分享",
              "parameters": []
            }
          ]
        }
      ]
    }
  }
}