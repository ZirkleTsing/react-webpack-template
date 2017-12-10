import React from 'react'
import { StaticRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { HeadCollector } from 'react-head'
import App from './App'

export default <App />

export const ServerSideRender = (location, context, store, headTags) => (
  <Provider store={store}>
    <StaticRouter location={location} context={context}>
      <HeadCollector headTags={headTags}>
        <App />
      </HeadCollector>
    </StaticRouter>
  </Provider>
)

