'use strict';
var router = require('express').Router();
module.exports = router;

/* GET classes. */
router.get('/', function(req, res, next) {
  res.render('class', { title: 'CSCI 34000', name: "Operating Systems" });
  next(null)
});

module.exports = router;
