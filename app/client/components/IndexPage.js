'use strict';

import React from 'react';
import { Link } from 'react-router';
import { Button } from 'rebass'
import { Flex, Box } from 'reflexbox'

export default class IndexPage extends React.Component {
  render() {
    return (
      <div>
        <Flex
          className="home"
          flexColumn={true}
          justify="center">
            <box
              p={2}
              className="center">
                <h1> Welcome </h1>
                <Link
                  to={`/departments/`}>
                    <Button>By Departments</Button>
                </Link>
            </box>
        </Flex>
        <div
          className="info">
            <h1> More info here </h1>
        </div>
      </div>
    );
  }
}
