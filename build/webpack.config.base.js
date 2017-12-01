const path = require('path')

const config = {
  output: {
    path: path.join(__dirname, '../dist/'),
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /.(js|jsx)$/,
        exclude: [
          path.join(__dirname, '../node_modules'),
        ],
        loader: "eslint-loader",
      },
      {
        test: /.js$/,
        loader: 'babel-loader',
        exclude: [
          path.join(__dirname, '../node_modules')
        ]
      }
    ]
  }
}

module.exports = config
