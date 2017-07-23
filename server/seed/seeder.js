// const express = require('express');
// const app = express();
const mongoose = require('mongoose');
// Initializing models by importing routes
const ProfessorModel = require('../models/professors');
const CourseModel = require('../models/courses')
const RatingsModel = require('../models/ratings')
const DepartmentModel = require('../models/departments')

const fs = require('fs')
const path = require('path');
// const bodyParser = require('body-parser')

const chalk = require('chalk');


const startDb = () => new Promise((resolve) => {
  mongoose.connect('mongodb://localhost/ReViews');
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
      const subject = current.subject.split(' ')
      // console.log('subject: ', subject)

      CourseModel.findOneAndUpdate(
        { subject: subject[0] + ' ' + subject[1] }, 
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
            section: subject[3],
            subject: course._id,
            professor: professor._id,
            questions: current.questions
          })
          .then((rating) => {
            // console.log('class: ', response)
            ProfessorModel.findByIdAndUpdate(
              professor._id,
              { $addToSet: {"ratings": rating._id}}
            ).then(() => {
              recursiveInsert(index + 1)
            })
          })
          .catch((e)=> {console.log(e)})
        })
      })
    } 
    recursiveInsert(0)
  })


const commitFilesInDir = (dirName) => {
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
          lastName: lastName,
          department: dirName.slice(dirName.lastIndexOf('/') + 1)
        }).then((professor) => {
          DepartmentModel.findOneAndUpdate({ name: professor.department }, 
            { $addToSet: {"professors": professor._id}},
            { upsert: true, new: true})
          .then(() => { 
              // console.log('professor:', professor)
              const courses = jsonFile.courses
              insertCourses(courses, professor).then(() => {
                console.log('---- done -----')
              })
          })
        })
      })
    })
  })
}

const getDirectories = (src) => (
  fs.readdirSync(src).filter((dirName) => (
    fs.statSync(path.join(src, dirName)).isDirectory())
  )
)

const connect = () => startDb().then(() => {
  console.log(chalk.green('MongoDB connection opened'));
  // Create text index on Professor collection
  ProfessorModel.collection.createIndex({
     firstName: "text",
     lastName: "text"
  })
  // Read all json files from json dir
  const dirList = getDirectories(path.resolve(__dirname) + '/json')

  dirList.forEach((dirName) => {
    commitFilesInDir(path.resolve(__dirname) + '/json/' + dirName)
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
