'use strict'
var react = require('react');
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';

module.exports = function(app){
  var views = app.getValue('viewsPath');

  // this sets the layout template MAIN for handlebars
  // app.engine('handlebars', exphbs({
  //         defaultLayout: 'main',
  //         extname: '.handlebars',
  //         layoutsDir: views + '/layouts',
  //         partialsDir: views + '/partials',
  // }));

  // this sets the views engine of handlebars
  app.set('view engine', 'ejs');
  app.set('views', views);
}
