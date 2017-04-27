// category arrays
const organization_q_ids = [3, 15, 16, 19, 20, 17];
const experience_q_ids = [11, 12, 14, 8, -1];
const clarity_q_ids = [1, 4, 5, 6, 13];
const personality_q_ids = [2, 7, 10];

// HELPER functions

const roundAverage = (element, num) => Math.round(element.average / num * 100)

/**
* @function normalizeAverages
* @param  {Array<.Object>} questions {description}
* @return {Array<.Object>} {description}
*/
const normalizeRatings = (questions) => 
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

/**
* @function generate aggregate ratings
* @param  {Array.<Object>} ratings {description}
* @param  {Number} times_taught {description}
* @return {Array.<Object>} {aggregated ratings}
*/
const aggregate = (ratings, times_taught) => {
  const allQuestions = ratings.map(rating => rating.questions)
  const added = allQuestions.reduce((acc, curr) => 
    acc.map((question, index) => 
      question.id <= 14 ? 
        {...question,
         average: Number(acc[index].average) + Number(curr[index].average)
        }
      : {...question,
         yes: Number(acc[index].yes) + Number(curr[index].yes),
         no: Number(acc[index].no) + Number(curr[index].no),
         noAnswer: Number(acc[index].noAnswer) + Number(curr[index].noAnswer)
        }
    )
  )
  const numOfRatings = allQuestions.length;
  const aggregated = added.map((question) => 
    question.id <= 14 ?
      {...question,
       average: question.average / numOfRatings
      }   
    : {...question,
       yes: question.yes / numOfRatings,
       no: question.no / numOfRatings,
       noAnswer: question.noAnswer / numOfRatings
    }
  )
 
  return aggregated
}

/**
* @function generateSortedRatings
* @param  {Array.<Object>} ratings      {description}
* @param  {Number} times_taught {description}
*/
const generateSortedRatings = (ratings, times_taught) => {
  const normalizedRatings = normalizeRatings(ratings).concat([{
      id: -1,
      question: 'Times the professor taught this class',
      average: times_taught
    }])

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
      course.subject === courseId ? total + 1 : total , 0
    )
  ),

  sortRatings: (ratings, times_taught) => generateSortedRatings(ratings, times_taught),
  aggregate: (ratings, times_taught) => aggregate(ratings, times_taught)
}