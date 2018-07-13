const fs = require('fs')
const qcloud = require('wafer-node-sdk')

// 获取基础配置
const configs = require('./config')

// 获取 sdk.config
const sdkConfig = (() => {
    const sdkConfigPath = '/data/release/sdk.config.json'

    // 检查文件是否存在
    try {
        const stats = fs.statSync(sdkConfigPath)

        if (!stats.isFile()) {
            console.log('sdk.config.json 不存在，将使用 config.js 中的配置')
            return {}
        }
    } catch (e) {
        return {}
    }

    // 返回配置信息
    try {
        const content = fs.readFileSync(sdkConfigPath, 'utf8')
        return JSON.parse(content)
    } catch (e) {
        // 如果配置读取错误或者 JSON 解析错误，则输出空配置项
        console.log('sdk.config.json 解析错误，不是 JSON 字符串')
        return {}
    }
})()

// 初始化 SDK
// 将基础配置和 sdk.config 合并传入 SDK 并导出初始化完成的 SDK
module.exports = qcloud(Object.assign({}, sdkConfig, configs))
