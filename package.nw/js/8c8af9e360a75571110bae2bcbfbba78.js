'use strict';!function(require,directRequire){const a=require('./common/locales/index.js'),b=`// {{page}}.js
Page({

\t/**
\t * ${a.config.PAGE_DATA}
\t */
\tdata: {

\t},

\t/**
\t * ${a.config.LIFECYCLE_FUNCTION}--${a.config.PAGE_ONLOAD}
\t */
\tonLoad: function (options) {

\t},

\t/**
\t * ${a.config.LIFECYCLE_FUNCTION}--${a.config.PAGE_ONREADY}
\t */
\tonReady: function () {

\t},

\t/**
\t * ${a.config.LIFECYCLE_FUNCTION}--${a.config.PAGE_ONSHOW}
\t */
\tonShow: function () {

\t},

\t/**
\t * ${a.config.LIFECYCLE_FUNCTION}--${a.config.PAGE_ONHIDE}
\t */
\tonHide: function () {

\t},

\t/**
\t * ${a.config.LIFECYCLE_FUNCTION}--${a.config.PAGE_ONUNLOAD}
\t */
\tonUnload: function () {

\t},

\t/**
\t * ${a.config.PAGE_EVENT_HANDLER_FUNCTION}--${a.config.PAGE_ONPULLDOWNREFRESH}
\t */
\tonPullDownRefresh: function () {

\t},

\t/**
\t * ${a.config.PAGE_ONREACHBOTTOM}
\t */
\tonReachBottom: function () {

\t},

\t/**
\t * ${a.config.PAGE_ONSHAREAPPMESSAGE}
\t */
\tonShareAppMessage: function () {

\t}
})`,c=`<!--{{page}}.wxml-->
<text>{{page}}.wxml</text>
`,d=`// {{component}}.js
Component({
\t/**
\t * ${a.config.COMPONENT_PROPERTIES}
\t */
\tproperties: {

\t},

\t/**
\t * ${a.config.COMPONENT_DATA}
\t */
\tdata: {

\t},

\t/**
\t * ${a.config.COMPONENT_METHODS}
\t */
\tmethods: {

\t}
})
`,e=`{
\t"component": true,
\t"usingComponents": {}
}`,f=`<!--{{component}}.wxml-->
<text>{{component}}.wxml</text>
`,g=`// 云函数入口文件
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
}`,h=`{
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
}`;module.exports={pageJS:b,pageJSON:'{}',pageWXML:c,pageWXSS:'/* {{page}}.wxss */',componentJS:d,componentJSON:e,componentWXML:f,componentWXSS:'/* {{component}}.wxss */',tcbIndexJS:g,tcbCloudFunctionPackageJSON:h}}(require('lazyload'),require);