const mongoose = require('mongoose');
var Schema = mongoose.Schema;


var CourseSchema = new Schema({
  subject: { type: String, required: true },
  name: { type: String, required: false},
  professors: [{ type: Schema.Types.ObjectId, ref: 'Professor' }]
});

CourseSchema.statics.findOrCreate = function (query) {
  // console.log(query)
  return new Promise((resolve) => {
    this.findOne(query, (err, course) => {
      if (err) throw err
      if (!course) {
        this.create(query, (err, course) => {
          if (err) throw err
          resolve(course)
        })
      } else {
        resolve(course)
      }
    })
  })
}

module.exports = mongoose.model('Course', CourseSchema);
