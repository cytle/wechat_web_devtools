const fs = require('fs')
const path = require('path')
const events = require('events')
const _ = require('lodash')
const moment = require('moment')

String.prototype.format = function(insert = []) {
  if (Object.prototype.toString.call(insert) != '[object Array]') {
    return this.replace('%s', insert.toString())
  }

  let result = this
  insert.forEach(value => {
    result = result.replace('%s', value)
  })
  return result
}

// 这里的 locale 均是指 language Tag，详细可以参考 https://en.wikipedia.org/wiki/IETF_language_tag

const emitter = new events.EventEmitter()
emitter.setMaxListeners(40)
const changeLocaleEventName = 'changeLocale'
const onChangeLocale = cb => {
  emitter.on(changeLocaleEventName, cb)
  return () => {
    emitter.removeListener(changeLocaleEventName, cb)
  }
}

const systemLocale = '$SYSTEM'
const supportedLocales = ['zh', 'en']
const toSupportedLocale = tag => {
  if (tag === systemLocale) tag = navigator.language
  return supportedLocales.find(item => tag.toLowerCase().includes(item)) || 'zh'
}
const setMoment = (val=locale) => {
  moment.locale(val === 'zh' ? 'zh_CN' : 'en') // moment 不支持 zh
}

const initLocale = () => {
  let settings = {}
  try {
    settings = JSON.parse(localStorage.getItem('reduxPersist:settings')) || {}
  } catch (e) {
    settings = {}
  }
  sourceLocale = _.get(settings, 'appearance.locale') || systemLocale
  locale = toSupportedLocale(sourceLocale)
  setMoment()
}

let sourceLocale
let locale
initLocale()

const getLocale = () => locale
const getSourceLocale = () => sourceLocale
const setLocale = tag => {
  sourceLocale = tag
  const prevLocale = locale
  const newLocale = toSupportedLocale(tag)
  if (newLocale !== locale) {
    locale = newLocale
  }
  setMoment()
  emitter.emit(changeLocaleEventName, locale, sourceLocale, prevLocale)
}

const localeExport = {
  systemLocale,
  getLocale,
  getSourceLocale,
  setLocale,
  onChangeLocale,
  get config() {
    return require(`./${locale}/index.js`)
  },
  get supportedLanguages() {
    return [
      {
        dec: '中文（简体）',
        locale: 'zh'
      },
      {
        dec: 'English',
        locale: 'en'
      }
    ]
  }
}

module.exports = localeExport
