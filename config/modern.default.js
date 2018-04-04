const fs = require('fs')
const path = require('path')

const modules = fs.readdirSync(path.resolve(__dirname, '../modules'))
  .filter(name => {
    return fs.existsSync(path.resolve(__dirname, '../modules/' + name, 'config'))
      || fs.existsSync(path.resolve(__dirname, '../modules/' + name, 'config.js'))
  })
  .map(name => {
    return {
      [name]: require(path.resolve(__dirname, '../modules/' + name, 'config'))
    }
  })

const config = {
  // 项目类型
  type: 'vue',
  // 人口文件
  main: 'index.js',
  // dev 端口
  devPort: 9000,
  // 是否开启eslint
  eslint: false,
}

for (let i = 0; i < modules.length; i++) {
  Object.assign(config, modules[i])
}

module.exports = config