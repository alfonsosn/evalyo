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
        <Flex wrap align="center" pt={6} py={6}>
        {this.state.departments.map((name, index)=>
          <Box key={index}>
            <img className="logo" src={`../../icons/${icons[name]}`}></img>
            <Link to={`/departments/${name.toLowerCase().split(' ').join('_')}`}>{name}</Link>
          </Box>
        )}
          </Flex>
      </div>
    );
  }
}
