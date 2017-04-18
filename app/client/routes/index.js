'use strict';

import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Nav from '../components/Nav';
import IndexPage from '../components/IndexPage';
import Departments from '../components/Departments';
import DepartmentsProfessors from '../components/DepartmentsProfessors';
import Professor from '../components/Professor'
import ProfessorReviews from '../components/ProfessorReviews'
import NotFoundPage from '../components/NotFoundPage';

const routes = (
  <Route path="/" component={Nav}>
    <IndexRoute component={IndexPage}/>
    <Route path="departments" component={Departments}/>
    <Route path="departments/:name"          component={DepartmentsProfessors}/>
    <Route path="professor/:prof" component={Professor}
     />
     <Route path="professor/:prof/:course" component={ProfessorReviews}
      />
    <Route path="*" component={NotFoundPage}/>
  </Route>
);

export default routes;
