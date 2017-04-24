'use strict';

import React from 'react';
import { Link } from 'react-router';
import { Flex, Box } from 'reflexbox'
require('../styles.scss')

export default class NotFoundPage extends React.Component {
  render() {
    return (
      <Flex p={6}>
        <Box col={12} lg={2} sm={12}></Box>
        <Box col={12} lg={8} sm={12} pt={2} className="card action">
          <h1>404</h1>
          <h2>Page not found!</h2>

          <iframe src="//giphy.com/embed/wQIGDx5hz1A2I" width="400" height="400" frameBorder="0" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/help-door-red-panda-wQIGDx5hz1A2I">via GIPHY</a></p>

          <p>
            <Link to="/">Go back to the main page</Link>
          </p>
        </Box>
        <Box col={12} lg={2} sm={12}></Box>
      </Flex>
    )
  }
}
