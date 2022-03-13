if (process.env.NODE_ENV !== 'production') {
  module.exports = require('./react-dialog-polyfill.dev.js')
}
else {
  module.exports = require('./react-dialog-polyfill.js')
}
