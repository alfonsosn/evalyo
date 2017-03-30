'use strict'
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require("fs"))

// HELPER FUNCTIONS
const onlyUnique = (value, index, self) => {
  return self.indexOf(value) === index;
}

// Parser from Server
exports.parseProfJSON = (data) => {
  let prof = JSON.parse(data)
  prof.courseTitles = []
  prof.courses.forEach(element => {
          prof.courseTitles.push((element.subject).split(' ').join('_'));
      })
  prof.courseTitles = prof.courseTitles.filter(onlyUnique).sort();
  return prof
}

exports.getJSON = (file) => {
  return fs.readFileAsync(file, 'utf8');
}
