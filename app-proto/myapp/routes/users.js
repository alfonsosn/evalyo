var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/class', function(req, res, next) {
  res.render('classes', { title: 'CSCI 34000', name: "Operating Systems" });
});

module.exports = router;
