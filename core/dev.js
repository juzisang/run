const util = require('./../util/util')
const bind = require('./help/onBind')

module.exports = function () {

  const config = util.getModernConfig()
  const Module = loadModule(config.type)
  const modern = new Module()

  /**
   * 开始
   */
  function startRun () {
    return new Promise(resolve => resolve())
  }

  /**
   * 加载模块
   */
  function loadModule (type) {
    return require('../modules/' + type).dev
  }

  startRun()
    .then(() => bind(config, modern))
    .then(() => modern.onStart(config))
    .then(() => modern.onRun(config))
    .catch((err) => modern.onError(err))
}
