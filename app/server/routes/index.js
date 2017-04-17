'use strict';

import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Nav from '../components/Nav';
import IndexPage from '../components/IndexPage';
import NotFoundPage from '../components/NotFoundPage';

const routes = (
  <Route path="/" component={Nav}>
    <IndexRoute component={IndexPage}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);

export default routes;
