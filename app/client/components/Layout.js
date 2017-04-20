'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'rebass'
import { Toolbar } from 'rebass'
import { NavItem } from 'rebass'
import { Space } from 'rebass'

export default class Layout extends React.Component {
  render() {

      return (
        <div>
          <Toolbar>
            <NavItem is="a">
              <img id="logo" src="/icons/white_icon.png"></img>
            </NavItem>
            <NavItem is="a">
              Evalyo
            </NavItem>
            <Space auto x={1}/>
          </Toolbar>
          <div className="app-content">{this.props.children}</div>
         </div>
      );
    }
  }
