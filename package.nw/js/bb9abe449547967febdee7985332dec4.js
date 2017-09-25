// {"Content-Encoding":"gzip"} --> {"content-encoding":"gzip"}
const lower_keys = function(obj) {
  for (var key in obj) {
    var low = key.toLowerCase()
    var val = obj[key]
    delete obj[key]
    if (low !== 'host') {
      obj[low] = val
    } else {
      obj['Host'] = val
    }
  }

  return obj
}

const merge = function(baseObj, extendObj) {
  for (var key in extendObj) {
    baseObj[key] = extendObj[key]
  }
  return baseObj
}


module.exports = {
  merge: merge,
  lower_keys: lower_keys
}
