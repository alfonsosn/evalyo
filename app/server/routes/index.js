var express = require('express')
var router = express.Router()
var professorRouter = require('./professors.js')

router.use('/professors', professorRouter);

module.exports = router;
