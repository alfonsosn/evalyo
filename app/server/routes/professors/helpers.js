var _ = require('lodash'); //extend

// ARRAY variables for questions
const organization_q_ids = [3, 15, 16, 19, 20, 17];
const experience_q_ids = [11, 12, 14, 8];
const clarity_q_ids = [1, 4, 5, 6, 13];
const personality_q_ids = [2, 7, 10];

// HELPER functions

const roundAverage = (element, num) => {
  element.average = Math.round(element.average / num * 100)
  return element
}

const getSingleRatings = (semester) => {
  let ratings = semester.questions.map((question) => {
    if (question.id <= 9)
      return roundAverage(question, 7)
    else if (question.id <= 14)
      return roundAverage(question, 3)
    else
      return question
    })
  return ratings
}

// needs refactoring

const aggregateRatings = (ratings_array) => {
  ratings_array.forEach((element, index, arr) => {
    element.count = 1
    for (var j = index + 1; j < arr.length; j++){
      if (element.id === arr[j].id) {
        if (_.has(element, 'average')){
          element.average += arr[j].average;
        }
        else if (_.has(element, 'average')){
          element.yes = filterInt(element.yes);
          element.no = filterInt(element.no);
          element.noAnswer = filterInt(element.noAnswers);
          element.yes += filterInt(arr[j].yes);
          element.no += filterInt(arr[j].no);
          element.noAnswer += filterInt(arr[j].noAnswers);
        }
        element.count++;
        arr.splice(j, 1);
      }
    }
    if (element.id <= 15){
      element.average = element.average / element.count
      element.average = _.round(element.average, 2);
    }
  });
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

// Evaluations class

class Evaluation {
  setEvaluation (semesters) {
      let aggregate = [ ]
      semesters.forEach((rating) => {
        this.evaluations.push(new Ratings(rating, this.times_taught))
      });
      semesters.forEach((rating) => {
        aggregate.push(rating.questions)
      })
      let all_questions = _.flatten(aggregate)
      aggregateRatings(all_questions)
      let aggregateRating = {};
      aggregateRating.semester = 'Aggregate';
      aggregateRating.semester = 'Aggregate';
      aggregateRating.questions = all_questions
      console.log(aggregateRating)
    }

  constructor(semester_ratings, times_taught){
    this.evaluations = []
    this.times_taught = times_taught
    this.setEvaluation(semester_ratings)
  }
}

// EXPORT FUNCTIONS

exports.aggregatesExperience = (professors, courseId) => (
  professors.courses.reduce((total, course) =>
    course.subject === courseId ? total + 1 : total , 0)
)

exports.getSemesters = (professorArray, id) => {
  return professorArray.courses.filter((course) => course.subject === id)
}

exports.getCourseSubject = (professor, courseId) => {
  let semester = professor.courses.find((course) => course.subject === courseId)
    return {
      subject: semester.subject
    }
}

exports.newEvaluation = (semesters, times) => {
  return new Evaluation(semesters, times)
}
