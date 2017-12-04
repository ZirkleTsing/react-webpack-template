const express = require('express')
const ReactSSR = require('react-dom/server')
const fs = require('fs')
const path = require('path')
const favicon = require('serve-favicon')
const serverDevRender = require('./util/server-development')
const serverRender = require('./util/server-render').serverRender

const app = express()

const isDev = process.env.NODE_ENV === 'production'

app.use(favicon(path.join(path.join(__dirname, '../favicon.ico'))))

if(isDev) {
  app.use( '/public', express.static(path.join(__dirname, '../dist')))

  app.get('*', (req, res) => {
    const serverEntry = require('../dist/server-entry').ServerSideRender
    let template = fs.readFileSync(path.join(__dirname, '../dist/index.server.html'), 'utf-8')
    serverRender(serverEntry, template, req, res)
  })
} else {
  serverDevRender(app)
}


app.listen(3333, ()=> {
  console.log('server listening on 3333')
})
