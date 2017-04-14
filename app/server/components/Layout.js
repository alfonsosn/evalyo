'use strict';
import React from 'react';
import { Link } from 'react-router';

export default class Layout extends React.Component {
  render() {
    return (
      <div>
        <nav>
          <logo>Evalyo</logo>
          <a href="#">Nevermind</a>
          <a href="#">Hunter Catalog</a>
        </nav>
        <img src={'img/hunter-campus-2.jpg'}></img>
      </div>
    );
  }
}
