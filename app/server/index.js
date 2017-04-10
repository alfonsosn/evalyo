'use strict';
var path = require('path');
var express = require('express');
var app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/evalyo')
// Importing models
// const ProfessorModel = require('../db/models/professors');
// const CourseModel = require('../db/models/courses')
// const RatingsModel = require('../db/models/ratings')

module.exports = app;

require('./configure')(app);

// Routes that will be accessed via AJAX should be prepended with
// /api so they are isolated from our GET /* wildcard.
app.use('/', require('./routes'));

/*
 This middleware will catch any URLs resembling a file extension
 for example: .js, .html, .css
 This allows for proper 404s instead of the wildcard '/*' catching
 URLs that bypass express.static because the given file does not exist.
 */

app.use(function (req, res, next) {
    if (path.extname(req.path).length > 0) {
        res.status(404).end();
    } else {
        next(null);
    }
});

app.get('/*', function (req, res, next) {
    next(null);
});

// Error catching endware.
app.use(function (err, req, res, next) {
    console.error(err, typeof next);
    res.status(err.status || 500).send(err.message || 'Internal server error.');
});
