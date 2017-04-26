'use strict';

import React from 'react';
import { Link } from 'react-router';
import { Flex, Box } from 'reflexbox'
import $ from "jquery"

const dpmts = ["Biology", "Chemistry", "Computer Science", "Economics", "Math", "Philosophy"];
const icons = {"BIO":"bio.png", "CHEM": "chem.png", "CSCI": "csci.png", "ECON": "econ.png", "MATH":"math.png", "PHILO":"philo.png"};

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
      <div>
      <Flex  py={6} justify='center' align='center' wrap>
        <Box sm={12} lg={8}>
        <Flex  py={2} justify='center' align='center' wrap>
            {this.state.departments.map((dept, index)=>
              <Box col={12}
                   lg={6}
                   sm={6}
                   key={index} className="card">
                   <Flex
                     align="center"
                     justify="space-between"
                     >
                   <Box p={3}
                        align="center">
                          <img className="logo" src={require(`../../icons/${icons[dept.name]}`)}></img>
                   </Box>
                   <Box auto
                        p={3}>
                    <h3>
                      <Link to={`/departments/${dept.name.toLowerCase().split(' ').join('_')}`}>{dept.name}</Link>
                    </h3>
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
