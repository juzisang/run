const inquirer = require('inquirer')
const ModernBase = require('../../base/ModernLife')

class VueInit extends ModernLife {
  onStart (config) {
    let questions = [
      {
        type: 'input',
        name: 'name',
        message: 'Project name：',
        default: process
      },
      {
        type: 'input',
        name: 'description',
        message: 'Project description',
        default: 'A Vue.js project'
      },
      {
        type: 'input',
        name: 'author',
        message: 'Author'
      },
      {
        type: 'confirm',
        name: 'installVueRouter',
        message: 'Install vue-router'
      },
      {
        type: 'confirm',
        name: 'eslint',
        message: 'Use ESLint to lint your code?'
      }
    ]
    inquirer.prompt(questions)
  }

  onRun (config) {
  }
}

module.exports = VueInit