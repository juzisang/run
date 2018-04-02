module.exports = function (type, isDebug) {
  switch (type) {
    case 'vue':
      return require('./vue/webpack.vue.conf')(isDebug)
    case 'react':
      return require('./vue/webpack.vue.conf')(isDebug)
    default:
      return require('./vue/webpack.vue.conf')(isDebug)
  }
}


