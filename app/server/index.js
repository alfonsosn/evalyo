'use strict';
var path = require('path');
var express = require('express');
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from './routes/index.ejs';

var app = express();
module.exports = app;

require('./configure')(app);

// universal routing and rendering
app.get('*', (req, res) => {
  match(
    { routes, location: req.url },
    (err, redirectLocation, renderProps) => {

      // in case of error display the error message
      if (err) {
        return res.status(500).send(err.message);
      }

      // in case of redirect propagate the redirect to the browser
      if (redirectLocation) {
        return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      }

      // generate the React markup for the current route
      let markup;
      if (renderProps) {
        // if the current route matched we have renderProps
        markup = renderToString(<RouterContext {...renderProps}/>);
      } else {
        // otherwise we can render a 404 page
        markup = renderToString(<NotFoundPage/>);
        res.status(404);
      }

      // render the index template with the embedded React markup
      return res.render('index', { markup });
    }
  );
});


// // Routes that will be accessed via AJAX should be prepended with
// // /api so they are isolated from our GET /* wildcard.
// app.use('/', require('./routes'));
//
// /*
//  This middleware will catch any URLs resembling a file extension
//  for example: .js, .html, .css
//  This allows for proper 404s instead of the wildcard '/*' catching
//  URLs that bypass express.static because the given file does not exist.
//  */
//
// app.use(function (req, res, next) {
//     if (path.extname(req.path).length > 0) {
//         res.status(404).end();
//     } else {
//         next(null);
//     }
// });
//
// app.get('/*', function (req, res, next) {
//     next(null);
// });

// Error catching endware.
app.use(function (err, req, res, next) {
    console.error(err, typeof next);
    res.status(err.status || 500).send(err.message || 'Internal server error.');
});
