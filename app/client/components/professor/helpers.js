var _ = require('lodash'); //extend

// ARRAY variables for questions
const organization_q_ids = [3, 15, 16, 19, 20, 17];
const experience_q_ids = [11, 12, 14, 8];
const clarity_q_ids = [1, 4, 5, 6, 13];
const personality_q_ids = [2, 7, 10];

// HELPER functions

const roundAverage = (element, num) => Math.round(element.average / num * 100)

const normalizeAverages = (questions) => 
  questions.map((question) => 
    question.id <= 9 ?
        {...question,
         average: roundAverage(question, 7)
        }
    : question.id <= 14 ?
        {...question,
         average: roundAverage(question, 3)
        }
    : question
  )

// Ratings Class
class Ratings {
  setQuestions(ids) {
    return this.ratings.filter((question) => ids.includes(question.id));
  }

  constructor(semester, times_taught) {
   // this.ratings = getSingleRatings(semester);
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
    return this.ratings.filter((question) => ids.includes(question.id));
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

  getEvaluations (semesters_ratings) {
      let evaluations = []
      semesters_ratings.forEach((rating) => {
         evaluations.push(new Ratings(rating, this.times_taught))
      });

      let all_questions = this.aggregateQuestions(semesters_ratings)
      let aggregateReview = {}
      aggregateReview.semester = 'Aggregate'
      aggregateReview.subject = semesters_ratings[0].subject
      aggregateReview.questions = this.aggregator(all_questions)

      evaluations.push(new aggRating(aggregateReview, this.times_taught))
      return evaluations
  }

  constructor(semester_ratings, times_taught){
    this.evaluations = []
    this.times_taught = times_taught
    this.evaluations = this.getEvaluations(semester_ratings)
  }
}

const generateSortedRatings = (ratings) => {
  const normalizedRatings = normalizeAverages(ratings)
  return {
        organization: normalizedRatings.filter(rating => 
          organization_q_ids.includes(rating.id)),
        experience: normalizedRatings.filter(rating => 
          experience_q_ids.includes(rating.id)),
        clarity: normalizedRatings.filter(rating => 
          clarity_q_ids.includes(rating.id)),
        personality: normalizedRatings.filter(rating =>
          personality_q_ids.includes(rating.id))
   }
}
// EXPORT FUNCTIONS
export default {
  getTimesTaught: (professors, courseId) => (
    professors.courses.reduce((total, course) =>
      course.subject === courseId ? total + 1 : total , 0)
  ),

  sortRatings: (ratings) => generateSortedRatings(ratings)
  
}