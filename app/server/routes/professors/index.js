'use strict'
var router = require('express').Router();
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require("fs"))
var _ = require('lodash'); //extend


// array variables for questions
const organization_q_ids = [3, 15, 16, 19, 20, 17]
const experience_q_ids = [11, 12, 14, 8]
const clarity_q_ids = [1, 4, 5, 6, 13]
const personality_q_ids = [2, 7, 10]

// Helper functions
const onlyUnique = (value, index, self) => {
  return self.indexOf(value) === index;
}
const roundAverage = (element, num) => {
  element.average = Math.round(element.average / num * 100)
  return element
}
const aggregates_experience = (professors, courseId) => (
  professors.courses.reduce((total, course) =>
    course.subject === courseId ? total + 1 : total , 0)
);

// Parser from Server
const parseProfJSON = (data) => {
    let prof = JSON.parse(data)
    prof.courseTitles = []
    prof.courses.forEach(element => {
            prof.courseTitles.push((element.subject).split(' ').join('_'));
        })
    prof.courseTitles = prof.courseTitles.filter(onlyUnique).sort();
    return prof
  }

// Getter Functions
const getProf = (file) => {
  return fs.readFileAsync(file, 'utf8');
}
const getSemesters = (professorArray, id) => {
  return professorArray.courses.filter((course) => course.subject === id)
}

const getSingleRatings = (semester) => {
  const ratings = semester.questions.map((question) => {
    if (question.id <= 9)
      return roundAverage(question, 7)
    else if (question.id <= 14)
      return roundAverage(question, 3)
    else
      return question
    })
  return ratings
}
const getCourseDetail = (professor, courseId) => {
  const semester = professor.courses.find((course) => course.subject === courseId)
    return {
      semester: semester.semester,
      subject: semester.subject
    }
}

// Ratings Class
class Ratings {

  setQuestions(ids) {
    return this.ratings.filter((question) =>
    ids.includes(question.id));
  }

  constructor(semester, times_taught) {
    this.ratings = getSingleRatings(semester);
    this.organization = this.setQuestions(organization_q_ids)
    this.clarity = this.setQuestions(clarity_q_ids)
    this.personality = this.setQuestions(personality_q_ids)
    this.experience = this.setQuestions(experience_q_ids)
    this.times_taught = times_taught
    this.experience.push({
      id: 'XX',
      question: 'Times the professor taught this class',
      average: times_taught
    });
  }
}

// routes
router.get('/', (req, res) => {
  res.render('professors_list');
})

router.get('/:prof', (req, res) => {
  let file = __dirname + '/' + req.params.prof + '.json';

  getProf(file).then((data) => {
    let professors = parseProfJSON(data)

    res.render('professor', {
        professor: professors,
        courses: professors.courseTitles,
        helpers: {
          lower: (word) => {
            return word.toLowerCase()
          }
        }
      })
    })
  })

router.get('/:prof/:course', (req, res) => {
  let file = __dirname + '/' + req.params.prof + '.json';
  let courseId = req.params.course.replace(/_/g, " ");

  getProf(file).then((data) => {
    const professor = parseProfJSON(data);
    const semesters = getSemesters(professor, courseId);
    const times_taught = aggregates_experience(professor, courseId)
    const ratings = new Ratings(semesters[0], times_taught);
    const courseDetail = getCourseDetail(professor, courseId);

    res.render('course', {
      professor: professor,
      course: courseDetail,
      clarity: ratings.clarity,
      organization: ratings.organization,
      experience: ratings.experience,
      personality: ratings.personality
    });
  });
});






module.exports = router;
