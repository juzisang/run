const assignDeep = require('object-assign-deep')
const fs = require('fs')
const util = require('../util/util')
const modernDefaultConfig = require('./modern.default')

module.exports = function (config) {
  if (fs.existsSync(util.cwdPath('modern.conf.js'))) {
    const modernConfig = require(util.cwdPath('modern.conf.js'))
    return assignDeep({}, modernDefaultConfig, modernConfig, config || {})
  } else if (fs.existsSync(util.cwdPath('package.json'))) {
    const modernConfig = require(util.cwdPath('package.json')).modern
    return assignDeep({}, modernDefaultConfig, modernConfig, config || {})
  } else {
    return assignDeep({}, modernDefaultConfig, config || {})
  }
}