'use strict';

import React from 'react';
import { Link } from 'react-router';
import { Flex, Box } from 'reflexbox'
import $ from "jquery"

const dpmts = ["Biology", "Chemistry", "Computer Science", "Economics", "Math", "Philosophy"];
const icons = {"Biology":"bio.png", "Chemistry": "chem.png", "Computer Science": "csci.png", "Economics": "econ.png", "Math":"math.png", "Philosophy":"philo.png"};

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
      <Flex  py={6} justify='center' align='center' wrap>
        <Box sm={12} lg={8}>
        <Flex  py={2} justify='center' align='center' wrap>
            {this.state.departments.map((name, index)=>
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
                        <img className="logo" src={require(`../../icons/${icons[name]}`)}></img>
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
