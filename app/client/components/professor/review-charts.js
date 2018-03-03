'use strict';

import React from 'react';
import { Link } from 'react-router';
import { Flex, Box } from 'reflexbox'

export default class ReviewCharts extends React.Component {

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

  render(props) {
    console.log(this.props.totalAverages)
    return (
       <Flex col={12} lg={12} sm={12} pt={2} className="card">

       </Flex>
      )
    }
  }
