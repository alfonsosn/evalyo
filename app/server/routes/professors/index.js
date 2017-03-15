var router = require('express').Router();
var fs = require('fs');
var _ = require('lodash'); //extend

// helper functions

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

// routes

router.get('/', function(req, res, next) {
  res.render('professors_list');
})

router.get('/:prof', function(req, res, next) {
  var file = __dirname + '/' + req.params.prof + '.json';

  fs.exists(file, function(exists) {
    if (exists) {
      fs.readFile(file, 'utf8', function(err, data) {
        var prof = (JSON.parse(data));
        var courses = [];
        prof.courses.forEach(function(element){
            courses.push((element.subject).split(' ').join('_'));
        })

        courses = courses.filter(onlyUnique);
        courses.sort();
        res.render('professor', {professor: prof, courses: courses});

      });

    }

    else {
      console.error('Professor does not exist');
      next(null);
    }
  });
})

router.get('/:prof/:course', function(req, res, next) {
  var file = __dirname + '/' + req.params.prof + '.json';
  var courseId = req.params.course.replace(/_/g, " ");

  fs.exists(file, function(exists) {
      if (exists) {
          fs.readFile(file, 'utf8', function(err, data) {
            var prof = (JSON.parse(data));
            courses = []
            prof.courses.forEach(function(element){
              if (element.subject == courseId)
                courses.push(element);
            });
            res.json(courses);
          });
        }

        else {
          next(null);
        }
    });
  });

module.exports = router;
