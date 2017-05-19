'use strict';
import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { compose } from 'recompose'

import withAjax from './ajax'
import withHelpers from './helpers'
import Professor from './Professor'

class ProfContainer extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        courses: [],
        ratings: null,
        professor: null,
        selectedCourse: '',
        selectedSemester: null,
      };
      this.handleCourseChange = this.handleCourseChange.bind(this)
      this.handleSemesterChange = this.handleSemesterChange.bind(this)
  }


  componentDidMount(){
    this.props.getProfessor(this.props.params.prof)
    .then((professor) => {
      this.setState({
        'professor': professor
      })
    });
  }
 
  generateCourseTitles(courses){
    return this.props.generateCourseTitles(courses)
  }
  
  generateSemesterTitles(ratings){
    const { aggregateOption, generateSemesterTitles } = this.props
    return [aggregateOption, 
            ...generateSemesterTitles(ratings)]
  }

  handleCourseChange(e){
      const course_id = e.target.value

      // if blank option was selected
      if (course_id === '') return

      this.props.getRatings(this.state.professor._id, course_id)
      .then((ratings) => {
        this.setState({
          selectedCourse: course_id,
          ratings: ratings,
          selectedSemester: ''
        });
      })
  }
  
  generateReviews(rating_id){
    const { AGGREGATE_Q_ID, 
            getAggregateRating,
            getRatingById } = this.props

    const {ratings} = this.state
    const times_taught = ratings.length 

    if(rating_id === AGGREGATE_Q_ID){
        return getAggregateRating(ratings, times_taught)
    } else { 
        return getRatingById(ratings, rating_id, times_taught)
    }
  }

  handleSemesterChange(e){
    const rating_id = e.target.value
    // if 'choose one' option was selected
    if (rating_id === '') return

    this.setState({
      selectedSemester: rating_id
    })
  }

  render() {  
    const {
      selectedCourse,
      selectedSemester,
      ratings,
      professor
    } = this.state


    console.log(this.state)

    const name = professor?  professor.firstName + ' ' + professor.lastName : ''
    const courseTitles = professor? this.generateCourseTitles(professor.courses) : []
    const reviews = selectedSemester? this.generateReviews(selectedSemester): {}
    const semesterTitles = ratings? this.generateSemesterTitles(ratings): []

    return (
      !professor? 
        <div>Loading...</div>
      : <Professor
        name={name}
        courseTitles={courseTitles}
        selectedCourse={selectedCourse}
        changeCourse={this.handleCourseChange}
        semesterTitles={semesterTitles}
        selectedSemester={selectedSemester}
        changeSemester={this.handleSemesterChange}
        reviews={reviews}
      />
     
    );
  }
}

export default compose(withHelpers, withAjax)(ProfContainer)
