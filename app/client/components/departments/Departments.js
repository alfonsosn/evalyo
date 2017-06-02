'use strict';

import React from 'react';
import { Link } from 'react-router';
import { Flex, Box } from 'reflexbox'
import Search from '../search/Search.js'
import DepartmentCard from '../cards/DepartmentCard.js'
import $ from "jquery"

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
      this.setState({departments: departments})
    });
  }

  render() {
    return (
    <div className="action">

    <Search></Search>

      <Flex pt={3} wrap>
        <Box col={12} lg={12} sm={12} >
          <h2> Or Browse Through Departments </h2>
        </Box>
      </Flex>

      <Flex py={2}
            justify='center'
            align='center'
            wrap>
              {this.state.departments.map((dept, index)=>
                <DepartmentCard key={index} dept={dept}></DepartmentCard>
              )}
          </Flex>

      </div>
    );
  }
}
