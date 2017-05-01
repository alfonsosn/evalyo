'use strict';
import Review from '../review/Review'
import React from 'react';
import { Link } from 'react-router';
import $ from "jquery";
import {Panel, PanelHeader, Select, Text} from 'rebass'
import { Flex, Box } from 'reflexbox'
import helpers from './helpers'
import SelectUI from '../select/select.js'
const AGGREGATE_ID = '-1'

export default class Professor extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        courses: [],
        courseTitles: [],
        selectedCourse: '',
        semesterTitles: [],
        selectedSemester: '',
        ratings: [],
        questions: {},
        profName: ''
      };
      this.handleCourseChange = this.handleCourseChange.bind(this)
      this.handleSemesterChange = this.handleSemesterChange.bind(this)
  }


  componentDidMount(){
    $.ajax({
      url: `/api/professors/${this.props.params.prof}`,
      type: 'GET'
    })
    .done((professor) => {
      console.log('prof :', professor)
      this.setState({
        'courses': professor.courses,
        'courseTitles': this.generateCourseTitles(professor.courses),
        'profName': professor.firstName + ' ' + professor.lastName,
        'profId': professor._id
      })
    });
  }


  generateCourseTitles(courses){
    const blankOption = [{ value: '', children: 'choose one'}]
    
    const courseTitles = courses.map((course) => {
      const title_with_spaces = course.subject.replace(/_/g, " ")
      return {
        value: course._id,
        children: title_with_spaces
      }
    })
    return blankOption.concat(courseTitles)
  }
  
  generateSemesterTitles(ratings){
    const blankOption = [{ value: '', children: 'choose one'}]

    const aggregateOption = [{
      value: AGGREGATE_ID,
      label: 'Aggregate'
    }]

    const semesterTitles = ratings.map((rating) => {
          return {
              value: rating._id,
              children: rating.semester + ' ' + rating.year
          }
    })

    return blankOption.concat(aggregateOption, semesterTitles)
  }

  handleCourseChange(e){
      const course_id = e.target.value

      // if 'choose one' option was selected
      if (course_id === '') return

      $.ajax({
        url: `/api/professors/${this.state.profId}/${course_id}`,
        type: 'GET'
      })
      .done((ratings) => {
        this.setState({
          selectedCourse: course_id,
          ratings: ratings,
          semesterTitles: this.generateSemesterTitles(ratings),
          questions: [],
          selectedSemester: ''
        });
      })
  }



  handleSemesterChange(e){
    const rating_id = e.target.value
    // if 'choose one' option was selected
    if (rating_id === '') return

    const selectedRatings =
        rating_id === AGGREGATE_ID ?
            helpers.aggregate(this.state.ratings)
          : this.state.ratings.filter((rating) => rating._id === rating_id)

    const sortedRatings =
        rating_id === AGGREGATE_ID ?
            helpers.sortRatings(selectedRatings, this.state.ratings.length)
          : helpers.sortRatings(selectedRatings[0].questions, this.state.ratings.length)
          
      
    this.setState({
      questions: sortedRatings,
      selectedSemester: rating_id
    })
  }

  render() {
    const {
      selectedCourse,
      courseTitles,
      selectedSemester,
      semesterTitles,
      questions,
      profName
    } = this.state

    console.log('state: ', this.state)
    return (
      <Flex pt={1} justify='center' align='center' wrap>
        <Box col={12} lg={2}></Box>
        <Box lg={8} sm={12}>
          <Panel theme='secondary'>
            <PanelHeader>
              {profName}
            </PanelHeader>
            <Flex  py={2} justify='center' align='center' wrap>
              <Box  sm={4} px={2}>
              <SelectUI 
                value={selectedCourse}
                onChange={this.handleCourseChange}
                options={courseTitles}
              />
              </Box>
              <Box  sm={4} px={2}>
                <Select
                    name='semester'
                    label='Semester'
                    value={selectedSemester}
                    onChange={this.handleSemesterChange}
                    options={semesterTitles}
                />
              </Box>

              <Box py={4} sm={12} px={2}>
                <Review reviews={questions}/>
              </Box>
            </Flex>
          </Panel>
        </Box>
      </Flex>
    );
  }
}

/*
<Select
    name='course'
    label='Course'
    value={selectedCourse}
    onChange={this.handleCourseChange}
    options={courseTitles}
/>
*/