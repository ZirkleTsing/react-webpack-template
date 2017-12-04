const ReactSSR = require('react-dom/server')
const ejs = require('ejs')
const serialize = require('serialize-javascript')
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
    const html = ejs.render(template, {
      content: renderString,
      initialState: serialize(store.getState())
    })
    res.send(html)
  }
}

module.exports = {
  serverRender
}
