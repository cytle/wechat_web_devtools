;!function(require, directRequire){;"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const locales=require('./common/locales/index.js');exports.pageJS=`// {{page}}.js
Page({

\t/**
\t * ${locales.config.PAGE_DATA}
\t */
\tdata: {

\t},

\t/**
\t * ${locales.config.LIFECYCLE_FUNCTION}--${locales.config.PAGE_ONLOAD}
\t */
\tonLoad: function (options) {

\t},

\t/**
\t * ${locales.config.LIFECYCLE_FUNCTION}--${locales.config.PAGE_ONREADY}
\t */
\tonReady: function () {

\t},

\t/**
\t * ${locales.config.LIFECYCLE_FUNCTION}--${locales.config.PAGE_ONSHOW}
\t */
\tonShow: function () {

\t},

\t/**
\t * ${locales.config.LIFECYCLE_FUNCTION}--${locales.config.PAGE_ONHIDE}
\t */
\tonHide: function () {

\t},

\t/**
\t * ${locales.config.LIFECYCLE_FUNCTION}--${locales.config.PAGE_ONUNLOAD}
\t */
\tonUnload: function () {

\t},

\t/**
\t * ${locales.config.PAGE_EVENT_HANDLER_FUNCTION}--${locales.config.PAGE_ONPULLDOWNREFRESH}
\t */
\tonPullDownRefresh: function () {

\t},

\t/**
\t * ${locales.config.PAGE_ONREACHBOTTOM}
\t */
\tonReachBottom: function () {

\t},

\t/**
\t * ${locales.config.PAGE_ONSHAREAPPMESSAGE}
\t */
\tonShareAppMessage: function () {

\t}
})`,exports.pageWXSS="/* {{page}}.wxss */",exports.pageWXML=`<!--{{page}}.wxml-->
<text>{{page}}.wxml</text>
`,exports.pageJSON=`{
  "usingComponents": {}
}`,exports.componentJS=`// {{component}}.js
Component({
\t/**
\t * ${locales.config.COMPONENT_PROPERTIES}
\t */
\tproperties: {

\t},

\t/**
\t * ${locales.config.COMPONENT_DATA}
\t */
\tdata: {

\t},

\t/**
\t * ${locales.config.COMPONENT_METHODS}
\t */
\tmethods: {

\t}
})
`,exports.componentJSON=`{
\t"component": true,
\t"usingComponents": {}
}`,exports.componentWXML=`<!--{{component}}.wxml-->
<text>{{component}}.wxml</text>
`,exports.componentWXSS="/* {{component}}.wxss */",exports.tcbIndexJS=`// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
\tconst wxContext = cloud.getWXContext()

\treturn {
\t\tevent,
\t\topenid: wxContext.OPENID,
\t\tappid: wxContext.APPID,
\t\tunionid: wxContext.UNIONID,
\t}
}`,exports.tcbCloudFunctionPackageJSON=`{
\t"name": "{{name}}",
\t"version": "1.0.0",
\t"description": "",
\t"main": "index.js",
\t"scripts": {
\t\t"test": "echo \\"Error: no test specified\\" && exit 1"
\t},
\t"author": "",
\t"license": "ISC",
\t"dependencies": {
\t\t"wx-server-sdk": "latest"
\t}
}`,exports.siteMap=`{
\t"desc": "关于本文件的更多信息，请参考文档 https://developers.weixin.qq.com/miniprogram/dev/framework/sitemap.html",
\t"rules": [{
\t"action": "allow",
\t"page": "*"
\t}]
}`;
;}(require("lazyload"), require);
