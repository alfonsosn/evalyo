'use strict';

import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Layout from '../components/layout/Layout';
import Departments from '../components/departments/Departments';
import Faculty from '../components/faculty/Faculty';
import Professor from '../components/professor/ProfContainer'
import NotFoundPage from '../components/404/NotFoundPage';
import Search from '../components/search/Search'

const routes = (
  <Route path="/" component={Layout}>
    <IndexRoute component={Departments}/>
    <Route path="/departments/:dept" component={Faculty}/>
    <Route path="/professor/:prof" component={Professor}/>
    <Route path="/search" component={Search}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);

export default routes;
