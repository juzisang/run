const util = require('./../util/util')
const fs = require('fs')
const path = require('path')
const bind = require('./onBind')

module.exports = function (arge) {
  const config = util.getModernConfig()
  const Module = loadModule(arge[0])
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
    if (!type || (typeof type) !== 'string') {
      throw new Error('template does not exist')
    }
    if (!fs.readdirSync(path.resolve(__dirname, '../template')).find(name => name === type)) {
      throw new Error(type + ' template does not exist')
    }
    return require('../template/' + type)
  }

  startRun()
    .then(() => bind(config, modern))
    .then(() => modern.onStart(config))
    .then(() => modern.onRun(config))
    .catch((err) => modern.onError(err))
}
