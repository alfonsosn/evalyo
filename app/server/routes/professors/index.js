'use strict'
var router = require('express').Router();
var p = require('./parser.js')
var h = require('./helpers.js')
require('../../../db/models/courses')
const Professor = require('../../../db/models/professors')

// routes
router.get('/', (req, res) => {
  res.render('professors_list');
})

router.get('/:prof', (req, res) => {
 console.log(req.params.prof)
  Professor.findOne({firstName : req.params.prof.toUpperCase()})
  .populate('courses', 'subject')
  .exec((error, professor) => {
    if (error) console.log(error)
    console.log(professor)
    const titles = professor.courses.map(course => course.subject)
    
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
