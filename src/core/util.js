const path = require('path')
const axios = require('axios')
const chalk = require('chalk')

function resolve(...args) {
  return path.resolve(__dirname, '../', ...args)
}

function request(options, resolve) {
  return axios.request(options).then(data => {
    return resolve(data)
  }).catch(err => {
    console.log(chalk.red('request failed with errors.\n'))
    console.log(err)
    console.log(chalk,red('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^'))
  })
}

module.exports = {
  resolve,
  request,
}
