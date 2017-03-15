'use strict'
var chalk = require('chalk');

//Create node server instance!
var server = require('http').createServer();

var createApplication = function () {
    var app = require('./server');
    server.on('request', app); // Attach the Express application.
};


var startServer = function () {
    createApplication()

    var PORT = process.env.PORT || 8000;

    server.listen(PORT, function () {
        console.log(chalk.blue('Server started on port', chalk.magenta(PORT)));
    });

}();
