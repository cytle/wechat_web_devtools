'use strict';!function(require,directRequire){const a=require('./72653d4b93cdd7443296229431a7aa9a.js'),b=require('./56c390e04c10e91a4aa2a2c19d9a885d.js'),c={[b.DISPLAY_TYPES.BBS_LOG_LINK]:(b,c,d)=>{let e='',f='';try{f='bbs'===d.linkType?'\u793E\u533A\u76F8\u5173\u5E16\u5B50\u63A8\u8350':'doc'===d.linkType?'\u6587\u6863\u63A8\u8350':'\u6587\u7AE0\u63A8\u8350',e=`
      (function() {
      try {
        console.group(\`${new Date} ${f}\`)

        console.group('原${1===d.messageLevel?'\u8B66\u544A':'\u62A5\u9519'}信息')
        console.${1===d.messageLevel?'warn':'error'}(decodeURIComponent('${encodeURIComponent(d.message).replace(/'/g,'\\\'')}'))
        console.groupEnd()

        ${d.explanation?'console.log(decodeURIComponent(\''+encodeURIComponent(d.explanation).replace(/'/g,'\\\'')+'\'))':''}
        console.log('关于上述${1===d.messageLevel?'\u8B66\u544A':'\u62A5\u9519'}，点击查看更多信息：${d.link}')

        console.groupEnd()
      } catch(err) {
        // do not show error in case of error during printing
        console.groupEnd()
        console.groupEnd()
      }
      })()
      `}catch(b){a.error(`info.display.js error while trying to display bbs information`,d)}b.executeScript({code:e})},[b.DISPLAY_TYPES.DOMAIN_ERROR]:(a,b,c)=>{let{url:d,domains:e}=c,f=c.type,g=`
    (function() {
    console.group(\`${new Date} ${f} 合法域名校验出错\`)
    console.info(\`如若已在管理后台更新域名配置，请刷新项目配置后重新编译项目，操作路径：“项目-域名信息”\`)
    console.error(\` ${d} 不在以下 ${f} 合法域名列表中，请参考文档：https://mp.weixin.qq.com/debug/wxadoc/dev/api/network-request.html\`)
    console.table(${JSON.stringify(e)})
    console.groupEnd()
    })()`;a.executeScript({code:g})},RECORD_FORMAT_INFO:(a)=>{let b=`
    (function() {
    console.group(\`${new Date} 录音文件格式说明\`)
    console.warn(\`开发者工具上的录音文件与移动端格式不同，暂时只可在工具上进行播放调试，无法直接播放或者在客户端上播放\`)
    console.groupEnd()
    })()`;a.executeScript({code:b})},COMPILE_JS_TOO_LARGE_IGNORE:(a,b,c)=>{const d=(c.files||[]).join('\\n').replace(/\"/g,'?');let e=`
    (function() {
    console.group(\`${new Date} JS 文件编译\`)
    console.warn(\`以下 JS 文件过大（超过 500K），已跳过 ES6 转 ES5 和压缩的处理：\`)
    console.log("${d}")
    console.groupEnd()
    })()`;a.executeScript({code:e})},[b.DISPLAY_TYPES.HINT_NO_URL_CHECK]:(a)=>{let b=`
    (function() {
      try {
        if (!window.hasOwnProperty('__disPlayURLCheckWarning')) {
          window.__disPlayURLCheckWarning = true
        }

        if (window.__disPlayURLCheckWarning) {
          console.group(\`${new Date} 配置中关闭 请求域名、业务域名、web-view 域名、TLS 版本以及 HTTPS 证书检查\`)
          console.warn(\`工具未校验请求域名、业务域名、web-view 域名、TLS 版本以及 HTTPS 证书。\`)
          console.groupEnd()
          window.__disPlayURLCheckWarning = false
        }
      } catch (err) {
        console.warn('error', err)
      }
    })()
    `;a.executeScript({code:b})},[b.DISPLAY_TYPES.CUSTOM_ANALYSIS_GET_APP_CONFIG]:(a,b,c)=>{let d=`
    (function() {

    console.group(\`\${new Date()} 自定义分析 配置拉取成功\`)
    let config = $config
    try {
      let events = JSON.parse(config)
      let event = events[0]
      let table = {}
      table['事件 ID'] = { value: event.eventID }
      table['事件名'] = { value: event.eventName }
      console.info('事件信息')
      console.table(table)

      let eventTargets = event.eventTarget
      for (let i = 0; i < eventTargets.length; i++) {
        let target = eventTargets[i]
        let actionTable = {}
        for (const key in target) {
          if (typeof target[key] === 'string') {
            actionTable[key] = { value: target[key] }
          }
        }
        console.group(\`动作 #\${i + 1 }：\`)
        console.info('触发条件：')
        console.table(actionTable)

        let actionDataTable = []
        for (const key in target.data) {
          actionDataTable.push({
            '字段值': target.data[key]
          })
        }

        console.info('上报数据：')
        console.table(actionDataTable)

        console.groupEnd()
      }

    } catch (e) {
      // pass
    }
    console.groupEnd()

    })()
    `.replace('$config',c.config);a.executeScript({code:d})},[b.DISPLAY_TYPES.CUSTOM_ANALYSIS_ON_APP_CONFIG]:(a,b,c)=>{let d=`

    (function (){

    console.group(\`\${new Date()} 自定义分析 收到最新配置\`)
    let config = $config
    try {
      let events = JSON.parse(config)
      let event = events[0]
      let table = {}
      table['事件 ID'] = { value: event.eventID }
      table['事件名'] = { value: event.eventName }
      console.info('事件信息')
      console.table(table)

      let eventTargets = event.eventTarget
      for (let i = 0; i < eventTargets.length; i++) {
        let target = eventTargets[i]
        let actionTable = {}
        for (const key in target) {
          if (typeof target[key] === 'string') {
            actionTable[key] = { value: target[key] }
          }
        }
        console.group(\`动作 #\${i + 1 }：\`)
        console.info('触发条件：')
        console.table(actionTable)

        let actionDataTable = []
        for (const key in target.data) {
          actionDataTable.push({
            '字段值': target.data[key]
          })
        }

        console.info('上报数据：')
        console.table(actionDataTable)

        console.groupEnd()
      }

    } catch (e) {
      // pass
    }
    console.groupEnd()

    })()
    `.replace('$config',c.config);a.executeScript({code:d})},[b.DISPLAY_TYPES.CUSTOM_ANALYSIS_REPORT]:(a,b,c)=>{let d=`

    (function (){

    let actionData = $actionData
    let data = actionData.data

    const type = Object.prototype.toString.call(data).slice(8, -1)

    if (type === 'Object') {

      // wx.reportAnalytics

      console.group(\`\${new Date() } 自定义分析 上报成功\`)
      if (actionData.eventID) {
        console.info(\`event ID: \${actionData.eventID }\`)
      }
      if (actionData.page) {
        console.info(\`page: \${actionData.page }\`)
      }

      const table = {}
      for (const key in data) {
        table[key] = { '数据': data[key] }
      }

      console.table(table)

      console.groupEnd()
    } else if (type === 'Array') {

      // config
      let idMap = {}
      try {
        let events = JSON.parse($config)
        let event = events.find(e => e.eventID === actionData.eventID)
        for (const target of event.eventTarget) {
          for (const id in target.data) {
            idMap[id.toString()] = {
              selector: target.data[id],
              parent: target,
            }
          }
        }
      } catch (e) {
        idMap = null
      }

      console.group(\`\${new Date() } 自定义分析 上报成功\`)

      try {
        if (actionData.eventID) {
          console.info(\`event ID: \${actionData.eventID }\`)
        }
        if (actionData.page) {
          console.info(\`page: \${actionData.page }\`)
        }

        if (data && data.length > 0) {
          const action = idMap[data[0].id].parent

          if (action.trigger) {
            console.info(\`trigger: \${action.trigger }\`)
          }
          if (action.action) {
            console.info(\`action: \${action.action }\`)
          }
        }


      } catch (e) {
        // pass
      }

      try {
        if (idMap) {
          for (const item of data) {
            item['字段值'] = idMap[item.id].selector
            item['数据'] = item.value
          }

          if (data && data.length > 0) {
            console.table(data, ['字段值', '数据'])
          }
          console.groupEnd()
        } else {
          if (data && data.length > 0) {
            console.table(data, ['id', '数据'])
          }
          console.groupEnd()
        }
      } catch (e) {
        // pass
        console.groupEnd()
      }
    } else {
      // 其他不支持
    }

    })()
    `.replace('$actionData',c.actionData).replace('$config',c.config);a.executeScript({code:d})}};module.exports=(a,b,d)=>{c[b]&&c[b](a,b,d)}}(require('lazyload'),require);