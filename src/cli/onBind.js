const compare = require('compareversion').compare
const fs = require('fs')
const path = require('path')

module.exports = function (config, modern) {
  const packageConfig = require('../../package.json')
  const cacheFile = path.resolve(__dirname, '../../cache.config.json')
  if (fs.existsSync(cacheFile)) {
    const cacheConfig = require(cacheFile)
    if (compare(packageConfig.version, cacheConfig.version)) {
      modern.onBind(config)
      fs.writeFileSync(cacheFile, JSON.stringify({
        version: packageConfig.version,
        array: [config.type]
      }))
    } else {
      if (!cacheConfig.array.find(name => name === config.type)) {
        modern.onBind(config)
        cacheConfig.array.concat([config.type])
        fs.writeFileSync(cacheFile, JSON.stringify(cacheConfig))
      }
    }
  } else {
    modern.onBind(config)
    fs.writeFileSync(cacheFile, JSON.stringify({
      version: packageConfig.version,
      array: [config.type]
    }))
  }
}