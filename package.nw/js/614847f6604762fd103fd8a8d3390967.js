'use strict';!function(require,directRequire){const a=require('./56c390e04c10e91a4aa2a2c19d9a885d.js'),b={[a.DISPLAY_TYPES.CUSTOM_ANALYSIS_GET_APP_CONFIG]:(a,b,c)=>{let d=`
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
    `.replace('$config',c.config);a.executeScript({code:d})},[a.DISPLAY_TYPES.CUSTOM_ANALYSIS_ON_APP_CONFIG]:(a,b,c)=>{let d=`

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
    `.replace('$config',c.config);a.executeScript({code:d})},[a.DISPLAY_TYPES.CUSTOM_ANALYSIS_REPORT]:(a,b,c)=>{let d=`

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
    `.replace('$actionData',c.actionData).replace('$config',c.config);a.executeScript({code:d})}};module.exports=(a,c,d)=>{b[c]&&b[c](a,c,d)}}(require('lazyload'),require);