'use strict';

import React from 'react';
import { Link } from 'react-router';
import $ from "jquery"

const dpmts = ["Biology", "Computer Science", "Math", "Philosophy", "Political Science"];

export default class Departments extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        departments: []
      };
  }

  componentDidMount(){
    $.ajax({
      url: '/',
      type: 'GET'
    })
    .done(departments => {
      this.setState({departments: dpmts})
    });
  }

  render() {
    return (
      <div>
        <ul>
        {this.state.departments.map((name, index)=>
          <li key={index}>
            <Link to={`/departments/${name.toLowerCase().split(' ').join('_')}`}>{name}</Link>
          </li>
        )}
        </ul>
      </div>
    );
  }
}
