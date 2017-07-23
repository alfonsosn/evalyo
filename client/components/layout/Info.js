'use strict';

import React from 'react';
import { Flex, Box } from 'reflexbox'

export default class Info extends React.Component {
  render(){
    return (
      <div>
        <Flex wrap align="center" pt={2}>
          <Box col={12} lg={12} sm={12} pt={2} className="card action">
            <Flex wrap align="stretch">
              <Box col={12} lg={6} sm={12}>
                <h2> Technologies </h2>
                <div className="divider"></div>
                <p> Our team is using the React library to create an app with modern interfaces and improved usability. We also form the UI with design in mind. Moreover, we would use the non-relational database MongoDB that allows for more intuitive ways to represent the data.</p>
              </Box>
              <Box col={12} lg={6} sm={12}>
                <h2> Goals </h2>
                <div className="divider"></div>
                <p> The app can serve as a prototype for the College to pursue a more complete project. Also the value of saving thousands of dollars in an application prototype that's benefitial for both faculty and the student population.</p>
              </Box>
            </Flex>
          </Box>
        </Flex>
      </div>
    )}
  }
