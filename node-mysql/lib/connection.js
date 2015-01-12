var mysql = require('mysql')
var config = require('../config')
var Rest = require('./Rest')

connection = mysql.createConnection({
  host     : config.host,
  user     : config.user,
  password : config.password,
  database : config.database
})

connection.connect()

// connection.end()

module.exports = new Rest(connection)
