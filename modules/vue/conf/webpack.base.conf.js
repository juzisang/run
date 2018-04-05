'use strict'
const util = require('../../../util/util')
const path = require('path')
const babelOptions = require('./babelOptions')()
const vueLoaderConfig = require('./vue-loader.conf')

const cwdPath = util.cwdPath

const modules = [
  // 当前工作目录下
  cwdPath('./node_modules'),
  // 当前模版的依赖
  path.resolve(__dirname, '../node_modules'),
  // 项目依赖
  // path.resolve(__dirname, '../../../../node_modules'),
  // 全局npm包
  // util.getGlobalNodeModulesPath()
]

module.exports = function (config) {
  return {
    context: util.cwdPath('./'),
    entry: {
      app: cwdPath('index.js')
    },
    output: {
      path: cwdPath('./dist'),
      filename: '[name].bundle.js'
    },
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': cwdPath('src')
      },
      modules: modules
    },
    resolveLoader: {
      modules: modules
    },
    module: {
      rules: [
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'static/img/[name].[hash:7].[ext]'
          }
        },
        {
          test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'static/media/[name].[hash:7].[ext]'
          }
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'static/fonts/[name].[hash:7].[ext]'
          }
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          exclude: /node_modules/,
          options: vueLoaderConfig(config.vue.sourceMap)
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          // include: [util.cwdPath('src'), util.cwdPath('test'), util.cwdPath('node_modules/webpack-dev-server/client')],
          options: babelOptions
        },
      ]
    },
    node: {
      // prevent webpack from injecting useless setImmediate polyfill because Vue
      // source contains it (although only uses it if it's native).
      setImmediate: false,
      // prevent webpack from injecting mocks to Node native modules
      // that does not make sense for the client
      dgram: 'empty',
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
      child_process: 'empty'
    }
  }
}
