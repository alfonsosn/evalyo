import * as actionTypes from './actionTypes'

const initialState = {
  courses: {
    courses: [],
    courseTitles: [],
    selectedCourse: ''
  },
  ratings: {
    ratings: [],
    sortedRatings: {},
    ratingTitles: [],
    selectedRating: '',
  },
  professor: {
    name: ''
  }
}



const courseReducer = (state = initialState.courses, action) => {
  switch (action.type){
    default:
      return state
  }
}
const reducer = (state = initialState, action) => {
  switch(action.type){
    case 
    default:
      return state
  }

}


const selectedRatings =
    rating_id === AGGREGATE_ID ?
        helpers.aggregate(this.state.ratings)
      : this.state.ratings.filter((rating) => rating._id === rating_id)

const sortedRatings =
    rating_id === AGGREGATE_ID ?
        helpers.sortRatings(selectedRatings, this.state.ratings.length)
      : helpers.sortRatings(selectedRatings[0].questions, this.state.ratings.length)
      