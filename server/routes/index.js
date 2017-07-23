var express = require('express')
var router = express.Router()
var professorRouter = require('./professors')
var departmentRouter = require('./departments')

router.use('/professors', professorRouter);
router.use('/departments', departmentRouter);

module.exports = router;
