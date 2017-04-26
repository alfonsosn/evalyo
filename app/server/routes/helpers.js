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


// Ratings Class
class Ratings {
  setQuestions(ids) {
    return this.ratings.filter((question) => ids.includes(question.id));
  }

  constructor(semester, times_taught) {
    this.ratings = getSingleRatings(semester);
    this.semester = semester.semester;
    this.organization = this.setQuestions(organization_q_ids);
    this.clarity = this.setQuestions(clarity_q_ids);
    this.personality = this.setQuestions(personality_q_ids);
    this.times_taught = times_taught;
    this.experience = this.setQuestions(experience_q_ids).concat([{
      id: 'XX',
      question: 'Times the professor taught this class',
      average: times_taught
    }]);
  }
}

class aggRating {
  setQuestions(ids) {
    return this.ratings.filter((question) =>
    ids.includes(question.id));
  }

  constructor(semester, times_taught) {
    this.ratings = semester.questions
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

  aggregator(arr){
     let length = 20
     let number_of_courses = arr.length
     let aggregateArr = []
     for (let i = 0; i < length; i++){
       let question = {
         id: arr[0][i].id,
         question: arr[0][i].question,
       }

       if (arr[0][i].average){
         question.average = 0
         for (let j = 0; j < number_of_courses; j++){
            question.average += arr[j][i].average
         }
         // dividing by number of courses to get the average
         question.average = Math.round(question.average / number_of_courses)
       } else {
         question.yes = 0
         question.no = 0
         for (let j = 0; j < number_of_courses; j++){
            question.yes += Number(arr[j][i].yes)
            question.no += Number(arr[j][i].no)
         }
       }
       aggregateArr.push(question)
     }

     return aggregateArr
  }

  aggregateQuestions(ratings_array) {
    let aggregator = []
    ratings_array.forEach((rating) => {
      aggregator.push(rating.questions)
    })
    return aggregator
  }

  setEvaluation (semesters) {
      semesters.forEach((rating) => {
        this.evaluations.push(new Ratings(rating, this.times_taught))
      });
      let all_questions = this.aggregateQuestions(semesters)
      let aggregateReview = {}
      aggregateReview.semester = 'Aggregate'
      aggregateReview.subject = semesters[0].subject
      aggregateReview.questions = this.aggregator(all_questions)
      this.evaluations.push(new aggRating(aggregateReview, this.times_taught))
  }

  constructor(semester_ratings, times_taught){
    this.evaluations = []
    this.times_taught = times_taught
    this.setEvaluation(semester_ratings)
  }
}

// EXPORT FUNCTIONS

exports.getTimesTaught = (professors, courseId) => (
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
