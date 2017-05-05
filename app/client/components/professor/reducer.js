import actions as actionTypes from './actionTypes'

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


