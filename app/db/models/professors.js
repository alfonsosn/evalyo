const mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ProfessorSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }]
});

ProfessorSchema.statics.findOrCreate = function (query) {
  // console.log(query)
  return new Promise((resolve) => {
    this.findOne(query, (err, professor) => {
      if (err) throw err
      if (!professor) {
        this.create(query, (err, professor) => {
          if (err) throw err
          resolve(professor)
        })
      } else {
        resolve(professor)
      }
    })
  })
}

module.exports = mongoose.model('Professor', ProfessorSchema);
