const shelljs = require('shelljs')
const path = require('path')
const devServer = require('webpack-dev-server')
const webpack = require('webpack')
const log = require('./../../util/log')
const ModernBase = require('../../core/base/ModernBase')
const generate = require('./conf/generateWebpack')

class VueDev extends ModernBase {
  onBind (config) {
    log.info('loading dependencies')
    shelljs.exec('npm install', {
      cwd: __dirname
    })
    log.info('loading dependencies completed')
  }

  onStart (config) {
    const compiler = webpack(generate(config, true))
    return new Promise((resolve, reject) => {
      compiler.run((err, stats) => {
        if (err) {
          return reject(err)
        }
        logWebpack(stats)
        resolve(stats)
      })
    })
  }

  onRun (config) {
    log.info('build successfully. ')
  }

  onError (err) {
    log.error(err)
  }

  logWebpack (stats) {
    console.log('\n' + stats.toString({
      hash: true,
      version: true,
      timings: true,
      assets: true,
      chunks: false,
      colors: true,
      chunkModules: false,
      warnings: false,
      modules: false,
      moduleTrace: false,
      chunkOrigins: false,
      performance: false,
      publicPath: false,
      reasons: false,
      source: false,
    }) + '\n')
  }
}

module.exports = VueDev