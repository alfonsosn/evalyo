'use strict'
var router = require('express').Router();
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require("fs"))
// var _ = require('lodash'); //extend


// helper functions
const onlyUnique = function(value, index, self) {
  return self.indexOf(value) === index;
}

const getProf = function(file) {
  return fs.readFileAsync(file, 'utf8');
}

const parseProfJSON = function(data){
    let prof = JSON.parse(data)
    prof.courseTitles = []
    prof.courses.forEach(element => {
            prof.courseTitles.push((element.subject).split(' ').join('_'));
        })
    prof.courseTitles = prof.courseTitles.filter(onlyUnique).sort();
    return prof
  }

const obtainReviews = function(professors, courseId){
  let reviews = []
  professors.courses.forEach((element) => {
    if (element.subject === courseId)
      reviews.push(element);
  });
  return reviews
}


// routes
router.get('/', function(req, res, next) {
  res.render('professors_list');
  next(null)
})


router.get('/:prof', function(req, res, next) {
  let file = __dirname + '/' + req.params.prof + '.json';
  getProf(file)
  .then(function(data) {
    let professors = parseProfJSON(data)
    res.render('professor', {professor: professors, courses: professors.courseTitles, helpers: {
              lower: (word) => {
                  return word.toLowerCase()
              }
            }
          })
        })
        next(null)
      })


router.get('/:prof/:course', function(req, res, next) {
  let file = __dirname + '/' + req.params.prof + '.json';
  let courseId = req.params.course.replace(/_/g, " ");

  getProf(file).then((data) => {
    let professor = parseProfJSON(data)
    let reviews = obtainReviews(professor, courseId)
    res.json(reviews);
  });
  next(null)
});






module.exports = router;
