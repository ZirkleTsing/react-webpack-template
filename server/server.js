const express = require('express')
const ReactSSR = require('react-dom/server')
const fs = require('fs')
const path = require('path')
const favicon = require('serve-favicon')
const serverSsrRender = require('./serverSSR')

const app = express()

const isDev = process.env.NODE_ENV === 'production'

app.use(favicon(path.join(path.join(__dirname, '../favicon.ico'))))

if(isDev) {
  app.use( '/public', express.static(path.join(__dirname, '../dist')))

  app.get('*', (req, res) => {
    const serverEntry = require('../dist/server-entry').default
    const renderString = ReactSSR.renderToString(serverEntry)
    let template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf-8')
    template = template.replace('<!-- ssr -->', renderString)
    res.send(template)
  })
} else {
  serverSsrRender(app)
}


app.listen(3333, ()=> {
  console.log('server listening on 3333')
})
