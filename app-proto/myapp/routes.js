var express = require('express')
var router = express.Router()
module.exports = router
var fs = require('fs')

router.get('/', function(req, res, next) {
  res.render('index', {title: "Alfonso"});
})

router.get('/class', function(req, res, next) {
  res.render('class', {course: "CSCI 34000 ", name: "Operating Systems"});
})

router.get('/prof', function(req, res, next) {
  res.render('professor');
})

router.post('/', function(req, res, next) {
  tweetBank.add(req.body.name, req.body.tweet)
  res.status(201).end()
})
