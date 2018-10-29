const jimp = require('jimp')

const isSameColorImage = (data, query) => new Promise((resolve, reject) => {
  if (!data) {
    resolve({
      error: false,
      same: true,
    })
  }

  let buffer

  if (query.type === 'dataURI') {
    if (query.format === 'png') {
      buffer = Buffer.from(data.slice('data:image/png;base64,'.length), 'base64')
    } else if (query.format === 'jpg') {
      buffer = Buffer.from(data.slice('data:image/jpg;base64,'.length), 'base64')
    } else if (query.format === 'jpeg') {
      buffer = Buffer.from(data.slice('data:image/jpeg;base64,'.length), 'base64')
    }
  } else {
    buffer = data
  }

  jimp.read(buffer, (err, image) => {
    if (err) {
      return reject(err)
    }

    image = image.grayscale()
    const threshold = 10 // 阈值
    let max = 0
    let min = 255
    // 像素检测
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
      const bit = this.bitmap.data[idx + 0]
      if (bit > max) {
        max = bit
      }

      if (bit < min) {
        min = bit
      }
    })

    if (max - min < threshold) {
      resolve({
        error: false,
        same: true,
      })
    } else {
      resolve({
        error: false,
        same: false,
      })
    }
  })
})

module.exports = {
  isSameColorImage,
}
