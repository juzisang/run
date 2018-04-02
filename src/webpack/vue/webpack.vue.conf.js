const path = require('path')
const merge = require('webpack-merge')
const webpack = require('webpack')
const util = require('../../util/util')
const baseWebpackConfig = require('./../conf/webpack.base.conf')
const babelOptions = require('./babelOptions')()
const config = require('../../config')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = function (isDebug) {
  const modernConf = config()
  const conf = merge(baseWebpackConfig, {
    entry: {
      app: util.cwdPath(modernConf.main)
    },
    devtool: (isDebug ? 'cheap-module-eval-source-map' : '#source-map'),
    resolveLoader: {
      modules: [
        path.resolve(__dirname, '../../../modules/vue/node_modules')
      ]
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            loaders: {
              css: 'vue-style-loader!css-loader',
              js: {loader: 'babel-loader', options: babelOptions}
            }
          }
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          options: babelOptions
        },
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: true,
        filename: util.cwdPath('dist/index.html'),
        template: util.cwdPath('index.html'),
      })
    ]
  })
  if (isDebug) {
    conf.plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      // HMR shows correct file names in console on update.
      new webpack.NamedModulesPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
    )
    conf.entry = util.parseEntry(modernConf, conf.entry)
  }
  return conf
}