'use strict';
import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';

import { Panel, PanelHeader, Text} from 'rebass'
import { Flex, Box } from 'reflexbox'
import CustomSelect from '../select/select'
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
                options={courseTitles}
              />
              </Box>
              <Box  sm={4} px={2}>
               <CustomSelect 
                name='semester'
                value={selectedSemester}
                onChange={changeSemester}
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

export default Professor
