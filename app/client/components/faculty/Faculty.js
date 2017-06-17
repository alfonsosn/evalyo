'use strict';

import React from 'react';
import { Link } from 'react-router';
import { Flex, Box } from 'reflexbox';
import ProfessorCard from '../cards/ProfessorCard.js';
import $ from "jquery";

export default class Faculty extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        professors: []
      };
  }

  componentDidMount(){
    $.ajax({
      url: `/api/departments/${this.props.params.dept}`,
      type: 'GET'
    })
    .done(dept => {
      this.setState({professors: dept.professors})
    });
  }

  render() {
    console.log('props', this.props)
    return (
      <div className="action">

      <Flex pt={3} wrap>
        <Box col={12} lg={12} sm={12} >
          <h2> Choose A Professor: </h2>
        </Box>
      </Flex>

      <Flex justify="center"
            align="center"
            py={2}
            wrap>
              {this.state.professors.map((prof, index)=>
                <ProfessorCard key={index} prof={prof}></ProfessorCard>
        )}
      </Flex>
      </div>
    );
  }
}
