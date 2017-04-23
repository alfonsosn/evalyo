'use strict';
import Review from '../review/Review'
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


  componentDidMount(){
    $.ajax({
      url: `/api/professors/${this.props.params.prof}`,
      type: 'GET'
    })
    .done((professor) => {
      this.setState({
        'courses': professor.courses,
        'courseTitles': this.generateCourseTitles(professor.courseTitles),
        'profName': professor.firstName + ' ' + professor.lastName,
        'prof': this.props.params.prof
      })
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

  handleCourseChange(e){
    // const subject = course.replace(/_/g, " ")
    const courseTitle = e.target.value

    // if blank option was chosen
    if (courseTitle === '') return

    this.setState({
      selectedCourse: courseTitle,
      semesterTitles: this.generateSemesterTitles(this.state.courses, courseTitle)
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

   handleSemesterChange(e){
     const semester = e.target.value
     // if 'choose one' option was selected
     if (semester === '') return
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

  render() {
    const {
      selectedCourse,
      courseTitles,
      selectedSemester,
      semesterTitles,
      reviews,
      profName
    } = this.state

    return (
      <Flex  py={6} justify='center' align='center' wrap>
        <Box sm={12} lg={8}>
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
          
              <Box py={4} sm={12} px={2}>
                <Review reviews={reviews}/>
              </Box>
            </Flex>
          </Panel>
        </Box>
      </Flex>
    );
  }
}
