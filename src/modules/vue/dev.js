const shelljs = require('shelljs')
const path = require('path')
const log = require('./../../util/log')
const ModernBase = require('../../core/base/ModernBase')
const generate = require('./conf/generateWebpack')
const getPort = require('get-port')

class VueDev extends ModernBase {
  onBind (config) {
    log.info('loading dependencies')
    shelljs.exec('npm install --loglevel silent', {
      cwd: __dirname
    })
    log.info('loading dependencies completed')
  }

  onStart (config) {
    const devServer = require('webpack-dev-server')
    const webpack = require('webpack')
    const compiler = webpack(generate(config, true))
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
    return getPort({port: config.devPort})
      .then((port) => {
        config.devPort = port
        return config
      })
      .then(config => new Promise((resolve, reject) => new devServer(compiler, serverConf).listen(config.devPort, '::', (err) => err ? reject(err) : resolve())))
  }

  onRun (config) {
    log.info('----------------------------------')
    log.info(`Server listening at localhost:${config.devPort}`)
    log.info('----------------------------------')
  }

  onError (err) {
    log.error(err)
    process.exit(0)
  }
}

module.exports = VueDev