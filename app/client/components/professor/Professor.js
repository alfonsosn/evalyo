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

  grades(score) {
    if ((score > 60) && (score < 70)) return "D"
    if ((score > 71) && (score < 80)) return "C"
    if ((score > 81) && (score < 90)) return "B"
    if ((score > 91) && (score < 100)) return "A"
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
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
      <Flex pt={1} justify='center' align='center' wrap>
        <Box col={12} lg={2}></Box>
        <Box lg={8} sm={12}>
          <Panel theme='secondary'>
            <PanelHeader>
              <h1> All available reviews for {profName} </h1>
            </PanelHeader>
            <Flex wrap>
              <Box col={12} lg={6} md={6} sm={12} px={2}>
                <Select
                    name='course'
                    label='Course'
                    value={selectedCourse}
                    onChange={this.handleCourseChange}
                    options={courseTitles}
                />
              </Box>
              <Box col={12} lg={6} md={6} sm={12} px={2}>
                <Select
                    name='semester'
                    label='Semester'
                    value={selectedSemester}
                    onChange={this.handleSemesterChange}
                    options={semesterTitles}
                />
              </Box>
            </Flex>
            <Flex pt={1} wrap>
              <Box col={12} lg={12} sm={12} pt={2} className="card action">
                <Flex pt={1} wrap>
                <Box col={12} lg={3}>
                  <h2>Ratings for: <p>{selectedCourse}</p></h2>
                </Box>
                <Box col={12} lg={3}>
                  <h2>Overall rating <p> {this.getRandomInt(80, 95)} </p></h2>
                </Box>
                <Box col={12} lg={3}>
                  <h2>Likely Grade <p> {this.grades(this.getRandomInt(50, 100))} </p></h2>
                </Box>
                <Box col={12} lg={3}>

                </Box>
                </Flex>
              </Box>
            </Flex>
            <Flex>
              <Box py={4} sm={12} px={2}>
                <Review reviews={reviews}/>
              </Box>
            </Flex>
          </Panel>
        </Box>
        <Box col={12} lg={2}></Box>
      </Flex>
    );
  }
}
