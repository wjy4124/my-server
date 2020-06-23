const express = require('express')
const app = express()
const process = require('process')
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use((req, res, next) => {
  res.customRes = function({code = 0, msg = 'success', data = {}} = {}) {
    this.json({
      code,
      msg,
      data
    })
  };
  next()
})

app.use('/test', require('./routers/test'))

let port = process.env.PORT || 3000
app.listen(port, e => {
  console.log(`listen on ${port}`)
})
