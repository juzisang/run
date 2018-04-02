const assignDeep = require('object-assign-deep')
const fs = require('fs')
const util = require('../util/util')
const defaultConfig = require('./default')

module.exports = function () {
  if (fs.existsSync(util.cwdPath('modern.js'))) {
    const modernConfig = require(util.cwdPath('modern.js'))
    return assignDeep({}, defaultConfig, modernConfig)
  } else if (fs.existsSync(util.cwdPath('package.json'))) {
    const modernConfig = require(util.cwdPath('package.json')).modern
    return assignDeep({}, defaultConfig, modernConfig)
  } else {
    return assignDeep({}, defaultConfig)
  }
}