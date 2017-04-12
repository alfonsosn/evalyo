// const express = require('express');
// const app = express();
const mongoose = require('mongoose');
// Initializing models by importing routes
const ProfessorModel = require('./models/professors');
const CourseModel = require('./models/courses')
const RatingsModel = require('./models/ratings')

const fs = require('fs')
const path = require('path');
// const bodyParser = require('body-parser')

const chalk = require('chalk');


const startDb = () => new Promise((resolve) => {
  mongoose.connect('mongodb://localhost/evalyo');
  resolve()
});


const insertCourses = (courses, professor) =>
  new Promise((resolve) => {
    const recursiveInsert = (index) => {
      console.log('courses length: ', courses.length)
      console.log('index: ', index)
      if (index === courses.length){
        return resolve()
      }   
      const current = courses[index]
      console.log('course: ', courses[index] ? true : false)
      const subject = current.subject
      console.log('subject: ', subject)

      CourseModel.findOneAndUpdate(
        { subject: subject }, 
        { $addToSet: {"professors": professor._id}},
        { upsert: true, new: true})
      .then((course) => {
        ProfessorModel.findByIdAndUpdate(
          professor._id,
          { $addToSet: {"courses": course._id}}
        )
        .then(() => {
          //if (err) throw err
          RatingsModel.findOrCreate({
            year: current.semester.split(' ')[1],
            semester: current.semester.split(' ')[0],
            subject: course._id,
            professor: professor._id,
            questions: current.questions
          })
          .then((response) => {
            console.log('class: ', response)
            recursiveInsert(index + 1)
          })
          .catch((e)=> {console.log(e)})
        })
      })
    } 
    recursiveInsert(0)
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
        let jsonFile = JSON.parse(file)
        let firstName = jsonFile.firstName
        let lastName = jsonFile.lastName

        // Finding or creating professor
        // Note: we are not updating anything
        ProfessorModel.findOrCreate({
          firstName: firstName,
          lastName: lastName
        }).then((professor) => {
         // console.log('professor:', professor)
          const courses = jsonFile.courses
          insertCourses(courses, professor).then(() => {
            console.log('---- done -----')
          })
        })
      })
    })
  })

});

// catches ctrl+c event
process.on('SIGINT', () => {
  mongoose.connection.close()
  console.log('goodbye')
  process.exit()
});

module.exports = connect;

connect()
