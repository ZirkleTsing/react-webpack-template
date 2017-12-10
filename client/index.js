import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader' // eslint-disable-line
import App from './App'
import { reducer } from './store/redux'

const root = document.getElementById('root')
// 通过服务端注入的全局变量得到初始 state
const preloadedState = window.__INITIAL_STATE__ // eslint-disable-line
// 使用初始 state 创建 Redux store
const store = createStore(reducer, preloadedState)
const render = (Component) => {
  ReactDOM.hydrate(
    <AppContainer>
      <Provider store={store}>
        <BrowserRouter>
          <Component />
        </BrowserRouter>
      </Provider>
    </AppContainer>,
    root,
  )
}

render(App)

if (module.hot) {
  module.hot.accept('./App.js', () => {
    // console.log('hot loader refresh') // eslint-disable-line
    const NextApp = require('./App.js').default // eslint-disable-line
    render(NextApp)
  })
}
