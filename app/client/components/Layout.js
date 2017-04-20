'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Button, Toolbar, NavItem, Space } from 'rebass'

export default class Layout extends React.Component {
  render() {

      return (
        <div>
          <Toolbar>
              <NavItem is="a">
                <Link to={`/`}>
                  <img id="logo" src="/icons/white_icon.png"></img>
                </Link>
              </NavItem>
              <Link to={`/`}>
              <NavItem is="a">
                Evalyo
              </NavItem>
              </Link>
            <Space auto x={1}/>
          </Toolbar>
          <div className="app-content">{this.props.children}</div>
         </div>
      );
    }
  }
