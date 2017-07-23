import {pipe, map, find, filter, prop, head, groupBy, concat} from 'ramda'
import {withProps } from 'recompose'

// category arrays
const organization_q_ids = [3, 15, 16, 19, 20, 17];
const experience_q_ids = [11, 12, 14, 8, -1];
const clarity_q_ids = [1, 4, 5, 6, 13];
const personality_q_ids = [2, 7, 10];
const AGGREGATE_Q_ID = '-1'
const aggregateOption =  {
      value: AGGREGATE_Q_ID,
      label: 'Aggregate'
    }



/**
 * Rating Object
 * @typedef {Object} Rating
 * @property {number} id
 * @property {string} question
 * @property {string} [average]
 * @property {string} [yes]
 * @property {string} [no]
 */

const timesTaughtRating = (timesTaught) => ({
  id: -1,
  question: 'Times the professor taught this class',
  average: timesTaught  
})

const roundAverage = (element, num) => Math.round(element.average / num * 100)

/**
* @function normalizeAverages
* @param  {Array<.Rating>} questions {description}
* @return {Array<.Rating>} {description}
*/
const normalizeAverages = (ratings) => 
  ratings.map((rating) => 
    rating.id <= 9 ?
        {...rating,
        average: roundAverage(rating, 7)
        }
    : rating.id <= 14 ?
        {...rating,
        average: roundAverage(rating, 3)
        }
    : rating
  )


    
/**
* @function addRatingsArray
* @param  {Array.<Rating>} first  {array of ratings}
* @param  {Array.<Rating>} second {array of ratings}
* @return {Array.<Rating>} {array of ratings resulting 
                            from adding ratings with same index}
*/
const addRatingsArray = (first, second) => 
    first.map((rating, index) => 
      rating.id <= 14 ? 
        {...rating,
          average: Number(first[index].average) + Number(second[index].average)
        }
      : {...rating,
          yes: Number(first[index].yes) + Number(second[index].yes),
          no: Number(first[index].no) + Number(second[index].no),
          noAnswer: Number(first[index].noAnswer) + Number(second[index].noAnswer)
        }
    )

/**
* @function add
* @param  {Array.<Array.<Object>>} arrOfArrs {description}
* @return {type} {description}
*/
const addReduce = (arrOfArrs) => arrOfArrs.reduce(addRatingsArray)
 

/**
* @function divideBy
* @param  {Number} numOfRatings {description}
* @param {divideByCallback} arr {}
*/
const divideBy = (numOfRatings) => (arr) => arr.map((rating) => 
  rating.id <= 14 ?
    {...rating,
      average: rating.average / numOfRatings
    }   
  : {...rating,
      yes: rating.yes / numOfRatings,
      no: rating.no / numOfRatings,
      noAnswer: rating.noAnswer / numOfRatings
  }
)


/** 
* @function generate aggregate ratings
* @param  {Array.<Object[]>} ratings {}
* @return {Array.<Object>} {aggregated ratings}
*/
const aggregateRatings = (ratings) => {
  // Convert ratings to an array of arrays 
  const arrOfArrs = ratings.map(rating => rating.questions)
  const numOfRatings = arrOfArrs.length
  // convert to a single array with values added up
 // const addReduced = addReduce(arrOfArrs)
  // divide values by number of ratings
  return pipe(addReduce, divideBy(numOfRatings))(arrOfArrs)
}

/**
* @function sortRatings
* @param  {Array.<Object>} ratings      {description}
* @param  {Number} times_taught {description}
*/
const sortRatings = (timesTaught) => (ratings) => {
  const normalized = [...normalizeAverages(ratings), 
                      timesTaughtRating(timesTaught)]              

  return {
        organization: normalized.filter(rating => 
          organization_q_ids.includes(rating.id)),
        experience: normalized.filter(rating => 
          experience_q_ids.includes(rating.id)),
        clarity: normalized.filter(rating => 
          clarity_q_ids.includes(rating.id)),
        personality: normalized.filter(rating =>
          personality_q_ids.includes(rating.id))
   }
}


const makeSemesterOption = (rating) => {
  const section = rating.section? 'sec ' + rating.section : ''
  return {
    value: rating._id,
    children: rating.semester + ' ' + rating.year + ' ' + section
  }
} 

const generateSemesterTitles = (ratings) => ratings.map(makeSemesterOption)

const replaceSpaces = (string) =>  string.replace(/_/g, " ")

const makeCourseOption = (course) => ({
    value: course._id,
    children: replaceSpaces(course.subject)
})

const generateCourseTitles = (courses) => courses.map(makeCourseOption)

const getTimesTaught = (professors, courseId) => 
    professors.courses.reduce((total, course) => (
      course.subject === courseId ? total + 1 : total
    ), 0)

const getAggregateRating = (ratings, times_taught) =>
    pipe(aggregateRatings,
         sortRatings(times_taught))(ratings)

const getRatingById =  (ratings, ratingId, timesTaught) =>
    pipe(find(rating => rating._id === ratingId), // propEq('_id', ratingId)
         prop('questions'), 
         sortRatings(timesTaught))(ratings)

// EXPORT FUNCTIONS
export default withProps({
  getTimesTaught,
  sortRatings,
  aggregateRatings,
  generateSemesterTitles,
  generateCourseTitles,
  getAggregateRating,
  getRatingById,
  aggregateOption,
  AGGREGATE_Q_ID
})