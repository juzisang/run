require('babel-register')({
  plugins: ['transform-async-to-generator'],
  ignore: function (filename) {
    if (filename.includes('node_modules')) return true
    return false
  }
})

require('./run')