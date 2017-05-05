'use strict';

import React from 'react';
import { Link } from 'react-router';
import { Button } from 'rebass'
import { Flex, Box } from 'reflexbox'
import banner from '../../img/thomas-hunter.jpg'

export default class Index extends React.Component {
  render() {
    return (
        <div className="home">
          <Flex wrap align="center" pt={1} >
            <Box col={12} lg={2} sm={12}></Box>
            <Box col={12} lg={8} sm={12} className="card action">
              <h1> Find Your Professor The Right Way </h1>
              <Flex wrap align="stretch" >
                <Box lg={6} sm={12} p={0}>
                  <img className="banner" src={banner}></img>
                </Box>
                <Box lg={6} sm={12} p={2}>
                  <h2> No More Rate My Professors! </h2>
                  <p> We are ReViews, a team of computer science students at Hunter College. Our team is working on our data-science capstone project, and we envision a web application to improve the Teacher Evaluation site at Hunter.</p>
                  <div className="divider_two"></div>
                  <h3> Some of our features: </h3>
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
            <Box col={12} lg={2} sm={12}></Box>
          </Flex>

          <Flex wrap align="center" pt={2}>
            <Box col={12} lg={2} sm={12}></Box>
            <Box col={12} lg={8} sm={12} pt={2} className="card action">
              <Flex wrap align="stretch">
                <Box col={12} lg={6} sm={12}>
                  <h2> Technologies </h2>
                  <div className="divider"></div>
                  <p> Our team is going to the web framework, REACT (made by Facebook), to present the app with modern design in mind. Moreover, we would use a relational database known as MongoDB that would allow for more interesting ways to present the data.</p>
                </Box>
                <Box col={12} lg={6} sm={12}>
                  <h2> Goals </h2>
                  <div className="divider"></div>
                  <p> The app can serve as a prototype for the College to pursue a more complete project. Also the value of saving thousands of dollars in an application prototype that's benefitial for both faculty and the student population.</p>
                </Box>
              </Flex>
            </Box>
            <Box col={12} lg={2} sm={12}></Box>
          </Flex>
        </div>
    );
  }
}
