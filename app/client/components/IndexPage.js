'use strict';

import React from 'react';
import { Link } from 'react-router';
import { Button } from 'rebass'

export default class IndexPage extends React.Component {
  render() {
    return (



      <div className="home">
        <div className="center">
          <h1> Welcome </h1>
          <Link to={`/departments/`}>

            <Button>By Departments</Button>
          </Link>
        </div>
      </div>
    );
  }
}
