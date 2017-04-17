'use strict';
import React from 'react';
import { Link } from 'react-router';

export default class Nav extends React.Component {
  render() {
    return (
      <div>
        <nav>
          <a href="#">Hunter College</a>
          <a href="#">Hunter Catalog</a>
        </nav>
        <div className="app-content">{this.props.children}</div>
       </div>
    );
  }
}
