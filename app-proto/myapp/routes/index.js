'use strict';
var router = require('express').Router();
module.exports = router;
//
// router.use('/classes', require('./members'));
// router.use('/account', require('./account'));
// router.use('/transaction', require('./transaction'));
// router.use('/albums', require('./albums'));
// router.use('/reviews', require('./reviews'));
// router.use('/artists', require('./artists'));
// router.use('/promos', require('./promos'));
// router.use('/https://api.spotify.com/v1', require('./tracks'));
//

/* GET users listing. */
router.get('/class', function(req, res, next) {
  res.render('classes', { title: 'CSCI 34000', name: "Operating Systems" });
});


module.exports = router;
