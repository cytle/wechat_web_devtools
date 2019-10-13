const plus = requirePlugin('plus')
const canvas = wx.createCanvas()
const ctx = canvas.getContext('2d')

function loop () {
  const text = `1 + 2 = ${plus(1, 2)}`
  ctx.fillStyle = '#ffffff'
  ctx.font = '36px serif'
  ctx.fillText(text, 100, 100)
  requestAnimationFrame(loop)
}

loop()
