const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'

const config = {
  entry: {
    app: path.join(__dirname, '../client/index.js')
  },
  output: {
    filename: '[name].[hash].js',
    path: path.join(__dirname, '../dist'),
    publicPath: '/public'
  },
  module: {
    rules: [
      {
        test: /.js$/,
        loader: 'babel-loader',
        exclude: [path.join(__dirname, '../node_modules')]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../index.html'),
      filename: 'index.html',
      title: 'my webpack demo'
    })
  ]
}

if(isDev) {
  console.log('====== develop mode ======')
  config.devServer = {
    host: '0.0.0.0',
    port: '8888',
    contentBase: path.join(__dirname, "dist"),
    publicPath: '/public',
    overlay: {
      errors: true
    },
    // historyApiFallback: {
    //   index: '/public/index.html'
    // },
    historyApiFallback: {
      rewrites: [
        { from: /^\/$/, to: '/public/index.html' } 
      ]
    }
  }
}

module.exports = config