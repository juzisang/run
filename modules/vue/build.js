const shelljs = require('shelljs')
const log = require('./../../util/log')
const ModernLife = require('../../base/ModernLife')
const generate = require('./conf/generate')

class VueDev extends ModernLife {
  onBind (config) {
    log.info('loading dependencies')
    shelljs.exec('npm install --loglevel silent', {
      cwd: __dirname
    })
    log.info('loading dependencies completed')
  }

  onStart (config) {
    const ora = require('ora')
    const webpack = require('webpack')
    const compiler = webpack(generate(config, false))
    const spinner = ora('building for production...')
    return new Promise((resolve, reject) => {
      spinner.start()
      compiler.run((err, stats) => {
        spinner.stop()
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
    log.error(JSON.stringify(err))
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