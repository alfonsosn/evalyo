const mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ProfessorSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

ProfessorSchema.statics.findOrCreate = function (query) {
  // console.log(query)
  return new Promise((resolve) => {
    this.findOne(query, (err, response) => {
      if (err) throw err
      if (!response) {
        this.create(query, (err, newProfessor) => {
          resolve('created new professor')
        })
      } else {
        resolve('found professor')
      }
    })
  })
}

module.exports = mongoose.model('Professor', ProfessorSchema);
