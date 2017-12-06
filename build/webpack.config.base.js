const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

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
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../template.html'),
      filename: 'index.html',
      title: 'my webpack demo'
    }),
    // https://github.com/jantimon/html-webpack-plugin/blob/master/docs/template-option.md 2) Setting a loader directly for the template
    new HtmlWebpackPlugin({
      template: '!!ejs-compiled-loader!' + path.join(__dirname, '../server.template.ejs'),
      filename: 'index.server.html'
    })
  ]
}

module.exports = config
