var router = require('express').Router();
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require("fs"))
var _ = require('lodash'); //extend

const organization_q_ids = [3, 15, 16, 19, 20, 17]
const experience_q_ids = [11, 12, 14, 8]
const clarity_q_ids = [1, 4, 5, 6, 13]
const personality_q_ids = [2, 7, 10]

// helper functions
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

const getRatings = (professor, courseId) => {
  const course = professor.courses.find((course) => course.subject == courseId)
  const ratings = course.questions.map((question) => 
    question.id <= 9 ?
      Object.assign(question, {
        average: Math.round(question.average / 7 * 100)
      })
    : question.id <= 14 ? 
      Object.assign(question, {
        average: Math.round(question.average / 3 * 100)
      })
    : question)

  return ratings
}

const getCourseInfo = (professor, courseId) => {
  const course = professor.courses.find((course) => course.subject == courseId)
  return {
    semester: course.semester,
    subject: course.subject
  }
}


function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

// routes
router.get('/', function(req, res, next) {
  res.render('professors_list');
})


router.get('/:prof', function(req, res, next) {
  var file = __dirname + '/' + req.params.prof + '.json';
  getProf(file)
  .then(function(data) {
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
    const courseInfo = getCourseInfo(professor, courseId)
    const questions =  getRatings(professor, courseId)

    // Split questions into categories
    const organization_questions = questions.filter((question) => 
      organization_q_ids.includes(question.id))

    const clarity_questions = questions.filter((question) => 
      clarity_q_ids.includes(question.id))

    const personality_questions = questions.filter((question) => 
      personality_q_ids.includes(question.id))
  
    let experience_questions = questions.filter((question) => 
      experience_q_ids.includes(question.id))
    // get # of times professor taught this course
    const timesTaught = professor.courses.reduce((total, course) => 
      course.subject == courseId ? total + 1 : total , 0)

    experience_questions.push({
      id: 'XX',
      question: 'Times the professor taught this class',
      average: timesTaught
    })  

    res.render('course', {
      professor: professor,
      course: courseInfo, 
      clarity: clarity_questions,
      organization: organization_questions,
      experience: experience_questions,
      personality: personality_questions
    })
  })
})










module.exports = router;
