'use strict';

import React from 'react';
import { Link } from 'react-router';

export default class IndexPage extends React.Component {
  render() {
    return (
      <div className="home">
        <div className="center">
          <h1> Welcome </h1>
          <h2> <a> By Professors  </a></h2>
          <Link to={`/departments/`}>
            <h2> By Departments </h2>
          </Link>
        </div>
      </div>
    );
  }
}
