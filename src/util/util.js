const spawn = require('cross-spawn')
const path = require('path')

function getGlobalNodeModulesPath () {
  const npmRoot = spawn.sync('npm', ['root', '-g'])
  const paths = npmRoot.stdout.toString().split(path.sep)
  paths.pop()
  return path.join(paths.join(path.sep), 'node_modules')
}

function getModernConfig (config) {
  return require('../core/config')(config)
}

function cwdPath (url) {
  return path.resolve(process.cwd(), url)
}

function parseEntry (config, entry) {
  if (entry) {
    if (typeof entry === 'string') {
      entry = [entry]
      entry.unshift(`webpack-dev-server/client?http://localhost:${config.devPort}`, 'webpack/hot/dev-server')
    } else if (entry instanceof Array) {
      entry.unshift(`webpack-dev-server/client?http://localhost:${config.devPort}`, 'webpack/hot/dev-server')
    } else if (typeof entry === 'object') {
      for (let key in entry) {
        entry[key] = parseEntry(config, entry[key])
      }
    }
    return entry
  } else {
    console.error('No entry is found!')
  }
}

module.exports = {
  getGlobalNodeModulesPath,
  getModernConfig,
  parseEntry,
  cwdPath
}