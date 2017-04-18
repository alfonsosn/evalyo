'use strict';
import Review from './Review'
import React from 'react';
import { Link } from 'react-router';
import $ from "jquery";
import Dropdown from 'react-toolbox/lib/dropdown';

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
    //console.log("state:", this.state)
    return (
      <div>
        <h1> {this.state.courses.firstName} {this.state.courses.lastName} </h1>
        <p> This professor has previously taught: </p>

        <Dropdown
          auto
          onChange={this.handleCourseChange}
          source={this.state.courseTitles}
          value={this.state.selectedCourse}
        />

        <Dropdown
          auto
          onChange={this.handleSemesterChange}
          source={this.state.semesterTitles}
          value={this.state.selectedSemester}
        />

      </div>
    );
  }
}

/*
        <ul>
          {this.state.courseTitles.map((title, index)=>
            <li key={index}>
              <Link to={`/professor/${this.state.prof}/${title}`}>
              {title}
              </Link>
            </li>
          )}
        </ul>
*/