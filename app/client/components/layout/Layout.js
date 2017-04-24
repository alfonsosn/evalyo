'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Button, Toolbar, NavItem, Space } from 'rebass'
require('../styles.scss')
import icon from '../../icons/white_icon.png'

export default class Layout extends React.Component {
  render() {
      return (
        <div>
          <Toolbar>
              <NavItem is="a">
                <Link to={`/`}>
                  <img className="logo" src={icon}></img>
                </Link>
              </NavItem>
              <Link to={`/`}>
              <NavItem is="a">
                <h3 className="link">Evalyo</h3>
              </NavItem>
              </Link>
            <Space auto x={1}/>
          </Toolbar>
          <div className="app-content">{this.props.children}</div>
         </div>
      );
    }
  }
