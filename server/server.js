const express = require('express')
const ReactSSR = require('react-dom/server')
const fs = require('fs')
const path = require('path')
const serverEntry = require('../dist/server-entry').default

const app = express()

app.use( '/public', express.static(path.join(__dirname, '../dist')))

app.get('*', (req, res) => {
  const renderString = ReactSSR.renderToString(serverEntry)
  let template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf-8')
  template = template.replace('<!-- ssr -->', renderString)
  res.send(template)
})

app.listen(3333, ()=> {
  console.log('server listening on 3333')
})