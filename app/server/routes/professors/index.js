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

const aggregatesExperience = (professors, courseId) => (
  professors.courses.reduce((total, course) =>
    course.subject === courseId ? total + 1 : total , 0)
);

const aggregateRatings = (ratings_array) => {
  ratings_array.forEach((element, index, arr) => {
    element.count = 1
    for (var j = index + 1; j < arr.length; j++){
      if (element.id === arr[j].id){
        element.average += arr[j].average;
        element.count++;
        arr.splice(j, 1);
      }
    }
    element.average = element.average / element.count
  });
}





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

const getCourseSubject = (professor, courseId) => {
  const semester = professor.courses.find((course) => course.subject === courseId)
    return {
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
    this.semester = semester.semester;
    this.organization = this.setQuestions(organization_q_ids);
    this.clarity = this.setQuestions(clarity_q_ids);
    this.personality = this.setQuestions(personality_q_ids);
    this.experience = this.setQuestions(experience_q_ids);
    this.times_taught = times_taught;
    this.experience.push({
      id: 'XX',
      question: 'Times the professor taught this class',
      average: times_taught
    });
  }
}

class Evaluation {
  setEvaluation (semesters) {
    semesters.forEach((rating) => {
        this.evaluations.push(new Ratings(rating, this.times_taught))
      });
    }

  constructor(semester_ratings, times_taught){
    this.evaluations = []
    this.times_taught = times_taught
    this.setEvaluation(semester_ratings)
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
    const semesters_ratings = getSemesters(professor, courseId);
    const times_taught = aggregatesExperience(professor, courseId);
    const evaluations = new Evaluation(semesters_ratings, times_taught);
    const subject = getCourseSubject(professor, courseId);

    res.render('course', {
      professor: professor,
      course: subject,
      evaluations: evaluations
    });
  });
});

module.exports = router;
