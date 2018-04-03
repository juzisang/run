const path = require('path')

module.exports = {
  // devtool
  devtool: 'cheap-module-eval-source-map',
  // open Browser
  autoOpenBrowser: false,
  // Source Maps
  sourceMap: true,
  // Paths
  assetsRoot: path.resolve(process.cwd(), './dist'),
  assetsSubDirectory: 'static',
  assetsPublicPath: './',
  // proxy
  proxyTable: {}
}