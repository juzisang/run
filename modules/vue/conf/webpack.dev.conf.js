const merge = require('webpack-merge')
const webpack = require('webpack')
const util = require('../../../util/util')
const baseWebpackConfig = require('./../conf/webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

module.exports = function (modernConf) {
  return merge(baseWebpackConfig(modernConf), {
    entry: util.parseEntry(modernConf, {
      app: util.cwdPath(modernConf.main)
    }),
    output: {
      publicPath: '/'
    },
    devtool: modernConf.vue.devtool,
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"development"'
        }
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new HtmlWebpackPlugin({
        inject: true,
        filename: util.cwdPath('dist/index.html'),
        template: util.cwdPath('index.html'),
      }),
      new CopyWebpackPlugin([
        {
          from: util.cwdPath('./static'),
          to: 'static',
          ignore: ['.*']
        }
      ]),
      new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://localhost:${modernConf.devPort}`],
        },
        onErrors: undefined
      })
    ]
  })
}