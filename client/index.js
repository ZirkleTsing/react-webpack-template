import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from './App'

const root = document.getElementById('root')

const render = Component => {
  ReactDOM.hydrate(
    <AppContainer>
      <Component />
    </AppContainer>,
    root
  )
}

render(App)


if(module.hot) {
  module.hot.accept('./App.js', () => {
    const NextApp = require('./App.js').default
    render(NextApp)
  })
} 