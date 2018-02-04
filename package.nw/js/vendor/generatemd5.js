const path = require('path')
const fs = require('fs')
const crypto = require('crypto')
const os = require('os')
const child_process = require('child_process')

const exeList = [
  'wcc',
  'wcsc',
  'wcc.exe',
  'wcsc.exe'
]

function generate(vendorPath) {
  let dirList = fs.readdirSync(vendorPath)

  let libs = {}
  dirList.forEach((item) => {
    if (item == 'dev' || item == 'quickstart' || item == 'beta') {
      return
    }

    let itemPath = path.join(vendorPath, item)
    let stat = fs.statSync(itemPath)
    if (stat.isDirectory()) {
      let fileList = fs.readdirSync(itemPath)

      let md5Info = {}
      fileList.forEach((file) => {
        if (fs.statSync(path.join(itemPath, file)).isFile()) {
          let fileData = fs.readFileSync(path.join(itemPath, file))
          let md5sum = crypto.createHash('md5')
          md5sum.update(fileData)
          md5Info[file] =  md5sum.digest('hex')
        }
      })

      libs[item] = md5Info
    }
  })

  let oldConfig = JSON.parse(fs.readFileSync(path.join(vendorPath, 'config.json'), 'utf8'))
  for (var key in oldConfig.libs) {
    libs[key] = Object.assign({}, oldConfig.libs[key], libs[key])
  }

  let newLib = {}
  let keys = Object.keys(libs)
  keys.sort()
  for (var i = 0; i < keys.length; i++) {
    let key = keys[i]
    newLib[key] = libs[key]
  }
  let config = {
    configVersion: Date.now(),
    currentLibVersion: oldConfig.currentLibVersion,
    libs: newLib
  }

  for (let key in exeList) {
    let file = exeList[key]
    let fileData = fs.readFileSync(path.join(vendorPath, file))
    let md5sum = crypto.createHash('md5')
    md5sum.update(fileData)
    config[file] = md5sum.digest('hex')
  }

  fs.writeFileSync(path.join(vendorPath, 'config.json'), JSON.stringify(config, null, '\t'))
}

generate(__dirname)
