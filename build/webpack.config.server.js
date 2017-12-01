const path = require('path')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')

const config = merge(baseConfig, {
  target: 'node',
  entry: {
    app: path.join(__dirname, '../client/server-entry.js')
  },
  output: {
    filename: 'server-entry.js',
    libraryTarget: 'commonjs2'
  }
})

module.exports = config
