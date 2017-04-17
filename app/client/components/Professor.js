'use strict';

import React from 'react';
import { Link } from 'react-router';
//import professors from '../data/professors.js';
import $ from "jquery"

export default class DepartmentsProfessors extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        professors: []
      };
  }

  componentDidMount(){
    $.ajax({
      // url: '/professors/'
      url: '/',
      type: 'GET'
    })
    .done(professors => {
      this.setState({professors: profs})
    });
  }

  render() {
    // console.log(professors)
    console.log('props', this.props)
    return (
      <div>
        <ul>
        {this.state.professors.map((name, index)=>
          <li key={index}>
            <Link to={`/professor/:name`}> {name}</Link>
          </li>
        )}
        </ul>
      </div>
    );
  }
}
