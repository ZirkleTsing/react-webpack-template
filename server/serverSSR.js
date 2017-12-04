const axios = require('axios')
const serverConfig = require('../build/webpack.config.server')
const MemoryFS = require("memory-fs")
const path = require('path')
const webpack = require('webpack')
const ReactSSR = require('react-dom/server')
const proxy = require('http-proxy-middleware')
const ejs = require('ejs')
const serialize = require('serialize-javascript')

const createStore = require('redux').createStore
const reducer = require('../client/store/redux').reducer
// 1.从client服务端内存中取出index.html
// 2.利用webpack()编译出SSR
// 3.转化成字符串
// 4.拼接;send


const getTemplate = () => new Promise((resolve, reject) => {
  axios.get('http://localhost:8888/public/index.server.html')
    .then((res) => {
      resolve(res.data)
    })
})
const mfs = new MemoryFS()
const serverComplier = webpack(serverConfig)
// hack写法
const Module = module.constructor
let ssrBundle = null

serverComplier.outputFileSystem = mfs
serverComplier.watch({}, (err, stats) => {
  if(err) throw err
  stats = stats.toJson()
  stats.errors.forEach(err => console.error(err))
  stats.warnings.forEach(warn => console.warn(warn))

  // 获取路径，此时已经在内存中存放了文件
  const serverEntryPath = path.join(
    serverConfig.output.path,
    serverConfig.output.filename
  )
  const serverBundle = mfs.readFileSync(serverEntryPath, 'utf-8')
  const m = new Module()
  m._compile(serverBundle, 'test.js')
  // 这里已经取到了服务端渲染的APP
  ssrBundle = m.exports.ServerSideRender
})


module.exports = (app) => {
  app.use('/public', proxy({
    target: 'http://localhost:8888/'
  }))
  app.get('*', (req, res) => {
    const path = req.path
    const serverContext = {}
    const store = createStore(reducer)
    getTemplate()
      .then( template => {
        const HtmlTemplate = template
        const ssrApp = ssrBundle(path, serverContext, store)
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
          // <%- Outputs the unescaped value into the
          // <%% Outputs a literal '<%'
          // %%> Outputs a literal '%>'
          const html = ejs.render(template, {
            content: renderString,
            initialState: serialize(store.getState())
          })
          res.send(html)
        }
      })
  })
}
