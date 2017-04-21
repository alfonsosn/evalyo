'use strict';

import React from 'react';
import { Link } from 'react-router';
import { Button } from 'rebass'
import { Flex, Box } from 'reflexbox'

export default class Index extends React.Component {
  render() {
    return (
      <section style={{
        backgroundImage: 'url("thomas-hunter.jpg")'
      }}>
        <div className="home">
          <Flex wrap align="center" pt={6} py={6}>
            <Box col={12} lg={4} sm={12}></Box>
            <Box col={12} lg={4} sm={12}>
              <div className="card action">
                  <h1> Try out Evalyo </h1>
                  <h2>   </h2>
                  <Link
                    to={`/departments/`}>
                      <Button> Click here to get started! </Button>
                  </Link>
              </div>
            </Box>
            <Box col={12} lg={4} sm={12}></Box>
          </Flex>
        </div>
        <div
          className="info">
            <h1> More info here </h1>
        </div>
      </section>
    );
  }
}
