'use strict';

import React from 'react';
import { Link } from 'react-router';
import { Flex, Box } from 'reflexbox'
import $ from "jquery"

const profs = ["Zamfirescu, Christina", "Schaffer, Cullen", "Schweitzer, Eric", "Vazquez-Abad, Felisa", "Stamos, Ioannis", "Xu, Jia", "Xie, Lei", "Khatchadourian, Raffi", "Mneimneh, Saad", "Debroy, Saptarshi", "Weiss, Stewart N.", "Shankar, Subash", "Epstein, Susan L.", "Sakas, William G."]

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
      <Flex wrap justify="center"
            align="center"
            pt={6} py={4}>
              {this.state.professors.map((prof, index)=>
              <Box lg={6}
                   sm={6}
                   key={index} className="card">
                     <Flex align="center"
                           justify="space-between">
                     <Box p={3}
                          align="center">
                         <h1> {this.obtainInitials(prof)} </h1>
                     </Box>
                     <Box auto
                          p={3}>
                      <h3>
                        <Link to={`/professor/${prof.firstName}`}>
                          {prof.firstName} {prof.lastName}
                        </Link>
                      </h3>
                      <h4>

                      </h4>
                      <h5>

                      </h5>
                     </Box>
                     </Flex>
              </Box>
        )}
      </Flex>
    );
  }
}
