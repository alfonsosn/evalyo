'use strict';
import Review from './Review'
import React from 'react';
import { Link } from 'react-router';
import $ from "jquery";

export default class Professor extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        courses: [],
        courseTitles: [],
        selectedCourse: '',
        semesterTitles: [],
        selectedSemester: '',
        prof: ''
      };
      this.handleCourseChange = this.handleCourseChange.bind(this)
      this.handleSemesterChange = this.handleSemesterChange.bind(this)
  }

  handleSemesterChange(semester){
    console.log("selected semster: ", semester)
     $.ajax({
      url: `/api/professors/${this.state.prof}/${this.state.selectedCourse}/${semester}`,
      type: 'GET'
    })
    .done(reviews => {
      console.log("response: ", reviews)
      this.setState({
        selectedSemester: semester
      })
    });
  }

  generateSemesterTitles(arr, subject){
    return [{
      value: 'Aggregate',
      label: 'Aggregate'
    }].concat(arr.filter((course) =>
        course.subject === subject)
        .map((course) => {
          return {
              value: course.semester,
              label: course.semester
            }
          }
        )
      )
  }

  handleCourseChange(course){
    const subject = course.replace(/_/g, " ")

    this.setState({
      selectedCourse: course,
      semesterTitles: this.generateSemesterTitles(this.state.courses, subject)
    });
 }

  componentDidMount(){
    $.ajax({
      url: `/api/professors/${this.props.params.prof}`,
      type: 'GET'
    })
    .done(professor => {
      this.setState({
        'courses': professor.courses,
        'courseTitles': professor.courseTitles.map((title) =>
          { return { value: title,
                     label: title }
          }
         ),
        'prof': this.props.params.prof
      })
    });
  }

  render() {
    return (
      <Layout>
        <h1> {this.state.courses.firstName} {this.state.courses.lastName} </h1>
        <p> This professor has previously taught: </p>

      </Layout>
    );
  }
}
