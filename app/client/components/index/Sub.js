'use strict';

import React from 'react';
import { Box } from 'reflexbox'

export default class Info extends React.Component {
  render(){
    return (
        <Box col={12} lg={12} sm={12} pt={2} className="card action banner">
          <h1> Find Your Professor The Right Way </h1>
          <p> We are Reviews, a team of computer science students at Hunter College. Our team is working on our data-science capstone project, and we envision a web application to improve the Teacher Evaluation site at Hunter.</p>
        </Box>
    )}
  }
