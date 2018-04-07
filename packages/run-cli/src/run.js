const EventEmitter = require('events')

class Run extends EventEmitter {
  constructor (options) {
    super()
    this.options = Object.assign({}, options)
  }

  dev () {
  }

  build () {
  }
}