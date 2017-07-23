'use strict'
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require("fs"))



// Parser from Server
exports.parseCoursesJSON = (data) => {
  let courses = JSON.parse(data).CSCI;

  return courses
}

exports.getJSON = (file) => {
  return fs.readFileAsync(file, 'utf8');
}
