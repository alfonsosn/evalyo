'use strict'
var router = require('express').Router();
var p = require('./parser.js')
var h = require('./helpers.js')
const Course = require('../../../db/models/courses')

// routes
router.get('/', (req, res) => {
  res.render('professors_list');
})

router.get('/:prof', (req, res) => {
 console.log(req.params.prof)
  Course.find({firstName : req.params.prof.toUpperCase()}, (error, courses) => {
    if (error) console.log(error)
    
    const professor = courses[0] ? 
      { firstName: '', lastName: '' }
      : { firstName: courses[0].firstName, 
          lastName: courses[0].lastName }
         
    const titles = courses.map(course => course.subject)
    
    res.render('professor', {
      professor: professor,
      courses: titles,
      helpers: {
        lower: (word) => {
          return word.toLowerCase()
        }
      }
    })
  })
  //  let file = __dirname + '/cs_professors/' + req.params.prof + '.json';
  // p.getJSON(file).then((data) => {
  //   Course.
})

router.get('/:prof/:course', (req, res) => {
  let file = __dirname + '/cs_professors/' + req.params.prof + '.json';
  let courseId = req.params.course.replace(/_/g, " ");

  p.getJSON(file).then((data) => {
    const professor = p.parseProfJSON(data);
    const semesters_ratings = h.getSemesters(professor, courseId);
    const times_taught = h.aggregatesExperience(professor, courseId);
    const evaluations = h.newEvaluation(semesters_ratings, times_taught);
    const subject = h.getCourseSubject(professor, courseId);

    res.render('course', {
      professor: professor,
      course: subject,
      evaluations: evaluations
    });
  });
});

module.exports = router;
