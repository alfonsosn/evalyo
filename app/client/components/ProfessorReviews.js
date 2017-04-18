'use strict';

import React from 'react';
import { Link } from 'react-router';
import $ from "jquery";

export default class ProfessorReviews extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        courses: [],
        courseTitles: [],
        prof: ''
      };
  }

  componentDidMount(){
    $.ajax({
      url: `/api/professors/${this.props.params.prof}/${this.props.params.course}`,
      type: 'GET'
    })
    .done(reviews => {
      console.log(reviews)
      // this.setState({'courses': courses, 'courseTitles': courses.courseTitles, 'prof': this.props.params.prof})
    });
  }

  render() {
    return (
      <div>


      </div>
    );
  }
}

// <h1> {this.state.courses.firstName} {this.state.courses.lastName} </h1>
// <p> This professor has previously taught: </p>
//
// <ul>
//   {this.state.courseTitles.map((title, index)=>
//     <li key={index}>
//       <Link to={`/professor/${this.state.prof}/${title}`}>
//       {title}
//       </Link>
//     </li>
//   )}
// </ul>
