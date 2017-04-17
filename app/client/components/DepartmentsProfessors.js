'use strict';

import React from 'react';
import { Link } from 'react-router';
//import professors from '../data/professors.js';
import $ from "jquery"

const profs = ["Zamfirescu, Christina", "Schaffer, Cullen", "Schweitzer, Eric", "Vazquez-Abad, Felisa",
"Stamos, Ioannis", "Xu, Jia", "Xie, Lei", "Khatchadourian, Raffi", "Mneimneh, Saad", "Debroy, Saptarshi",
"Weiss, Stewart N.",
"Shankar, Subash",
"Epstein, Susan L.",
"Sakas, William G.",]

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
            <Link to={`/professor/${name.toLowerCase().split(' ')[1]}`}>{name}</Link>
          </li>
        )}
        </ul>
      </div>
    );
  }
}
