var express = require('express')
var router = express.Router()
var rest = require('../lib/connection')

var url = '/user'
var tableName = 'user'

router.get(url, function (req, res) {
  rest.findAll(tableName)
  .then(function (results) {
    res.send(results)
  }, function (err) {
    res.send(err)
  })
})

router.get(url + '/:userId', function (req, res) {
  var userId = req.params.userId

  rest.find(tableName, {
    where: {
      id: userId
    }
  }).then(function (result) {
    res.json(result[0])
  }, function (err) {
    res.json(err)
  })
})

router.post(url, function (req, res) {
  var data = req.body

  rest.create(tableName, data)
  .then(function (result) {
    res.json(result)
  }, function (err) {
    res.json(err)
  })
})

router.delete(url + '/:userId', function (req, res) {
  var userId = req.params.userId

  rest.destroy(tableName, {
    where: {
      id: userId
    }
  }).then(function (id) {
    res.sendStatus(204)
  }, function (err) {
    res.json(err)
  })
})

router.patch(url + '/:userId', function (req, res) {
  var userId = req.params.userId
  var data = req.body

  rest.update(tableName, data, {
    where: {
      id: userId
    }
  }).then(function (result) {
    res.sendStatus(200) 
  }, function (err) {
    res.send(err)
  })
})

module.exports = router
