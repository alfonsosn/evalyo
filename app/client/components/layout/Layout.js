'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Button, Toolbar, NavItem, Space } from 'rebass'
require('../styles.css')
import icons from '../../icons/white_icon.png'

export default class Layout extends React.Component {
  render() {
      return (
        <div>
          <Toolbar>
              <NavItem is="a">
                <Link to={`/`}>
                  <img className="logo" src={icons}></img>
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
