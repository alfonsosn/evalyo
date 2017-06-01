'use strict';

import React from 'react';
import { Link } from 'react-router';
import { Flex, Box } from 'reflexbox'
import $ from "jquery";
require('./style.scss')

const dpmts = ["Biology", "Chemistry", "Computer Science", "Economics", "Math", "Philosophy"];
const icons = {"BIO":"biology", "CHEM": "chemistry", "CSCI": "computer", "ECON": "economics", "MATH":"math", "PHILO":"philosophy"};

export default class DeparmentCard extends React.Component{
  constructor(props){
      super(props);
      this.state = {
        faculty_num: ''
      };
  }

  componentDidMount(){
    $.ajax({
      url: `/api/professors/${this.props.dept}`,
      type: 'GET'
    })
    .done(dept => {
      this.setState({faculty_num: dept.professors.length})
    });
  }

  render(){

    return(
      <Box col={12}
           lg={6}
           sm={6}
           key={index}
           className="card">
             <Flex align="center"
                   justify="space-between">
               <Box p={3}
                    align="center"
                    className={`${icons[this.props.dept.name].toLowerCase()}`}
                    >
               </Box>

               <Box auto
                    p={3}>
                <h3>
                  <Link to={`/departments/${this.props.dept.name.toLowerCase().split(' ').join('_')}`}>{icons[this.props.dept.name].charAt(0).toUpperCase() + icons[this.props.dept.name].slice(1)}</Link>
                </h3>
                <p> Number of current faculty: {this.state.faculty_num} </p>
               </Box>

           </Flex>
      </Box>
    )
  }
}
