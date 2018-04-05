const compare = require('compareversion').compare
const fs = require('fs')
const path = require('path')

module.exports = function (config, modern) {
  // 缓存文件
  const cacheFile = path.resolve(__dirname, '../../cache.config.json')
  // 新版本
  const newVersion = require('../../package.json').version
  // 缓存文件不存在
  if (!fs.existsSync(cacheFile)) {
    modern.onBind(config)
    return updateConfig(newVersion, config.type)
  }
  const cacheConfig = require(cacheFile)
  const oldVersion = cacheConfig.version
  // 版本没有变
  if (newVersion === oldVersion || compare(newVersion, oldVersion) === -1) {
    // 没有node_modules
    if (!checkModules(config.type)) {
      modern.onBind(config)
    }
    return
  }
  // 版本更新，重新安装依赖
  modern.onBind(config)
  updateConfig(newVersion, config.type)
}

function updateConfig (version, type) {
  const cacheConfigFile = path.resolve(__dirname, '../../cache.config.json')
  const cacheConfig = {
    version,
    array: []
  }
  if (fs.existsSync(cacheConfigFile) && !require(cacheConfigFile).array.find(name => name === type)) {
    cacheConfig.array.push(type)
  }
  fs.writeFileSync(cacheConfigFile, JSON.stringify(cacheConfig))
}

function checkModules (type) {
  const cacheConfigFile = path.resolve(__dirname, '../../modules/', type, 'node_modules')
  return fs.existsSync(cacheConfigFile)
}