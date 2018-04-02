const path = require('path')

function moduleLoader (name) {
  return path.resolve(__dirname, '../node_modules', name)
}

module.exports = function () {
  const babelConfig = {
    babelrc: false,
    forceEnv: true,
    presets: [moduleLoader('babel-preset-env')],
    plugins: [
      moduleLoader('babel-plugin-syntax-dynamic-import'),
      moduleLoader('babel-plugin-transform-runtime'),
      moduleLoader('babel-plugin-transform-vue-jsx'),
      moduleLoader('babel-plugin-transform-object-rest-spread')
    ],
    cacheDirectory: true
  }
  return babelConfig
}