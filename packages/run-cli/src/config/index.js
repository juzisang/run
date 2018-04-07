const path = require('path')

function requireLib (path) {
  return require(path.resolve(__dirname, '../../../', path))
}

module.exports = {
  presets: [
    requireLib('run-presets-vue')
  ]
}
