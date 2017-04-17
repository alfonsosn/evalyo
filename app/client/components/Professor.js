'use strict';

import React from 'react';
import { Link } from 'react-router';
//import professors from '../data/professors.js';
import $ from "jquery"

export default class Professor extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        courses: []
      };
  }

  componentDidMount(){
    $.ajax({
      url: `/api/professors/${this.props.params.prof}`,
      type: 'GET'
    })
    .done(courses => {
      console.log('courses:', courses)
      // this.setState({courses})
    });
  }

  render() {
    // console.log(professors)
    console.log('props.params', this.props.params)
    return (
      <div>

      </div>
    );
  }
}

/*
<ul>
{this.state.courses.map((name, index)=>
  <li key={index}>
    <Link to={`/professor/:name`}> {name}</Link>
  </li>
)}
</ul>
*/
