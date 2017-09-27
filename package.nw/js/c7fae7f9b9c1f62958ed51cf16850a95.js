// coyp from https://github.com/Microsoft/vscode/blob/823b3db494d6dc5aadef73b798d9f806053c28fb/src/vs/workbench/services/files/node/watcher/unix/chokidarWatcherService.ts
// 和 vs code 保持一致的监听配置
module.exports = {
  ignored: [ /node_modules/],
  ignoreInitial: true,
  ignorePermissionErrors: true,
  followSymlinks: true, // this is the default of chokidar and supports file events through symlinks
  interval: 1000, // while not used in normal cases, if any error causes chokidar to fallback to polling, increase its intervals
  binaryInterval: 1000,
  disableGlobbing: true // fix https://github.com/Microsoft/vscode/issues/4586
}