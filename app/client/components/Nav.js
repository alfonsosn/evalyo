'use strict';

import React from 'react';
import rebass from 'rebass'
import { Button } from 'rebass'

export default class Nav extends React.Component {
  getChildContext () {
    return {
      rebass: {
        fontSizes: [ 64, 48, 24, 18, 16, 14, 12],
        Button: {
          backgroundColor:  'rgb(238, 85, 68)'
        }
      }
    }
  }

  render() {
    return (
      <div>
        <div className="app-content">{this.props.children}</div>
       </div>
    );
  }
}

Nav.childContextTypes = {
  rebass: React.PropTypes.object
}
