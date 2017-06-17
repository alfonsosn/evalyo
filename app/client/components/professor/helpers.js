// @flow


import {pipe, map, find, filter, prop, head, groupBy, concat} from 'ramda'
import {withProps } from 'recompose'

// import type aliases
import type {Review, Option, Rating, Course, Professor, SortedReviews} from './types.js'

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

const makeTimesTaughtReview = (timesTaught: number): Review => ({
    id: -1,
    question: 'Times the professor taught this class',
    average: timesTaught  
})

const roundAverage = (average: number, num: number): number => 
    Math.round(average / num * 100)

/**
* @function normalizeAverages
* @param  {Review[]} questions {description}
* @return {Review[]} {description}
*/
const normalizeAverages = (reviews: Review[]): Review[] => {
  return reviews.map((review: Review) => 
    review.id <= 9 && review.average? 
        {...review,
         average: roundAverage(review.average, 7)
        }
    : review.id <= 14 && review.average ?
        {...review,
         average: roundAverage(review.average, 3)
        }
    : review
  )
}

    
/**
* @function addRatingsArrays
* @param  {Review[]} first  {array of reviews}
* @param  {Review[]} second {array of reviews}
* @return {Review[]} {array of reviews resulting 
                            from adding reviews with same index}
*/
const addReviewArrays = (first: Review[], second: Review[]): Review[] => 
    first.map((review: Review, index: number) => 
      review.id <= 14 ? 
        {...review,
          average: first[index].average + second[index].average
        }
      : {...review,
          yes: first[index].yes + second[index].yes,
          no: first[index].no + second[index].no,
          noAnswer: first[index].noAnswer + second[index].noAnswer
        }
    )

/**
* @function addReduce
* @param  {Review[][]} arrOfArrs {Array of review arrays}
* @return {Review[]} {Array of reviews resulting from adding up 
                      all reviews with the same index}
*/
const addReduce = (arrOfArrs: Review[][]): Review[] => 
  arrOfArrs.reduce(addReviewArrays)
 

/**
* @function divideBy
* @param  {Number} numOfRatings {total number of ratings}
* @param {Review[]} addedReviews {sum of review of all semesters}
* @return {Review[]} {reviews with mean values}
*/
const divideBy = (numOfRatings: number) => (addedReviews: Review[]): Review[] => 
  addedReviews.map((review: Review) => 
    review.id <= 14 && review.average?
      {...review,
        average: review.average / numOfRatings
      }   
    :review.id <= 19 && review.yes && review.no && review.noAnswer? 
      {...review,
        yes: review.yes / numOfRatings,
        no: review.no / numOfRatings,
        noAnswer: review.noAnswer / numOfRatings
      }
    : review
  )

/** 
* @function aggregate the reviews from all semester ratings
* @param  {Rating[]} ratings {ratings for all semesters}
* @return {Reviews[]} {array of aggregate reviews}
*/
const aggregateRatings = (ratings: Rating[]): Review[] => {
  // Convert ratings to an array of review arrays 
  const arrOfArrs: Review[][] = ratings.map((rating: Rating) => rating.reviews)
  const numOfRatings = arrOfArrs.length
 
  // pipe: left-to-right function composition
  //   The result of each function is passed as the argument
  //   to the next function, and the result of the last one 
  //   is the result of the whole
  // reduce to a single ratings array and divide by number of ratings
  const add_divide = pipe(addReduce, divideBy(numOfRatings))
  return add_divide(arrOfArrs)
}



type sortReviewsDef = (reviews: Review[])=>SortedReviews


/**
* @function sortReviews
* @param  {Number} timesTaught {times professor taught this class}
* @param {Review[]} reviews {sum of review of all semesters}
* @return {SortedReviews} {Object with reviews sorted by category}
*/
const sortReviews = (timesTaught: number):sortReviewsDef => 
    (reviews: Review[]):SortedReviews => {

    const normalized: Review[] = [...normalizeAverages(reviews), 
                                  makeTimesTaughtReview(timesTaught)]           
    return {
          organization: normalized.filter(review => 
            organization_q_ids.includes(review.id)),
          experience: normalized.filter(review => 
            experience_q_ids.includes(review.id)),
          clarity: normalized.filter(review => 
            clarity_q_ids.includes(review.id)),
          personality: normalized.filter(review =>
            personality_q_ids.includes(review.id))
      }
}



/**
* @function createSemesterOptions
* @param  {Rating[]} ratings {Array of ratings}
* @return {Option[]} options {Array of options for display in HTML select element}
*/
function createSemesterOptions(ratings: Rating[]): Option[]{  
  return ratings.map((rating) => {
    const section = rating.section? 'sec ' + rating.section : ''
    return {
      value: rating._id,
      children: rating.semester + ' ' + rating.year + ' ' + section
    }
  })
}


const replaceSpaces = (string:string): string =>  string.replace(/_/g, " ")


/**
* @function createCourseOptions
* @param  {Course[]} ratings {Array of courses}
* @return {Option[]} options {Array of options for display in HTML select element}
*/
const createCourseOptions = (courses: Course[]): Option[] => 
  courses.map((course: Course) => ({
      value: course._id,
      children: replaceSpaces(course.subject)
    })
  )

const getTimesTaught = (professor: Professor, courseId: string): number => 
    professor.courses.reduce((total: number, course: Course) => (
      course.subject === courseId ? total + 1 : total
    ), 0)


const getAggregateRating = (ratings: Rating[], times_taught: number): SortedReviews => {
   const aggregate =  pipe(aggregateRatings, sortReviews(times_taught))
   return aggregate(ratings)
}

const getRatingById = (ratings: Rating[], ratingId: number, 
                       timesTaught: number):Rating => {
    const ratingById = pipe(find(rating => rating._id === ratingId), 
                            prop('reviews'), 
                            sortReviews(timesTaught))
    return ratingById(ratings)
}
// Export a higher order component that will inject
// the functions as props to a child component given in <recompose.compose>
export default {
  getTimesTaught,
  sortReviews,
  aggregateRatings,
  createSemesterOptions,
  createCourseOptions,
  getAggregateRating,
  getRatingById,
  aggregateOption,
  AGGREGATE_Q_ID
}