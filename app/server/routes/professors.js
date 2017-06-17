var express = require('express')
var router = express.Router()
var p = require('./parser.js')
var h = require('./helpers.js')

const ProfessorModel = require('../models/professors');
const CourseModel = require('../models/courses')
const RatingsModel = require('../models/ratings')

router.get('/search/:name', (req, res) => {
  const name = req.params.name
  ProfessorModel.find({$text: { $search: name }})
  .then((prof) => {
    res.send(prof)
  })
})

router.get('/:prof', (req, res) => {
  ProfessorModel.findOne({_id: req.params.prof})
  .populate('courses')
  .then((prof) => {
     res.send(prof)
  })
})


router.get('/:prof/:course', (req, res) => {
  const course_id = req.params.course
  const prof_id = req.params.prof

  RatingsModel.find({professor: prof_id, subject: course_id})
    .then((ratings) => {
       res.send(ratings) 
    })
})

module.exports = router;
