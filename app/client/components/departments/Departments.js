'use strict';

import React from 'react';
import { Link } from 'react-router';
import { Flex, Box } from 'reflexbox'
import Search from '../search/Search.js'
import $ from "jquery"
require('./style.scss')

const dpmts = ["Biology", "Chemistry", "Computer Science", "Economics", "Math", "Philosophy"];
const icons = {"BIO":"biology", "CHEM": "chemistry", "CSCI": "computer", "ECON": "economics", "MATH":"math", "PHILO":"philosophy"};

export default class Departments extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        departments: []
      };
  }

  componentDidMount(){
    $.ajax({
      url: '/api/departments',
      type: 'GET'
    })
    .done(departments => {
      console.log(departments)
      this.setState({departments: departments})
    });
  }

  render() {
    return (
    <div className="action">

    <Search></Search>

      <Flex pt={3} wrap>
        <Box col={12} lg={12} sm={12} >
          <h2> Step One: Choose your Department </h2>
        </Box>
      </Flex>

      <Flex py={2}
            justify='center'
            align='center'
            wrap>
              {this.state.departments.map((dept, index)=>
                <Box col={12}
                     lg={6}
                     sm={6}
                     key={index}
                     className="card">
                       <Flex align="center"
                             justify="space-between">
                         <Box p={3}
                              align="center"
                              className={`${icons[dept.name].toLowerCase()}`}
                              >
                         </Box>

                         <Box auto
                              p={3}>
                          <h3>
                            <Link to={`/departments/${dept.name.toLowerCase().split(' ').join('_')}`}>{icons[dept.name].charAt(0).toUpperCase() + icons[dept.name].slice(1)}</Link>
                          </h3>
                          <p> Number of current faculty: {Math.round((Math.random()*10))} </p>
                         </Box>

                     </Flex>
                </Box>
              )}
          </Flex>

      </div>
    );
  }
}
