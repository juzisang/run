const util = require('./../util/util')
const fs = require('fs')
const path = require('path')
const bind = require('./help/onBind')

module.exports = function (arge) {
  /**
   * 开始
   */
  function startRun () {
    return new Promise((resolve, reject) => resolve())
  }

  /**
   * 验证参数
   */
  function validate () {
    const type = arge[0]
    const name = arge[1]

    if (!type || (typeof type) !== 'string') {
      throw new Error('template does not exist')
    }
    if (!fs.readdirSync(path.resolve(__dirname, '../template')).find(name => name === type)) {
      throw new Error(type + ' template does not exist')
    }
    if (typeof name !== 'string') {
      throw new Error('please enter a name')
    }
    return {
      type,
      name
    }
  }

  /**
   * 获取配置
   * @param config
   * @returns {*}
   */
  function mergeConfig (config) {
    return util.getModernConfig(config)
  }

  /**
   * 加载模块
   */
  function loadModule (config) {
    const Module = require(path.resolve(__dirname, '../template', config.type))
    return {
      life: new Module(),
      config: config
    }
  }

  startRun()
    .then(() => validate())
    .then(config => mergeConfig(config))
    .then(config => loadModule(config))
    .then(({life, config}) => {
      Promise.resolve()
        .then(() => bind(config, life))
        .then(() => life.onStart(config))
        .then(() => life.onRun(config))
        .catch((err) => life.onError(err))
    })
}
