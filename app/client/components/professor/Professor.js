'use strict';
import React from 'react';
import { Link } from 'react-router';
import { Panel, PanelHeader, Select, Text} from 'rebass'
import { Flex, Box } from 'reflexbox'
import Review from '../review/Review'
import helpers from './helpers'
import SelectUI from '../select/select'
import ajax from '../../ajax/index'

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
    ajax.getProfessor(this.props.params.prof)
    .then((professor) => {
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
    return helpers.generateCourseTitles(courses)
  }
  
  generateSemesterTitles(ratings){
    return [helpers.aggregateOption, 
            ...helpers.generateSemesterTitles(ratings)]
  }

  handleCourseChange(e){
      const course_id = e.target.value

      // if 'choose one' option was selected
      if (course_id === '') return

      ajax.getRatings(this.state.profId, course_id)
      .then((ratings) => {
        this.setState({
          selectedCourse: course_id,
          ratings: ratings,
          semesterTitles: this.generateSemesterTitles(ratings),
          questions: {},
          selectedSemester: ''
        });
      })
  }

  handleSemesterChange(e){
    const rating_id = e.target.value
    // if 'choose one' option was selected
    if (rating_id === '') return

    const times_taught = this.state.ratings.length    
    const sortedRatings = 
      rating_id === helpers.AGGREGATE_Q_ID ?
        helpers.getAggregateRating(this.state.ratings, times_taught)
        : helpers.getRatingById(this.state.ratings, rating_id, times_taught)

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
                name='course'
                value={selectedCourse}
                onChange={this.handleCourseChange}
                options={courseTitles}
              />
              </Box>
              <Box  sm={4} px={2}>
               <SelectUI 
                name='semester'
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