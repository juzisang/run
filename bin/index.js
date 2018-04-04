#!/usr/bin/env node
const cmd = require('commander')

function exec (command, ...args) {
  require('../core')[command](...args)
}

cmd.version(require('../package.json').version, '-v, --version')
  .usage('modern-cli')

cmd.command('init')
  .description('run init')
  .action((...args) => exec('init', args))

cmd.command('dev')
  .description('run dev')
  .action((...args) => exec('dev', args))

cmd.command('build')
  .description('run build')
  .action((...args) => exec('build', args))

cmd.parse(process.argv)