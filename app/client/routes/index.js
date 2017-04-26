'use strict';

import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Layout from '../components/layout/Layout.js';
import Index from '../components/index/Index.js';
import Departments from '../components/departments/Departments.js';
import Faculty from '../components/faculty/Faculty.js';
import Professor from '../components/professor/Professor.js'
import Review from '../components/review/Review.js'
import NotFoundPage from '../components/404/NotFoundPage';

const routes = (
  <Route path="/" component={Layout}>
    <IndexRoute component={Index}/>
    <Route path="/departments" component={Departments}/>
    <Route path="/departments/:dept" component={Faculty}/>
    <Route path="/professor/:prof" component={Professor}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);

export default routes;
