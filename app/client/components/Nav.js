'use strict';

import React from 'react';
import rebass from 'rebass'
import { Button } from 'rebass'

export default class Nav extends React.Component {

  getChildContext () {
    return {
      rebass:
        {
          Button:
          {
            backgroundColor:  'purple'
          }
        }
      }
    }

  render() {
      console.log("rebass", rebass.Button)
      return (
        <div>
          <Button>By Departments</Button>
          <div className="app-content">{this.props.children}</div>
         </div>
      );
    }

    childContextTypes: {
      rebass: React.PropTypes.object
    }
  }
