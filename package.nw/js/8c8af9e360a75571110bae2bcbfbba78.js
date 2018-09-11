'use strict';!function(require,directRequire){const a=require('./common/locales/index.js'),b=`// {{page}}.js
Page({

  /**
   * ${a.config.PAGE_DATA}
   */
  data: {

  },

  /**
   * ${a.config.LIFECYCLE_FUNCTION}--${a.config.PAGE_ONLOAD}
   */
  onLoad: function (options) {

  },

  /**
   * ${a.config.LIFECYCLE_FUNCTION}--${a.config.PAGE_ONREADY}
   */
  onReady: function () {

  },

  /**
   * ${a.config.LIFECYCLE_FUNCTION}--${a.config.PAGE_ONSHOW}
   */
  onShow: function () {

  },

  /**
   * ${a.config.LIFECYCLE_FUNCTION}--${a.config.PAGE_ONHIDE}
   */
  onHide: function () {

  },

  /**
   * ${a.config.LIFECYCLE_FUNCTION}--${a.config.PAGE_ONUNLOAD}
   */
  onUnload: function () {

  },

  /**
   * ${a.config.PAGE_EVENT_HANDLER_FUNCTION}--${a.config.PAGE_ONPULLDOWNREFRESH}
   */
  onPullDownRefresh: function () {

  },

  /**
   * ${a.config.PAGE_ONREACHBOTTOM}
   */
  onReachBottom: function () {

  },

  /**
   * ${a.config.PAGE_ONSHAREAPPMESSAGE}
   */
  onShareAppMessage: function () {

  }
})`,c=`<!--{{page}}.wxml-->
<text>{{page}}.wxml</text>
`,d=`// {{component}}.js
Component({
  /**
   * ${a.config.COMPONENT_PROPERTIES}
   */
  properties: {

  },

  /**
   * ${a.config.COMPONENT_DATA}
   */
  data: {

  },

  /**
   * ${a.config.COMPONENT_METHODS}
   */
  methods: {

  }
})
`,e=`{
  "component": true,
  "usingComponents": {}
}`,f=`<!--{{component}}.wxml-->
<text>{{component}}.wxml</text>
`,g=`// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {

}`,h=`{
  "name": "{{name}}",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \\"Error: no test specified\\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "wx-server-sdk": "latest"
  }
}`;module.exports={pageJS:b,pageJSON:'{}',pageWXML:c,pageWXSS:'/* {{page}}.wxss */',componentJS:d,componentJSON:e,componentWXML:f,componentWXSS:'/* {{component}}.wxss */',tcbIndexJS:g,tcbCloudFunctionPackageJSON:h}}(require('lazyload'),require);