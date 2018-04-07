const lib = {
  'load-config': () => require('../load-config'),
  'webpack-core': () => require('../webpack-core')
}

module.exports = function (libName) {
  return lib[libName]()
}