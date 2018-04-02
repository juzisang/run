const assignDeep = require('object-assign-deep')
const fs = require('fs')
const util = require('../../util/util')
const defaultConfig = require('./modern.default')

module.exports = function () {
  if (fs.existsSync(util.cwdPath('modern.conf.js'))) {
    const modernConfig = require(util.cwdPath('modern.conf.js'))
    return assignDeep({}, defaultConfig, modernConfig)
  } else if (fs.existsSync(util.cwdPath('package.json'))) {
    const modernConfig = require(util.cwdPath('package.json')).modern
    return assignDeep({}, defaultConfig, modernConfig)
  } else {
    return assignDeep({}, defaultConfig)
  }
}