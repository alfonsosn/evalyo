'use strict';

import React from 'react';
import { Link } from 'react-router';
import $ from "jquery";

export default class ProfessorReviews extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        prof: '',
        course: '',
        evaluations: []
      };
  }

  componentDidMount(){
    $.ajax({
      url: `/api/professors/${this.props.params.prof}/${this.props.params.course}`,
      type: 'GET'
    })
    .done(reviews => {
      this.setState({'course': this.props.params.course, 'prof': this.props.params.prof, 'evaluations': reviews})
      console.log(reviews)
    });
  }

  render() {
    return (
      <div>
        <h1> {this.state.prof} | {this.state.course}</h1>
        <p> Aggregate Reviews for this professor </p>
      </div>
    );
  }
}
