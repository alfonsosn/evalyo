var express = require('express')
var router = express.Router()

const departmentModel = require('../models/departments')

router.get('/', (req, res) => {
  departmentModel.find({}).select('name')
    .then((departments) => {
      res.send(departments)
  })
})

router.get('/:department', (req, res) => {

   departmentModel.findOne({name: req.params.department.toUpperCase()})
  .populate('professors', 'firstName lastName').then((departments) => {
    res.send(departments)
  })
})


module.exports = router;