import './libs/weapp-adapter'

window.requestAnimationFrame(loop)


console.log('代码片段是一种迷你、可分享的小程序或小游戏项目，可用于分享小程序和小游戏的开发经验、展示组件和 API 的使用、复现开发问题和 Bug 等。可点击以下链接查看代码片段的详细文档：')
console.log('https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/devtools.html')

function loop() {
  let ctx = canvas.getContext('2d')

  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)

  ctx.fillStyle = '#000000'
  ctx.font = `${parseInt(window.innerWidth / 20)}px Arial`
  ctx.fillText('欢迎使用代码片段', 10, window.innerHeight * 1 / 5)
  ctx.fillText('可在控制台查看代码片段的说明和文档', 10, window.innerHeight * 1 / 5 + 30)

  window.requestAnimationFrame(loop)
}


