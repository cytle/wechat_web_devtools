const fs = require('fs')
const path = require('path')
const child_process = require('child_process')

const installDir = path.dirname(process.argv[0])
const appPath = path.join(installDir, 'wechatdevtools.exe')

let CLI_JS_PATH

let pkgDir = path.join(process.env.APPDATA, 'Tencent', '微信web开发者工具', 'package.nw')
if (!fs.existsSync(pkgDir)) {
  pkgDir = path.dirname(process.argv[0])
  CLI_JS_PATH = path.join(installDir, 'package.nw/js/common/cli/index.js')
} else {
  CLI_JS_PATH = path.join(pkgDir, 'js/common/cli/index.js')
}

const child = child_process.spawnSync(path.join(installDir, '.\\node.exe'), [CLI_JS_PATH].concat(process.argv.slice(1)), {
  cwd: __dirname,
  stdio: [
    process.stdin,
    process.stdout,
    process.stderr,
  ]
})

process.exit(0)