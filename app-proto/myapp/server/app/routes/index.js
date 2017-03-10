'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/professors', require('./professors'));

router.get('/', function(req, res, next) {
  res.render('index', {title: "Alfonso"});
})

// Make sure this is after all of
// the registered routes!
router.use(function(req, res) {
	res.status(404).end();
});
