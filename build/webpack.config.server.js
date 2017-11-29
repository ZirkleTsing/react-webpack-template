const path = require('path')

const config = {
  target: 'node',
  entry: {
    app: path.join(__dirname, '../client/server-entry.js')
  },
  output: {
    filename: 'server-entry.js',
    path: path.join(__dirname, '../dist'),
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /.js$/,
        loader: 'babel-loader',
        exclude: [path.join(__dirname, '../node_modules')]
      }
    ]
  }
}

module.exports = config