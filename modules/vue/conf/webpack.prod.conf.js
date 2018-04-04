const path = require('path')
const merge = require('webpack-merge')
const webpack = require('webpack')
const util = require('../../../util/util')
const baseWebpackConfig = require('./../conf/webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = function (modernConf) {
  return merge(baseWebpackConfig, {
    entry: {
      app: util.cwdPath(modernConf.main)
    },
    output: {
      path: util.cwdPath(modernConf.vue.outputDir),
      filename: path.posix.join('static', 'js/[name].[chunkhash].js'),
      chunkFilename: path.posix.join('static', 'js/[id].[chunkhash].js'),
      publicPath: modernConf.vue.baseUrl
    },
    devtool: modernConf.vue.devtool,
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"'
        }
      }),
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            warnings: false
          }
        },
        sourceMap: modernConf.vue.sourceMap,
        parallel: true
      }),
      new ExtractTextPlugin({
        filename: path.posix.join('static', 'css/[name].[contenthash].css'),
        allChunks: true,
      }),
      new OptimizeCSSPlugin({
        cssProcessorOptions: modernConf.vue.sourceMap ? {safe: true, map: {inline: false}} : {safe: true}
      }),
      new HtmlWebpackPlugin({
        inject: true,
        filename: util.cwdPath('dist/index.html'),
        template: util.cwdPath('index.html'),
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true
          // more options:
          // https://github.com/kangax/html-minifier#options-quick-reference
        },
        // necessary to consistently work with multiple chunks via CommonsChunkPlugin
        chunksSortMode: 'dependency'
      }),
      new webpack.HashedModuleIdsPlugin(),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks (module) {
          // any required modules inside node_modules are extracted to vendor
          return (
            module.resource &&
            /\.js$/.test(module.resource) &&
            module.resource.indexOf(
              util.cwdPath('./node_modules')
            ) === 0
          )
        }
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest',
        minChunks: Infinity
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'app',
        async: 'vendor-async',
        children: true,
        minChunks: 3
      }),
      new CopyWebpackPlugin([
        {
          from: util.cwdPath('./static'),
          to: 'static',
          ignore: ['.*']
        }
      ])
    ]
  })
}