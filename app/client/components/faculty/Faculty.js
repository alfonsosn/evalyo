'use strict';

import React from 'react';
import { Link } from 'react-router';
import { Flex, Box } from 'reflexbox'
import $ from "jquery"

export default class Faculty extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        professors: []
      };
      this.obtainInitials = this.obtainInitials.bind(this)
  }


  obtainInitials(prof){
    let initials = prof.firstName[0] + prof.lastName[0]
    return initials
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
          <h2> Step Two: Choose your Professor </h2>
        </Box>
      </Flex>

      <Flex justify="center"
            align="center"
            py={2}
            wrap>
              {this.state.professors.map((prof, index)=>

              <Box col={12}
                   lg={6}
                   sm={6}
                   key={index} className="card action">
                     <Flex align="center"
                           justify="space-between">
                       <Box p={3}
                            align="center">
                           <h1> {this.obtainInitials(prof)} </h1>
                       </Box>
                       <Box auto
                            p={3}>
                        <h3>
                          <Link to={`/professor/${prof._id}`}>
                            {prof.firstName} {prof.lastName}
                          </Link>
                        </h3>
                     </Box>
                     </Flex>
              </Box>

        )}
      </Flex>
      </div>
    );
  }
}
