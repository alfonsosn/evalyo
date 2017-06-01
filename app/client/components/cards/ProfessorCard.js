'use strict';

import React from 'react';
import { Link } from 'react-router';
import { Flex, Box } from 'reflexbox'


export default class ProfessorCard extends React.Component{
  getRandomInt(min, max){
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
  }

  obtainInitials(prof){
    let initials = prof.firstName[0] + prof.lastName[0]
    return initials
  }

  render(){

    return(
      <Box col={12}
           lg={6}
           sm={6}
           className="card">
             <Flex align="center"
                   justify="space-between">
               <Box align="center"
                    className="circle">
                   <h1> {this.obtainInitials(this.props.prof)} </h1>
               </Box>

               <Box auto
                    p={3}>
                <h3>
                  <Link to={`/professor/${this.props.prof._id}`}>
                    {this.props.prof.firstName.toUpperCase()} {this.props.prof.lastName.toUpperCase()}
                  </Link>
                </h3>
                <p> Reviews Avaialable: {this.getRandomInt(10, 4)} </p>
                <p> Classes Avaialable: {this.getRandomInt(10, 4)} </p>
             </Box>
             </Flex>
      </Box>
    )
  }
}
