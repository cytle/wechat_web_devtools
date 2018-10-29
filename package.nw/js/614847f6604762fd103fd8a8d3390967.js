'use strict';!function(require,directRequire){const a=require('./72653d4b93cdd7443296229431a7aa9a.js'),b=require('./56c390e04c10e91a4aa2a2c19d9a885d.js'),c=require('./common/locales/index.js'),d={[b.DISPLAY_TYPES.PLUGIN_UPDATE_INFO]:(b,d,e)=>{let f='';try{f=`
      (function() {
      try {
        console.group(\`${new Date} ${c.config.PLUG_IN_UPDATE_PROMPTS}\`)

        console.warn(decodeURIComponent(\' ${encodeURIComponent(c.config.PLUG_IN_UPDATE_DETAIL.format([e.name,e.currentVersion,e.latestVersion])).replace(/'/g,'\\\'')}\'))

        console.groupEnd()
      } catch(err) {
        // do not show error in case of error during printing
        console.groupEnd()
      }
      })()
      `}catch(b){a.error('info.display.js error while trying to display bbs information',e)}b.executeScript({code:f})},[b.DISPLAY_TYPES.BBS_LOG_LINK]:(b,d,e)=>{let f='',g='';try{g='bbs'===e.linkType?c.config.COMMUNITY_RELATED_POST_RECOMMENDATION:'doc'===e.linkType?c.config.DOCUMENT_RECOMMENDATION:c.config.ARTICLE_RECOMMENDS,f=`
      (function() {
      try {
        console.group(\`${new Date} ${g}\`)

        console.group('${c.config.INFO_DISPLAY_ORIGINAL_INFORMATION.format(1===e.messageLevel?c.config.EMBED_WARNINGS:c.config.EMBED_ERRORS)}')
        console.${1===e.messageLevel?'warn':'error'}(decodeURIComponent('${encodeURIComponent(e.message).replace(/'/g,'\\\'')}'))
        console.groupEnd()

        ${e.explanation?'console.log(decodeURIComponent(\''+encodeURIComponent(e.explanation).replace(/'/g,'\\\'')+'\'))':''}
        console.log('${c.config.INFO_DISPLAY_MORE_INFORMATION.format([1===e.messageLevel?c.config.EMBED_WARNINGS:c.config.EMBED_ERRORS,e.link])}')

        console.groupEnd()
      } catch(err) {
        // do not show error in case of error during printing
        console.groupEnd()
        console.groupEnd()
      }
      })()
      `}catch(b){a.error('info.display.js error while trying to display bbs information',e)}b.executeScript({code:f})},[b.DISPLAY_TYPES.DOMAIN_ERROR]:(a,b,d)=>{const{url:e,domains:f}=d,g=d.type,h=`
    (function() {
    console.group(\`${new Date} ${g} ${c.config.ERROR_VERIFY_VALID_DOMAIN}\`)
    console.info(\`${c.config.UPDATE_DOMAIN_RECOMPILE_PROJECT}\`)
    console.error(\`${c.config.NOT_IN_VALID_DOMAIN_LIST.format([e,g,'https://developers.weixin.qq.com/miniprogram/dev/framework/ability/network.html'])}\`)
    console.table(${JSON.stringify(f)})
    console.groupEnd()
    })()`;a.executeScript({code:h})},RECORD_FORMAT_INFO:(a)=>{const b=`
    (function() {
    console.group(\`${new Date} ${c.config.RECORDING_FILE_FORMAT_DESCRIPTION}\`)
    console.warn(\`${c.config.RECORDING_FILE_FORMAT_DIFF}\`)
    console.groupEnd()
    })()`;a.executeScript({code:b})},COMPILE_JS_TOO_LARGE_IGNORE:(a,b,d)=>{const e=(d.files||[]).join('\\n').replace(/\"/g,'?'),f=`
    (function() {
    console.group(\`${new Date} ${c.config.FILE_COMPILE_ERROR.format('JS')}\`)
    console.warn(\`${c.config.PREVIEW_MSG_BIG_FILE_DETAILS}\`)
    console.log("${e}")
    console.groupEnd()
    })()`;a.executeScript({code:f})},[b.DISPLAY_TYPES.HINT_NO_URL_CHECK]:(a)=>{const b=`
    (function() {
      try {
        if (!window.hasOwnProperty('__disPlayURLCheckWarning')) {
          window.__disPlayURLCheckWarning = true
        }

        if (window.__disPlayURLCheckWarning) {
          console.group(\`${new Date} ${c.config.TURN_OFF_VERIFY_VALIDITY}\`)
          console.warn(\`${c.config.TOOL_NOT_VERIFY_VALIDITY}\`)
          console.groupEnd()
          window.__disPlayURLCheckWarning = false
        }
      } catch (err) {
        console.warn('error', err)
      }
    })()
    `;a.executeScript({code:b})},[b.DISPLAY_TYPES.CUSTOM_ANALYSIS_GET_APP_CONFIG]:(a,b,d)=>{const e=`
    (function() {

    console.group(\`\${new Date()} ${c.config.CUSTOM_ANALYSIS} ${c.config.PULL_CONFIGURE_SUCCESSFULLY}\`)
    let config = $config
    try {
      let events = JSON.parse(config)
      let event = events[0]
      let table = {}
      table['${c.config.EVENT} ID'] = { value: event.eventID }
      table['${c.config.EVENT_NAME}'] = { value: event.eventName }
      console.info('${c.config.EVENT_INFORMATION}')
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
        console.group(\`${c.config.ACTION} #\${i + 1 }：\`)
        console.info('${c.config.TRIGGERING_CONDITIONS}')
        console.table(actionTable)

        let actionDataTable = []
        for (const key in target.data) {
          actionDataTable.push({
            '${c.config.FIELD_VALUE}': target.data[key]
          })
        }

        console.info('${c.config.REPORT_DATA}')
        console.table(actionDataTable)

        console.groupEnd()
      }

    } catch (e) {
      // pass
    }
    console.groupEnd()

    })()
    `.replace('$config',d.config);a.executeScript({code:e})},[b.DISPLAY_TYPES.CUSTOM_ANALYSIS_ON_APP_CONFIG]:(a,b,d)=>{const e=`

    (function (){

    console.group(\`\${new Date()} ${c.config.CUSTOM_ANALYSIS} ${c.config.RECEIVE_LATEST_CONFIGURATION}\`)
    let config = $config
    try {
      let events = JSON.parse(config)
      let event = events[0]
      let table = {}
      table['${c.config.EVENT} ID'] = { value: event.eventID }
      table['${c.config.EVENT_NAME}'] = { value: event.eventName }
      console.info('${c.config.EVENT_INFORMATION}')
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
        console.group(\`${c.config.ACTION} #\${i + 1 }：\`)
        console.info('${c.config.TRIGGERING_CONDITIONS}')
        console.table(actionTable)

        let actionDataTable = []
        for (const key in target.data) {
          actionDataTable.push({
            '${c.config.FIELD_VALUE}': target.data[key]
          })
        }

        console.info('${c.config.REPORT_DATA}')
        console.table(actionDataTable)

        console.groupEnd()
      }

    } catch (e) {
      // pass
    }
    console.groupEnd()

    })()
    `.replace('$config',d.config);a.executeScript({code:e})},[b.DISPLAY_TYPES.CUSTOM_ANALYSIS_REPORT]:(a,b,d)=>{const e=`

    (function (){

    let actionData = $actionData
    let data = actionData.data

    const type = Object.prototype.toString.call(data).slice(8, -1)

    if (type === 'Object') {

      // wx.reportAnalytics

      console.group(\`\${new Date() } ${c.config.CUSTOM_ANALYSIS} ${c.config.REPORT_SUCCESS}\`)
      if (actionData.eventID) {
        console.info(\`event ID: \${actionData.eventID }\`)
      }
      if (actionData.page) {
        console.info(\`page: \${actionData.page }\`)
      }

      const table = {}
      for (const key in data) {
        table[key] = { '${c.config.DATA}': data[key] }
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

      console.group(\`\${new Date() } ${c.config.CUSTOM_ANALYSIS} ${c.config.REPORT_SUCCESS}\`)

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
            item['${c.config.FIELD_VALUE}'] = idMap[item.id].selector
            item['${c.config.DATA}'] = item.value
          }

          if (data && data.length > 0) {
            console.table(data, ['${c.config.FIELD_VALUE}', '${c.config.DATA}'])
          }
          console.groupEnd()
        } else {
          if (data && data.length > 0) {
            console.table(data, ['id', '${c.config.DATA}'])
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
    `.replace('$actionData',d.actionData).replace('$config',d.config);a.executeScript({code:e})}};module.exports=(a,b,c)=>{d[b]&&d[b](a,b,c)}}(require('lazyload'),require);