'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Button, Toolbar, NavItem, Space } from 'rebass'
import { Flex, Box } from 'reflexbox'
require('../styles.scss')
import icon from '../../icons/white_icon.png'
import banner from '../../img/thomas-hunter.jpg'
import Sub from './Sub.js'
import Info from './Info.js'

export default class Layout extends React.Component {
  render() {
      return (
        <div className="home">
          <Toolbar
            backgroundColor="purple"
          >
              <NavItem is="a">
                <Link to={`/`}>
                  <img className="logo" src={icon}></img>
                </Link>
              </NavItem>

              <Link to={`/`}>
              <NavItem is="a">
                <h3 className="link">REVIEWS</h3>
              </NavItem>
              </Link>
            <Space auto x={1}/>
          </Toolbar>

          <div className="home">
            <div className="app-content">

            <div className="home">
              <Flex wrap align="center" pt={1} >
                <Box col={12} lg={2} sm={12}></Box>
                <Box col={12} lg={8} sm={12} className="card action">
                  <Sub></Sub>
                  {this.props.children}
                </Box>
                <Box col={12} lg={2} sm={12}></Box>
              </Flex>
            </div>

            </div>
          </div>

        </div>
      );
    }
  }
