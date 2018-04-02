const util = require('../util/util')
const shelljs = require('shelljs')
const path = require('path')

module.exports = function () {

  /**
   * 开始
   */
  function startRun () {
    return Promise.resolve()
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
    switch (config.type) {
      case 'vue':
        shelljs.exec('npm install', {
          cwd: path.resolve(__dirname, '../../modules/vue')
        })
        break
      case 'react':
        shelljs.exec('npm install', {
          cwd: path.resolve(__dirname, '../../modules/react')
        })
        break
    }
  }

  startRun
    .then(getConfig)
    .then(installModule)
}


