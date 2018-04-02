const spawn = require('cross-spawn')
const path = require('path')

function getGlobalNodeModulesPath () {
  const npmRoot = spawn.sync('npm', ['root', '-g'])
  const paths = npmRoot.stdout.toString().split(path.sep)
  paths.pop()
  return paths
}

function getModernConfig (config) {
  const defaultConfig = require('../config')
  const assignDeep = require('object-assign-deep')
  return assignDeep({}, defaultConfig, config)
}

function cwdPath (url) {
  return path.resolve(process.cwd(), url)
}

module.exports = {
  getGlobalNodeModulesPath,
  getModernConfig,
  cwdPath
}