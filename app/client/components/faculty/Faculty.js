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


  obtainInitials(name){
    let initials = name.split(' ')
    return (initials[1][0] + initials[0][0])
  }


  componentDidMount(){
    $.ajax({
      url: '/',
      type: 'GET'
    })
    .done(professors => {
      this.setState({professors: profs})
    });
  }

  render() {
    console.log('props', this.props)
    return (
      <Flex wrap justify="center"
            align="center"
            pt={6} py={4}>
              {this.state.professors.map((name, index)=>
              <Box lg={6}
                   sm={6}
                   key={index} className="card">
                     <Flex align="center"
                           justify="space-between">
                     <Box p={3}
                          align="center">
                         <h1> {this.obtainInitials(name)} </h1>
                     </Box>
                     <Box auto
                          p={3}>
                      <h3>
                        <Link to={`/professor/${name.toLowerCase().split(' ')[1]}`}>{name}</Link>
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
