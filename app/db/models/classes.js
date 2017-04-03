const mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ClassSchema = new Schema({
    semester: {type: String, required: true},
    subject: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    questions: [Schema.Types.Mixed]
});

ClassSchema.statics.findOrCreate = function(query){
    // console.log(query)
    return new Promise((resolve) => {
      this.findOne(query, (err, response) => {
          if (err) throw err
          if (!response){
              this.create(query, (err, newClass) => {
                  resolve('created new class')
              })
          } else {    
              resolve('found course')
          }
      })
    })
}
module.exports = mongoose.model('Class', ClassSchema);
