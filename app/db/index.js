// const express = require('express');
// const app = express();
const mongoose = require('mongoose');
// Initializing models by importing routes
const ProfessorModel = require('./models/professors');
const CourseModel = require('./models/courses')
const ClassModel = require('./models/classes')

const fs = require('fs')
const path = require('path');
// const bodyParser = require('body-parser')

const chalk = require('chalk');


const startDb = () => new Promise((resolve) => {
  mongoose.connect('mongodb://localhost/evalyo');
  resolve()
});


const insertCourses = (courses, firstName, lastName) =>
  new Promise((resolve) => {
    const recursiveInsert = (courses, index) => {
      if (index === courses.length) resolve()
      const course = courses[index]
      const subject = course.subject
      CourseModel.findOrCreate({
        subject: subject.split(' ')[0] + ' ' + subject.split(' ')[1].slice(0, 3),
        firstName: firstName,
        lastName: lastName
      })
        .then((response) => {
          console.log('course: ', response)
          // insert ratings
          ClassModel.findOrCreate({
            firstName: firstName,
            lastName: lastName,
            semester: course.semester,
            subject: subject.split(' ')[0] + ' ' + subject.split(' ')[1].slice(0, 3),
            questions: course.questions
          }).then((response) => {
            console.log('class: ', response)
            recursiveInsert(courses, index + 1)
          })
        })
    }
    recursiveInsert(courses, 0)
  })

const connect = () => startDb().then(() => {
  console.log(chalk.green('MongoDB connection opened'));
  // Read all json files from json dir
  let dirName = path.resolve(__dirname) + '/json'
  fs.readdir(dirName, (dirErr, fileNames) => {
    if (dirErr) throw dirErr
    fileNames.forEach((fileName) => {
      fs.readFile(dirName + '/' + fileName, (err, file) => {
        if (err) throw err
        // Parsing each json file
        let profObj = JSON.parse(file)
        let firstName = profObj.firstName
        let lastName = profObj.lastName

        // Finding or creating professor
        // Note: we are not updating anything
        ProfessorModel.findOneAndUpdate({
          firstName: firstName,
          lastName: lastName
        }, {}, {
            upsert: true,
            new: true
          }, (err, prof) => {
            if (err) throw err
            console.log('prof: ', prof)
          })

        const courses = profObj.courses
        insertCourses(courses, firstName, lastName).then(() => {
          console.log('---- done -----')
        })
      })
    })
  })

});

//catches ctrl+c event
process.on('SIGINT', () => {
  mongoose.connection.close()
  console.log('goodbye')
  process.exit()
});

module.exports = connect;

connect()
