const assignDeep = require('object-assign-deep')
const path = require('path')
const defaultConfig = require('default')
const cwd = process.cwd()
const mergeConfig = {}

try {
  const modernConfig = require(path.join(cwd, 'modern.js'))
  assignDeep(mergeConfig, defaultConfig, modernConfig)
} catch (e) {
  assignDeep(mergeConfig, defaultConfig)
}

module.exports = mergeConfig