const EventEmitter = require('events')

class Run extends EventEmitter {
  constructor (options) {
    super()
    this.options = Object.assign({
      type: 'vue',
      cwd: './',
      host: '0.0.0.0',
      port: '9000',
      mode: 'development'
    }, options)
  }

  dev () {

  }

  build () {
  }

}