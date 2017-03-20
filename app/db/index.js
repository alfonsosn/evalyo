'use strict';
var Promise = require('bluebird');
var path = require('path');
var chalk = require('chalk');
var jsonServer = require('json-server')

console.log("are we here?")

var startDbPromise = new Promise(function(resolve, reject) {
  var server = jsonServer.create();
  // var router = jsonServer.router('db.json');
  // return resolve(true)
});

console.log(chalk.yellow('Opening connection to MongoDB . . .'));
startDbPromise.then(function() {
	console.log(chalk.green('MongoDB connection opened!'));
});

module.exports = startDbPromise;
