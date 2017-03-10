'use strict';
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser')
var exphbs = require('express-handlebars')
var router = require('express').Router();
var app = express();
module.exports = app;

// this sets the layout template MAIN for handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}))

// this sets the views engine of handlebars
app.set('view engine', 'handlebars')
app.set('views', './views')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// sets the public directory to our PATH
app.use(express.static(__dirname + './public'))

// Pass our express application pipeline into the configuration
// function located at server/app/configure/index.js
// require('./configure')(app);
//
// // Routes that will be accessed via AJAX should be prepended with
// // /api so they are isolated from our GET /* wildcard.
// app.use('/api', require('./routes'));
//
//
// /*
//  This middleware will catch any URLs resembling a file extension
//  for example: .js, .html, .css
//  This allows for proper 404s instead of the wildcard '/*' catching
//  URLs that bypass express.static because the given file does not exist.
//  */
// app.use(function (req, res, next) {
//     if (path.extname(req.path).length > 0) {
//         res.status(404).end();
//     } else {
//         next(null);
//     }
// });
//
// app.get('/*', function (req, res) {
//     // res.sendFile(app.get('indexHTMLPath'));
//     console.log(path)
//     res.render('index', {title: "Alfonso"});
// });

/* SHIT IM ADDING TO MAKE IT WORK */

router.get('/', function(req, res, next) {
  res.render('index', {title: "Alfonso"});
})

router.get('/class', function(req, res, next) {
  res.render('class', {course: "CSCI 34000 ", name: "Operating Systems"});
})

router.get('/prof', function(req, res, next) {
  res.render('professor');
})

// Error catching endware.
app.use(function (err, req, res, next) {
    console.error(err, typeof next);
    res.status(err.status || 500).send(err.message || 'Internal server error.');
});
