'use strict'
var react = require('react');
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';

module.exports = function(app){
  var views = app.getValue('viewsPath');

  // this sets the views engine of handlebars
  app.set('view engine', 'ejs');
  app.set('views', views);
}
