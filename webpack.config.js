const path = require('path')
module.exports = {
  resolve: {
    // for WebStorm
    alias: {
      '@': path.resolve(__dirname),
      '~': path.resolve(__dirname)
    }
  }
}
