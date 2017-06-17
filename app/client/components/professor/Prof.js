'use strict';
import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { Panel, PanelHeader, Text} from 'rebass'
import { Flex, Box } from 'reflexbox'
import CustomSelect from '../select/select'
import Quickview from './Quickview.js'
import Review from '../review/review'

export default class Professor extends React.Component {

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
      <div className="action">

        <Flex pt={3} wrap>
          <Box col={12} lg={12} sm={12} >
            <h2> Select a Review for {name} </h2>
          </Box>
        </Flex>

        <Flex col={12}
              py={3}
              wrap>

            <Box  col={12}
                  lg={6}
                  sm={12}
                  px={2}>

              <CustomSelect
                name='i. Pick a Course'
                value={selectedCourse}
                onChange={changeCourse}
                options={courseOptions}
              />
            </Box>

            <Box  col={12}
                  lg={6}
                  sm={12}
                  px={2}>
               <CustomSelect
                name='ii. Choose a Semester'
                value={selectedSemester}
                onChange={changeSemester}
                options={semesterOptions}
              />
            </Box>

        </Flex>

        <Box sm={12} px={2}>
          <Quickview course={currentTitle}></Quickview>
          <Review reviews={reviews}/>
        </Box>

      </div>
    );
  }
}


