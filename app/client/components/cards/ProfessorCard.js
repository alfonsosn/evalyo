'use strict';

import React from 'react';
import { Link } from 'react-router';
import { Flex, Box } from 'reflexbox'
import $ from "jquery";

export default class ProfessorCard extends React.Component{
  constructor(props){
      super(props);
      this.state = {
        reviews_num: ''
      };
  }

  getRandomInt(min, max){
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
  }

  obtainInitials(prof){
    let initials = prof.firstName[0] + prof.lastName[0]
    return initials
  }

  componentDidMount(){
    $.ajax({
      url: `/api/professors/${this.props.prof._id}`,
      type: 'GET'
    })
    .done((reviews) => {
      this.setState({reviews_num: reviews.ratings.length})
    })
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
                <p> Reviews Avaialable: {this.state.reviews_num} </p>
             </Box>
             </Flex>
      </Box>
    )
  }
}
