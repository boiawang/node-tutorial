var mysql = require('mysql') 
var events = require('events') 
var util = require('util') 
var Q = require('q')
var qs = require('querystring')

var config = require('../config') 

var Rest = function (connection) {
  events.EventEmitter.call(this) 

  this.connection = connection 
} 

util.inherits(Rest, events.EventEmitter) 

// 增加
Rest.prototype.create = function (tableName, values, options) {
  var deferred = Q.defer()
  var that = this

  if (!options) {
    options = {}
  }

  var query = this.connection.query('INSERT INTO '+ tableName +' SET ?', values, function(err, result) {
    if (err) {
      return deferred.reject(err) 
    }

    that.find(tableName, {
      where: {
        id: result.insertId
      }
    }).then(function (result) {
      return deferred.resolve(result[0])
    })
  }) 

  return deferred.promise
} 

// 删除
Rest.prototype.destroy = function (tableName, options) {
  var deferred = Q.defer()
  var sql = 'DELETE FROM ' + tableName
  
  if (options.where) {
    sql += ' WHERE ' + qs.stringify(options.where, ' AND ', ' = ')
  }

  console.log(sql)

  this.connection.query(sql, function (err, result) {
    if (err) {
      return deferred.reject(err)
    }
    return deferred.resolve(result)
  })

  return deferred.promise
} 

// 更新
Rest.prototype.update = function (tableName, values, options) {
  var deferred = Q.defer()
  var keys = []
  var sql = 'UPDATE ' + tableName + ' SET ?'
  
  if (!options) {
    options = {}
  }

  if (options.where) {
    sql += ' WHERE ' + qs.stringify(options.where, ' AND ', ' = ')
  }

  this.connection.query(sql, values, function (err, result) {
    if (err) {
      return deferred.reject(err)
    }
    console.log(result)
    return deferred.resolve(result)
  })

  return deferred.promise
} 

// 查找
Rest.prototype.find = function (tableName, options) {
  var deferred = Q.defer()
  var sql = 'SELECT * FROM ' + tableName

  if (!options) {
    options = {}
    options.where = {}
  }

  if (options.where.id) {
    sql += ' WHERE id = ' + options.where.id
  }

  this.connection.query(sql, function (err, result) {
    if (err) {
      return deferred.reject(err)
    }
    return deferred.resolve(result)
  })

  return deferred.promise
} 

Rest.prototype.findAll = function (tableName) {
  var deferred = Q.defer()
  var sql = 'SELECT * FROM ' + tableName

  this.connection.query(sql, function (err, results) {
    if (err) {
      return deferred.reject(err)
    }
    return deferred.resolve(results)
  })

  return deferred.promise
}

module.exports = Rest
