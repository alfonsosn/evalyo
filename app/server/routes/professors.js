var express = require('express')
var router = express.Router()
var p = require('./parser.js')
var h = require('./helpers.js')

const ProfessorModel = require('../models/professors');
const CourseModel = require('../models/courses')
const RatingsModel = require('../models/ratings')

router.get('/:prof', (req, res) => {
  ProfessorModel.findOne({firstName: req.params.prof.toUpperCase()})
  .populate('courses')
  .then((prof) => {
     res.send(prof)
  })
})

router.get('/:prof/:course', (req, res) => {
  // let file = __dirname + '/data/cs_professors/' + req.params.prof + '.json';
  // let course_id = req.params.course.replace(/_/g, " ");
 const course_id = req.params.course
 const prof_id = req.params.prof
 console.log('course id: ', course_id)
 console.log('semester id:' )

 RatingsModel.find({professor: prof_id, subject: course_id})
    .then((ratings) => { 
       res.send(ratings) 
    })
})

router.get('/:prof/:course/:semester', (req, res) => {
  let file = __dirname + '/data/cs_professors/' + req.params.prof + '.json';
  let course_id = req.params.course.replace(/_/g, " ");

  p.getJSON(file).then((data) => {
    const professor = p.parseProfJSON(data);
    const semesters_ratings = h.getSemesters(professor, course_id);
    const times_taught = h.getTimesTaught(professor, course_id);
    const courses = h.newEvaluation(semesters_ratings, times_taught);
    const subject = h.getCourseSubject(professor, course_id);

    res.send(courses.evaluations.filter((course) => course.semester ===  req.params.semester))
  
  });
});

module.exports = router;
