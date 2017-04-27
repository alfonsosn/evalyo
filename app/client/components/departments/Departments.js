'use strict';

import React from 'react';
import { Link } from 'react-router';
import { Flex, Box } from 'reflexbox'
import $ from "jquery"
require('./style.scss')

const dpmts = ["Biology", "Chemistry", "Computer Science", "Economics", "Math", "Philosophy"];
const icons = {"Biology":"bio", "Chemistry": "chem", "Computer Science": "csci", "Economics": "econ", "Math":"math", "Philosophy":"philo"};

export default class Departments extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        departments: []
      };
  }

  componentDidMount(){
    $.ajax({
      url: '/',
      type: 'GET'
    })
    .done(departments => {
      this.setState({departments: dpmts})
    });
  }

  render() {
    return (
      <div>
      <Flex pt={1} wrap>
        <Box col={12} lg={2} sm={0}></Box>
        <Box col={12} lg={8} sm={12} pt={2} className="card action">
          <h1> Choose your Department </h1>
        </Box>
        <Box col={12} lg={2} sm={0}></Box>
      </Flex>
      <Flex justify='center' align='center' wrap>
        <Box sm={12} lg={8}>
        <Flex  py={2} justify='center' align='stretch' wrap>
            {this.state.departments.map((name, index)=>
              <Box col={12}
                   lg={6}
                   sm={6}
                   key={index} className="card">
                   <Flex
                     align="stretch"
                     justify="space-between"
                     >
                   <Box p={3}
                        align="center"
                        className={`${name.toLowerCase()}`}
                        >
                   </Box>
                   <Box auto
                        p={3}>
                    <Link to={`/departments/${name.toLowerCase().split(' ').join('_')}`}>
                      <h3 className="secondaryLink">
                        {name}
                      </h3>
                    </Link>
                    <p> Number of current faculty: {Math.round((Math.random()*10))} </p>
                   </Box>
                   </Flex>
              </Box>
            )}
            </Flex>
          </Box>
        </Flex>
      </div>
    );
  }
}
