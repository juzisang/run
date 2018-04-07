const Config = require('webpack-chain')

const config = new Config()

module.exports = function () {

  config.entry()

  return config
}