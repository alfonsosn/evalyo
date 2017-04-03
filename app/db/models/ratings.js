const mongoose = require('mongoose');
var Schema = mongoose.Schema;


var RatingsSchema = new Schema({
  semester: { type: String, required: true },
  subject: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  questions: [Schema.Types.Mixed]
});

RatingsSchema.statics.findOrCreate = function (query) {
  // console.log(query)
  return new Promise((resolve) => {
    this.findOne(query, (err, response) => {
      if (err) throw err
      if (!response) {
        this.create(query, (err, newRatings) => {
          if (err) throw err
          resolve('created ratings')
        })
      } else {
        resolve('found ratings')
      }
    })
  })
}
module.exports = mongoose.model('Ratings', RatingsSchema);
