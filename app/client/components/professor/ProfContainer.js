'use strict';
import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { compose } from 'recompose'

import ajax from './ajax'
import helpers from './helpers'
import Prof from './Prof'

export default class ProfContainer extends React.Component {
   // Prop types
   props: {
      params: { prof: string }
  };
  // Initial state
  state = {
      courses: [],
      ratings: [],
      professor: {},
      selectedCourse: '',
      selectedSemester: ''
  }; 

  componentDidMount(){
    ajax.getProfessor(this.props.params.prof)
    .then((professor) => {
      this.setState({
        professor: professor
      })
    });
  }
 
  createCourseOptions(courses){
    return helpers.createCourseOptions(courses)
  }
  
  createSemesterOptions(ratings){
    const { aggregateOption, createSemesterOptions } = helpers
    return [aggregateOption, 
            ...createSemesterOptions(ratings)]
  }

  handleCourseChange = (e) => {
      const course_id = e.target.value

      // if 'choose' option was selected
      if (course_id === '') return

      ajax.getRatings(this.state.professor._id, course_id)
      .then((ratings) => {
        this.setState({
          selectedCourse: course_id,
          ratings: ratings,
          selectedSemester: ''
        });
      })
  };
  
  generateReviews(rating_id){
    const { AGGREGATE_Q_ID, 
            getAggregateRating,
            getRatingById } = helpers

    const {ratings} = this.state
    const times_taught = ratings.length 

    if(rating_id === AGGREGATE_Q_ID){
        return getAggregateRating(ratings, times_taught)
    } else { 
        return getRatingById(ratings, rating_id, times_taught)
    }
  }

  handleSemesterChange = (e) => {
    const rating_id = e.target.value
    // if 'choose' option was selected
    if (rating_id === '') return

    this.setState({
      selectedSemester: rating_id
    })
  };

  getCourseTitle(courseTitles, courseId){
    const courseTitle =  courseTitles.find(course => course.value === courseId)
    return courseTitle? courseTitle.children : ''
  }

  render() {  
    const {
      selectedCourse,
      selectedSemester,
      ratings,
      professor
    } = this.state

    const name = professor?  professor.firstName + ' ' + professor.lastName : ''
    const courseOptions = professor.courses? this.createCourseOptions(professor.courses) : []
    const reviews = selectedSemester? this.generateReviews(selectedSemester): {}
    const semesterOptions = ratings? this.createSemesterOptions(ratings): []
    const selectedCourseTitle = courseOptions && selectedCourse ? 
        this.getCourseTitle(courseOptions, selectedCourse): ''
    
    return (
      professor? 
        <Prof
          name={name}
          selectedCourseTitle={selectedCourseTitle}
          courseOptions={courseOptions}
          selectedCourse={selectedCourse}
          changeCourse={this.handleCourseChange}
          semesterOptions={semesterOptions}
          selectedSemester={selectedSemester}
          changeSemester={this.handleSemesterChange}
          reviews={reviews}
        />
      : <div>Loading...</div>
    );
  }
}

