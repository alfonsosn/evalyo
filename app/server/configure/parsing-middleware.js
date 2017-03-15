'use strict';
var bodyParser = require('body-parser');

module.exports = function (app) {

    // Important to have this before any session middleware
    // we need a cookie parser

    // Parse our POST and PUT bodies.
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

};
