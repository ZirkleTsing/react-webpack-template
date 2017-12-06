const ReactSSR = require('react-dom/server')
const ejs = require('ejs')
const serialize = require('serialize-javascript')
const Helmet = require('react-helmet').Helmet
const createStore = require('redux').createStore
const reducer = require('../../client/store/redux').reducer
const add = require('../../client/store/redux').add

function serverRender(bundle, template, req, res) {
  const path = req.path
  const serverContext = {}
  const store = createStore(reducer)
  console.log('store:', store.getState())
  const HtmlTemplate = template // template
  store.dispatch(add())
  console.log('after dispatch:', store.getState())
  const ssrApp = bundle(path, serverContext, store)
  // 这里进行异步state操作
  // TODO
  const renderString = ReactSSR.renderToString(ssrApp)
  if (serverContext.url) {
    res.writeHead(301, {
      Location: serverContext.url
    })
    res.end()
    return
  } else {
    // console.log(template)
    // <%- Outputs the unescaped value into the template
    // <%% Outputs a literal '<%'
    // %%> Outputs a literal '%>'
    const helmet = Helmet.renderStatic()
    // Streaming SSR #322
    // React 16 introduced streaming server-side rendering,
    // allowing Node servers to improve the TTFB and respond better to backpressure.
    // Unfortunately, how react-helmet works at the moment
    // it doesn't lend itself to streaming at all since the document.
    // head is already at the client by the time helmet knows what meta tags to inject.
    const html = ejs.render(template, {
      content: renderString,
      initialState: serialize(store.getState()),
      meta: helmet.meta.toString(),
      title: helmet.title.toString(),
      link: helmet.link.toString()
    })
    res.send(html)
  }
}

module.exports = {
  serverRender
}
