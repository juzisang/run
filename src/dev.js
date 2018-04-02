const util = require('./util/util')
const fs = require('fs')
const shelljs = require('shelljs')
const path = require('path')
const devServer = require('webpack-dev-server')
const webpack = require('webpack')
const log = require('./util/log')
const generateWebpack = require('./webpack/generateWebpack')

module.exports = function () {

  /**
   * 开始
   */
  function startRun () {
    return new Promise(resolve => resolve())
  }

  /**
   * 获取配置
   */
  function getConfig () {
    return util.getModernConfig()
  }

  /**
   * 安装依赖
   */
  function installModule (config) {
    const vueModuleDir = path.resolve(__dirname, `../modules/${config.type}`)
    if (!fs.existsSync(path.join(vueModuleDir, 'node_modules'))) {
      log.info(`loading  ${config.type} dependencies`)
      shelljs.exec('npm install --loglevel silent', {
        cwd: vueModuleDir
      })
      log.info(`loading  ${config.type} dependencies completed`)
    }
    return config
  }

  /**
   * 运行
   */
  function runDev (config) {
    const compiler = webpack(generateWebpack(config.type, true))
    const serverConf = {
      hot: true,
      watchOptions: {
        poll: 1000
      },
      stats: {
        colors: true
      },
      disableHostCheck: true,
      compress: true,
      quiet: true
    }
    new devServer(compiler, serverConf).listen(config.devPort, '::', (err) => {
      if (err) {
        log.error(err)
        process.exit(0)
      }
      log.info('----------------------------------')
      log.info(`Server listening at localhost:${config.devPort}`)
      log.info('----------------------------------')
    })
  }

  startRun()
    .then(getConfig)
    .then(installModule)
    .then(runDev)
    .catch(err => log.error(err.message || err))
}


