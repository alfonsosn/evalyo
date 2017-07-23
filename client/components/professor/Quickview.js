'use strict';

import React from 'react';
import { Link } from 'react-router';
import { Flex, Box } from 'reflexbox'

export default class Quickview extends React.Component {

  getRandomInt(min, max){
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
  }

  getLetterGrade(score) {
    if ((score > 60) && (score < 70)) return "B"
    else if ((score > 71) && (score < 80)) return "B+"
    else if ((score > 81) && (score < 90)) return "A-"
    else return "A"
  }

  render() {
    return (
       <Flex col={12} lg={12} sm={12} pt={2} className="card">
           <Box col={12} lg={6} sm={12} p={3} className="card">
              <h3>Likely Grade: {this.getLetterGrade(this.getRandomInt(50, 100))} </h3>
           </Box>
           <Box col={12} lg={6} sm={12} p={3} className="card">
               <h3>Overall Score: {this.getRandomInt(80, 95)} </h3>
           </Box>
       </Flex>
      )
    }
  }
