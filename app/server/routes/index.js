'use strict';
var router = require('express').Router();
module.exports = router;

// redirect all traffic to appropriate routes
router.use('/professor', require('./professors'));
router.use('/class', require('./classes'));

// redirect to main page
router.get('/', function(req, res) {
  res.render('index', {title: "Alfonso"});
})

// Make sure this is after all of the registered routes!
router.use(function(req, res) {
	res.status(404).end()
});
