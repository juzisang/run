module.exports = function (config, isDebug) {
  return isDebug ? require('./webpack.dev.conf')(config) : require('./webpack.prod.conf')(config)
}


