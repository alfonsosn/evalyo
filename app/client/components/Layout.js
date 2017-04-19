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
          Toolbar
          </NavItem>
          <NavItem is="a">
          NavItem
          </NavItem>
          <Space
          auto
          x={1}
          />
          <NavItem is="a">
          NavItem
          </NavItem>
          </Toolbar>
          <div className="app-content">{this.props.children}</div>
         </div>
      );
    }
  }
