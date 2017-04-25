'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Button, Toolbar, NavItem, Space } from 'rebass'
require('../styles.scss')
import icon from '../../icons/white_icon.png'
import { Flex, Box } from 'reflexbox'

export default class Layout extends React.Component {
  render() {
      return (
        <div className="home">

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

          <div className="home">
          <div className="app-content">{this.props.children}</div>
          </div>
           <footer>
              <Flex>
                  <Box col={4}>
                      <span className="copyright">Copyright &copy; Evalyo 2017</span>
                  </Box>
                  <Box col={4}>
                  </Box>
                  <Box col={4}>
                      <ul className="list-inline quicklinks">
                          <a href="#">Privacy Policy</a> |
                          <a href="#">Terms of Use</a>
                      </ul>
                  </Box>
              </Flex>
          </footer>
          </div>
      );
    }
  }
