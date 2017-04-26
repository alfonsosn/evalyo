'use strict'
var chalk = require('chalk');
var server = require('http').createServer();
const mongoose = require('mongoose');

var createApplication = function () {
    var app = require('./server');
    server.on('request', app); // Attach the Express application.
};

mongoose.connect('mongodb://localhost/evalyo')
const db = mongoose.connection

var startServer = function () {
    createApplication();

    const PORT = process.env.PORT || 8000;
    const ENV = process.env.NODE_ENV || 'DEVELOPMENT';

    
    db.on('error', console.error.bind(console, 'connection error:'));
    
    db.once('open', function() {
      server.listen(PORT, function () {
        console.info(chalk.blue(`Server started. PORT ${chalk.magenta(PORT)} [${chalk.white(ENV)}]`));
      });
    })

}();
