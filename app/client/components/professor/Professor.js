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
        currentTitle: '',
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

  grades(score) {
    if ((score > 60) && (score < 70)) return "D"
    if ((score > 71) && (score < 80)) return "C"
    if ((score > 81) && (score < 90)) return "B"
    if ((score > 91) && (score < 100)) return "A"
  }

  getCurrentTitle(courseKey){
    return this.state.courseTitles.find(function(element){
      return element.value === courseKey
    }).children
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
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
          currentTitle: this.getCurrentTitle(course_id),
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
      currentTitle,
      profName
    } = this.state

    console.log('state: ', this.state)
    return (
      <Flex pt={2} justify='center' align='center' wrap>
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
            </Flex>

            <Flex pt={1} wrap>
              <Box col={12} lg={12} sm={12} pt={2} className="card action">
                <Flex pt={1} wrap>
                <Box col={12} lg={3}>
                  <h2>Ratings for: <p>{currentTitle}</p></h2>
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
                <Review reviews={questions}/>
              </Box>
            </Flex>

          </Panel>
        </Box>
      </Flex>
    );
  }
}
