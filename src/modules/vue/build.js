const shelljs = require('shelljs')
const log = require('./../../util/log')
const ModernBase = require('../../core/base/ModernBase')
const generate = require('./conf/generateWebpack')

class VueDev extends ModernBase {
  onBind (config) {
    log.info('loading dependencies')
    shelljs.exec('npm install --loglevel silent', {
      cwd: __dirname
    })
    log.info('loading dependencies completed')
  }

  onStart (config) {
    const webpack = require('webpack')
    const compiler = webpack(generate(config, false))
    return new Promise((resolve, reject) => {
      compiler.run((err, stats) => {
        if (err) {
          return reject(err)
        }
        this.logWebpack(stats)
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