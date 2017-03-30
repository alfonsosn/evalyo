'use strict';
var router = require('express').Router();
var p = require('./parser.js')

/* GET classes. */
router.get('/', function(req, res) {
  let file = __dirname + '/cs_courses/courses.json';

  p.getJSON(file).then((data) => {
    let courses = p.parseCoursesJSON(data)
    res.render('class', {
      courses: courses
    })
  })
})

module.exports = router;
