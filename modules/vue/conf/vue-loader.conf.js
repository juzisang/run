'use strict'
const utils = require('./utils')
const babelOptions = require('./babelOptions')()

module.exports = function (isSourceMap) {
  const isProduction = process.env.NODE_ENV === 'production'
  return {
    loaders: Object.assign(utils.cssLoaders({
        sourceMap: isSourceMap,
        extract: isProduction
      }),
      {
        js: {
          loader: 'babel-loader',
          options: babelOptions
        }
      }
    ),
    cssSourceMap: isSourceMap,
    cacheBusting: true,
    transformToRequire: {
      video: ['src', 'poster'],
      source: 'src',
      img: 'src',
      image: 'xlink:href'
    }
  }
}
