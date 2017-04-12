'use strict';
// var router = require('express').Router();
// module.exports = router;
//
// // redirect all traffic to appropriate routes
// router.use('/professor', require('./professors'));
// router.use('/class', require('./classes'));
//
// // redirect to main page
// router.get('/', function(req, res) {
//   res.render('index', {title: "Alfonso"});
// })
//
// // Make sure this is after all of the registered routes!
// router.use(function(req, res) {
// 	res.status(404).end()
// });
import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Layout from '../components/Layout';
// import IndexPage from '../components/IndexPage';
// import AthletePage from './components/AthletePage';
import NotFoundPage from '../components/NotFoundPage';

const routes = (
  <Route path="/" component={Layout}>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);

export default routes;
