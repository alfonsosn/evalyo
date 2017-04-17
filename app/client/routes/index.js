'use strict';

import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Nav from '../components/Nav';
import IndexPage from '../components/IndexPage';
import Departments from '../components/Departments';
import DepartmentsProfessors from '../components/DepartmentsProfessors';
import NotFoundPage from '../components/NotFoundPage';

const routes = (
  <Route path="/" component={Nav}>
    <IndexRoute component={IndexPage}/>
    <Route path="departments" component={Departments}/>
    <Route path="departments/:name" component={DepartmentsProfessors}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);

export default routes;