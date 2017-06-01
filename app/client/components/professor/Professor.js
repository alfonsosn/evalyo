'use strict';
import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { Panel, PanelHeader, Text} from 'rebass'
import { Flex, Box } from 'reflexbox'
import CustomSelect from '../select/select'
import Quickview from './Quickview.js'
import Review from '../review/review'

class Professor extends React.Component {

  render() {
    const {
      name,
      courseTitles,
      selectedCourse,
      changeCourse,
      semesterTitles,
      selectedSemester,
      changeSemester,
      currentTitle,
      reviews
    } = this.props


    return (
      <div className="action">

        <Flex pt={3} wrap>
          <Box col={12} lg={12} sm={12} >
            <h2> Step Three: Choose a Review for {name} </h2>
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
                name='Pick a Course'
                value={selectedCourse}
                onChange={changeCourse}
                options={courseTitles}
              />
            </Box>

            <Box  col={12}
                  lg={6}
                  sm={12}
                  px={2}>
               <CustomSelect
                name='Choose a Semester'
                value={selectedSemester}
                onChange={changeSemester}
                options={semesterTitles}
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

export default Professor
