// http://git.code.oa.com/devtools/main/issues/211

  const fs = require('fs')
  let preferencesFilePath = process.argv[2]
  let id = process.argv[3]

  let data = fs.readFileSync(preferencesFilePath, 'utf8')
  let dataJSON = JSON.parse(data)
  let {extensions} = dataJSON
  let {settings} = extensions

  let ext = settings[id]
  ext.events = []
  ext.filtered_events = {}

  fs.watch(preferencesFilePath, (eventType, filename) => {
    fs.writeFileSync(preferencesFilePath, JSON.stringify(dataJSON))
    fs.writeFileSync(preferencesFilePath + '_temp', JSON.stringify(dataJSON))
    process.exit()
  })



module.exports = ''
