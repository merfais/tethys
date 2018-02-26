const path = require('path')

function fp(...args) {
  return path.resolve(__dirname, '../', ...args)
}

module.exports = {
  fp,
}
