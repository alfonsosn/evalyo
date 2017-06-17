'use strict';

import React from 'react';
import { Link } from 'react-router';
import { Flex, Box } from 'reflexbox'
import $ from "jquery";
require('./style.scss')

const dpmts = ["Biology", "Chemistry", "Computer Science", "Economics", "Math", "Philosophy"];
const icons = {"BIO":"biology", "CHEM": "chemistry", "CSCI": "computer", "ECON": "economics", "MATH":"math", "PHILO":"philosophy"};

export default class DepartmentCard extends React.Component{
  constructor(props){
      super(props);
      this.state = {
        faculty_num: ''
      };
  }

  componentDidMount(){
    $.ajax({
      url: `/api/departments/${this.props.dept.name.toLowerCase()}`,
      type: 'GET'
    })
    .done(dept => {
      console.log("hello")
      console.log(dept.professors)
      this.setState({faculty_num: dept.professors.length})
    });
  }

  render(){
    console.log(this.props.dept.name)

    return(
      <Box col={12}
           lg={6}
           sm={6}
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
                  <Link to={`/departments/${this.props.dept.name.toLowerCase().split(' ').join('_')}`}>{icons[this.props.dept.name].toUpperCase()}</Link>
                </h3>
                <p> Number of faculty: {this.state.faculty_num} </p>
               </Box>

           </Flex>
      </Box>
    )
  }
}
