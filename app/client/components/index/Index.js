'use strict';

import React from 'react';
import { Button } from 'rebass'
import { Flex, Box } from 'reflexbox'
import banner from '../../img/thomas-hunter.jpg'
import Sub from './Sub.js'
import Info from './Info.js'
import Departments from '../departments/Departments.js'


export default class Index extends React.Component {
  render() {
    return (
        <div className="home">
          <Flex wrap align="center" pt={1} >
            <Box col={12} lg={2} sm={12}></Box>
            <Box col={12} lg={8} sm={12} className="card action">
              <Sub></Sub>
              <Departments></Departments>
            </Box>
            <Box col={12} lg={2} sm={12}></Box>
          </Flex>
        </div>
    );
  }
}
