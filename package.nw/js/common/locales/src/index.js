const fs = require('fs')
const path = require('path')

String.prototype.formateLocales = function(insert = []) {
  if (Object.prototype.toString.call(insert) != '[object Array]') {
    return this.replace('%s', insert.toString())
  }

  let result = this
  insert.forEach((value) => {
    result = result.replace('%s', value)
  })
  return result
}

const defaultLocales = 'zh'
let locales = defaultLocales

const setLocales = (lan) => {
  if (fs.existsSync(path.join(__dirname, lan))) {
    locales = lan
  }
}

const getLocales = () => {
  return locales
}

module.exports = {
  setLocales,
  getLocales,
  get config() {
    return require(`./${locales}/index.js`)
  }
}