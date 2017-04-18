var express = require('express')
var router = express.Router()
var p = require('./parser.js')
var h = require('./helpers.js')

router.get('/:prof', (req, res) => {
  let file = __dirname + '/data/cs_professors/' + req.params.prof + '.json';

  p.getJSON(file).then((data) => {
    let professor_courses = p.parseProfJSON(data)
    res.send(professor_courses)
  })
})

router.get('/:prof/:course', (req, res) => {
  let file = __dirname + '/data/cs_professors/' + req.params.prof + '.json';
  let course_id = req.params.course.replace(/_/g, " ");

  p.getJSON(file).then((data) => {
    const professor = p.parseProfJSON(data);
    const semesters_ratings = h.getSemesters(professor, course_id);
    const times_taught = h.aggregatesExperience(professor, course_id);
    const courses = h.newEvaluation(semesters_ratings, times_taught);
    const subject = h.getCourseSubject(professor, course_id);

    res.send(courses.evaluations.reverse())
  });
});

router.get('/:prof/:course/:semester', (req, res) => {
  let file = __dirname + '/data/cs_professors/' + req.params.prof + '.json';
  let course_id = req.params.course.replace(/_/g, " ");

  p.getJSON(file).then((data) => {
    const professor = p.parseProfJSON(data);
    const semesters_ratings = h.getSemesters(professor, course_id);
    const times_taught = h.aggregatesExperience(professor, course_id);
    const courses = h.newEvaluation(semesters_ratings, times_taught);
    const subject = h.getCourseSubject(professor, course_id);

    res.send(courses.evaluations.filter((course) => course.semester ===  req.params.semester))
  
  });
});

module.exports = router;
