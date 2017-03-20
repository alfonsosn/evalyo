var router = require('express').Router();
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require("fs"))
var _ = require('lodash'); //extend


// helper functions

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

var getProf = function(file) {
  return fs.readFileAsync(file, 'utf8');
}

var parseProfJSON = function(data){
    var prof = (JSON.parse(data))
    prof.courseTitles = []
    prof.courses.forEach(function(element){
            prof.courseTitles.push((element.subject).split(' ').join('_'));
        })
    prof.courseTitles = prof.courseTitles.filter(onlyUnique).sort();
    return prof
  }


var reviewAggregation = function(data){
  console.log("hello")
}
// routes

router.get('/', function(req, res, next) {
  res.render('professors_list');
})

router.get('/:prof', function(req, res, next) {
  var file = __dirname + '/' + req.params.prof + '.json';
  getProf(file).then(function(data) {
    professor = parseProfJSON(data)
    res.render('professor', {professor: professor, courses: professor.courseTitles, helpers: {
              lower: function(data){
                  return data.toLowerCase()
              }
            }
          })
        })
      })

router.get('/:prof/:course', function(req, res, next) {
  var file = __dirname + '/' + req.params.prof + '.json';
  var courseId = req.params.course.replace(/_/g, " ");

  getProf(file).then(function(data) {
    professor = parseProfJSON(data)
    reviews = []
    professor.courses.forEach(function(element){
      if (element.subject == courseId)
        reviews.push(element);
    });
    res.json(reviews);
  });
});










module.exports = router;
