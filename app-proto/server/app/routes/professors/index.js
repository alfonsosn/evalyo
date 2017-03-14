var router = require('express').Router();
var _ = require('lodash'); //extend

router.get('/', function(req, res, next) {
  console.log("hellow")
  res.render('professor');
})


module.exports = router;
