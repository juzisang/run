const util = require('./../util/util')
const bind = require('./help/onBind')
const path = require('path')

module.exports = function () {
  /**
   * 开始
   */
  function startRun () {
    return new Promise((resolve, reject) => resolve())
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
    const Module = require(path.resolve(__dirname, '../modules', config.type)).dev
    return {
      life: new Module(),
      config: config
    }
  }

  startRun()
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
