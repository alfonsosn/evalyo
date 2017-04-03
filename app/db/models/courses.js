const mongoose = require('mongoose');
var Schema = mongoose.Schema;


var CourseSchema = new Schema({
  subject: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true }
});

CourseSchema.statics.findOrCreate = function (query) {
  // console.log(query)
  return new Promise((resolve) => {
    this.findOne(query, (err, response) => {
      if (err) throw err
      if (!response) {
        this.create(query, (err, newCourse) => {
          resolve('created new course')
        })
      } else {
        resolve('found course')
      }
    })
  })
}

module.exports = mongoose.model('Course', CourseSchema);
