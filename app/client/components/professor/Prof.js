'use strict';
import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';

import { Panel, PanelHeader, Text} from 'rebass'
import { Flex, Box } from 'reflexbox'
import CustomSelect from '../select/select'
import Review from '../review/review'

export default class Prof extends React.Component {
  
  getRandomInt(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  getLetterGrade(score) {
    if ((score > 60) && (score < 70)) return "D"
    else if ((score > 71) && (score < 80)) return "C"
    else if ((score > 81) && (score < 90)) return "B"
    else return "A"
  }

  render() {
    const {
      name,
      courseOptions,
      selectedCourse,
      changeCourse,
      semesterOptions,
      selectedSemester,
      changeSemester,
      currentTitle,
      reviews
    } = this.props

 
    return (
      <Flex pt={1} justify='center' align='center' wrap>
        <Box col={12} lg={2}></Box>
        <Box lg={8} sm={12}>
          <Panel theme='secondary'>
            <PanelHeader>
              {name}
            </PanelHeader>
            <Flex  py={2} justify='center' align='center' wrap>
              <Box  sm={4} px={2}>
              <CustomSelect 
                name='course'
                value={selectedCourse}
                onChange={changeCourse}
                options={courseOptions}
              />
              </Box>
              <Box  sm={4} px={2}>
               <CustomSelect 
                name='semester'
                value={selectedSemester}
                onChange={changeSemester}
                options={semesterOptions}
              />
              </Box>
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
                  <h2>Likely Grade <p> {this.getLetterGrade(this.getRandomInt(50, 100))} </p></h2>
                </Box>
                <Box col={12} lg={3}>
                </Box>
                </Flex>
              </Box>
            </Flex>

            <Box py={4} sm={12} px={2}>
              <Review reviews={reviews}/>
            </Box>
          </Flex>
        </Panel>
      </Box>
    </Flex>
   )
  }
}


