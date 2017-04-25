const mongoose = require('mongoose');
var Schema = mongoose.Schema;


var DepartmentSchema = new Schema({
  name: { type: String, required: true},
  professors: [{ type: Schema.Types.ObjectId, ref: 'Professor' }]
});

DepartmentSchema.statics.findOrCreate = function (query) {
  // console.log(query)
  return new Promise((resolve) => {
    this.findOne(query, (err, department) => {
      if (err) throw err
      if (!department) {
        this.create(query, (err, course) => {
          if (err) throw err
          resolve(department)
        })
      } else {
        resolve(department)
      }
    })
  })
}

module.exports = mongoose.model('Department', DepartmentSchema);
