'use strict';
var path = require('path');
var express = require('express');
var router = require('./routes');
var app = new express();

module.exports = app;

require('./configure')(app);


app.use('/api', router);

app.get('/*', function(req, res){
  res.sendFile(path.join('/index.html'));
})



//
// // universal routing and rendering
// app.get('*', (req, res) => {
//   match(
//     { routes, location: req.url },
//     (err, redirectLocation, renderProps) => {
//
//       // in case of error display the error message
//       if (err) {
//         return res.status(500).send(err.message);
//       }
//
//       // in case of redirect propagate the redirect to the browser
//       if (redirectLocation) {
//         return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
//       }
//
//       // generate the React markup for the current route
//       let markup;
//       if (renderProps) {
//         // if the current route matched we have renderProps
//         markup = renderToString(<RouterContext {...renderProps}/>);
//       } else {
//         // otherwise we can render a 404 page
//         markup = renderToString(<NotFoundPage/>);
//         res.status(404);
//       }
//
//       // render the index template with the embedded React markup
//       return res.render('index', { markup });
//     }
//   );
// });
