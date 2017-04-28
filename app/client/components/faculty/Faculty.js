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
      <div className="home">
      <Flex pt={6} wrap>
        <Box col={12} lg={2} sm={0}></Box>
        <Box col={12} lg={8} sm={12} pt={2} className="card action">
          <h1> Choose your Professor </h1>
        </Box>
        <Box col={12} lg={2} sm={0}></Box>
      </Flex>
      <Flex justify='center' align='center' wrap>
        <Box sm={12} lg={8}>
          <Flex  py={2} justify='center' align='center' wrap>
              {this.state.professors.map((name, index)=>
              <Box lg={6}
                   sm={6}
                   key={index} className="card">
                     <Flex align="center"
                           justify="space-between">
                     <Box p={3}
                          align="center"
                          className="init">
                         <h1> {this.obtainInitials(name)} </h1>
                     </Box>
                     <Box auto
                          p={3}>
                      <h3>
                        <Link to={`/professor/${name._id}`}>
                          {name.firstName} {name.lastName}
                        </Link>
                      </h3>
                      <br></br>
                      <h4>
                        <p> Number of classes Taught {Math.round((Math.random()*13))} </p>
                      </h4>
                      <h5>
                        <p> Years taught at Hunter College {Math.round((Math.random()*8))} </p>
                      </h5>
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
