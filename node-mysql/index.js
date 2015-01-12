require('./lib/connection')
var express = require('express')
var app = express()
var bodyParser = require("body-parser")
var routes = require('./routes/user')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use('/', routes)

app.listen(8888, function () {
  console.log('server listen on 8888')
})

