'use strict'
var chalk = require('chalk');
//Create node server instance!
var server = require('http').createServer();

var createApplication = function () {
    var app = require('./server');
    server.on('request', app); // Attach the Express application.
};

//
var startServer = function () {
    createApplication();

    const PORT = process.env.PORT || 8000;
    const ENV = process.env.NODE_ENV || 'DEVELOPMENT';

    server.listen(PORT, function () {
        console.info(chalk.blue(`Server started. PORT ${chalk.magenta(PORT)} [${chalk.white(ENV)}]`));
    });
}();
