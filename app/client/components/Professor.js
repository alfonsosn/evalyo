'use strict';
import Review from './Review'
import React from 'react';
import { Link } from 'react-router';
import $ from "jquery";
import {Panel, PanelHeader, Select, Text} from 'rebass'
import { Flex, Box } from 'reflexbox'

export default class Professor extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        courses: [],
        courseTitles: [],
        selectedCourse: '',
        semesterTitles: [],
        selectedSemester: '',
        reviews: {},
        prof: ''
      };
      this.handleCourseChange = this.handleCourseChange.bind(this)
      this.handleSemesterChange = this.handleSemesterChange.bind(this)
  }

  handleSemesterChange(e){
    const semester = e.target.value
    // console.log("selected semster: ", semester)
     $.ajax({
      url: `/api/professors/${this.state.prof}/${this.state.selectedCourse}/${semester}`,
      type: 'GET'
    })
    .done(reviews => {
      this.setState({
        selectedSemester: semester,
        reviews: reviews[0]
      })
    });
  }

  generateSemesterTitles(arr, subject){
    const blankOption = [{ value: '', children: 'choose one'}]

    const aggregateOption = [{
      value: 'Aggregate',
      label: 'Aggregate'
    }]

    const semesterTitles = arr.filter((course) =>
        course.subject === subject)
        .map((course) => {
          return {
              value: course.semester,
              children: course.semester
            }
          }
        )

    return blankOption.concat(aggregateOption, semesterTitles)
  }

  handleCourseChange(e){
    // const subject = course.replace(/_/g, " ")
    const course = e.target.value
    this.setState({
      selectedCourse: course,
      semesterTitles: this.generateSemesterTitles(this.state.courses, course)
    });
 }

  generateCourseTitles(titles){
    const blankOption = [{ value: '', children: 'choose one'}]

    const courseTitles = titles.map((title) => {
      const title_with_spaces = title.replace(/_/g, " ")
      return {
        value: title_with_spaces,
        children: title_with_spaces
      }
    })
    return blankOption.concat(courseTitles)
  }

  componentDidMount(){
    $.ajax({
      url: `/api/professors/${this.props.params.prof}`,
      type: 'GET'
    })
    .done(professor => {
      this.setState({
        'courses': professor.courses,
        'courseTitles': this.generateCourseTitles(professor.courseTitles),
        'profName': professor.firstName + ' ' + professor.lastName,
        'prof': this.props.params.prof
      })
    });
  }

  render() {
    const {
      selectedCourse,
      courseTitles,
      selectedSemester,
      semesterTitles,
      reviews,
      profName
    } = this.state

    // console.log(this.state)
    return (
      <Flex  py={2} justify='center' align='center' wrap>
        <Box sm={12} lg={6}>
          <Panel theme='secondary'>
            <PanelHeader>
              {profName}
            </PanelHeader>
            <Flex  py={2} justify='center' align='center' wrap>
              <Box  sm={4} px={2}>
                <Select
                    name='course'
                    label='Course'
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
              <Box  sm={12} px={2}>
                <Review reviews={reviews}/>
              </Box>
            </Flex>
          </Panel>
        </Box>
      </Flex>
    );
  }
}
