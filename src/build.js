const util = require('./util/util')
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
    shelljs.exec('npm install', {
      cwd: path.resolve(__dirname, `../../modules/${config.type}`)
    })
    return config
  }

  /**
   * 开始build
   */
  function runBuild (config) {
    const compiler = webpack(generateWebpack(config.type, false))
    compiler.run((err, stats) => {
      if (err) {
        return log.error(err)
      }
      logWebpack(stats)
      log.info('build successfully. ')
    })
  }

  /**
   * 打印webpack 日志
   * @param stats
   */
  function logWebpack (stats) {
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

  startRun()
    .then(getConfig)
    .then(installModule)
    .then(runBuild)
    .catch(err => log.error(err.message || err))
}


