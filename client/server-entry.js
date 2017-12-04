import React from 'react'
import { StaticRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import App from './App'

export default <App />

export const ServerSideRender = (location, context, store) => (
  <Provider store={store}>
    <StaticRouter location={location} context={context}>
      <App />
    </StaticRouter>
  </Provider>
)

