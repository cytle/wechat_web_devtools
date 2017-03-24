"use strict";module.exports=`
  console.group('%c加载 {{fileName}} 错误', "color: red; font-size: x-large")
  console.error(\`%c{{error}}\`, "color: red; font-size: x-large")
  console.groupEnd()
  Page({})
`;