const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')

const isDev = process.env.NODE_ENV === 'development'

const config = merge(baseConfig, {
  entry: {
    app: path.join(__dirname, '../client/index.js')
  },
  output: {
    filename: '[name].[hash].js'
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
})

if(isDev) {
  console.log('====== develop mode ======')
  config.entry = {
    app: [
      'react-hot-loader/patch',
      path.join(__dirname, '../client/index.js')
    ]
  }
  config.devServer = {
    host: '0.0.0.0',
    // compress: true,  // wtf
    port: '8888',
    contentBase: path.join(__dirname, "../dist"),
    publicPath: '/public/',
    overlay: {
      errors: true
    },
    hot: true,
    historyApiFallback: {
      // rewrites: [
      //   { from: /^\/$/, to: '/public/index.html' }
      // ]
      index: '/public/index.html'
    },
    proxy: {
      '/api': 'http://localhost:3333'
    }
  }
  config.plugins.push(new webpack.HotModuleReplacementPlugin())
  // https://webpack.js.org/guides/hot-module-replacement/#enabling-hmr
}

module.exports = config
