'use strict';

import React from 'react';
import { Link } from 'react-router';
import { Button } from 'rebass'
import { Flex, Box } from 'reflexbox'
import banner from '../../img/thomas-hunter.jpg'

export default class Index extends React.Component {
  render() {
    return (
      <section>
        <div className="home">
          <Flex wrap align="center" pt={6} py={6}>
            <Box col={12} lg={3} sm={12}></Box>
            <Box col={12} lg={6} sm={12} className="card action">
              <h1> Find Your Professor The Right Way </h1>
              <Flex wrap align="stretch" >
                <Box lg={6} sm={12} p={0}>
                  <img className="banner" src={banner}></img>
                </Box>
                <Box lg={6} sm={12}>
                  <h2> No More Rate My Professors! </h2>
                  <p> We are Evalyo, a team of computer science students at Hunter College. Our team is working on our data-science capstone project, and we envision a web application to improve the Teacher Evaluation site at Hunter.</p>
                  <p> Some of our features: </p>
                  <ul>
                    <li>Professor Based Querying</li>
                    <li>Historical Aggregation</li>
                    <li>Student Friendly Design</li>
                  </ul>
                  <Link to={`/departments/`}>
                      <Button> Click here to get started! </Button>
                  </Link>
                </Box>
              </Flex>
            </Box>
            <Box col={12} lg={3} sm={12}></Box>
          </Flex>
        </div>

      </section>
    );
  }
}
