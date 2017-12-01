import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader' // eslint-disable-line
import App from './App'

const root = document.getElementById('root')

const render = (Component) => {
  ReactDOM.hydrate(
    <AppContainer>
      <Component />
    </AppContainer>,
    root,
  )
}

render(App)


if (module.hot) {
  module.hot.accept('./App.js', () => {
    const NextApp = require('./App.js') // eslint-disable-line
    render(NextApp)
  })
}
