const mongoose = require('mongoose');
var Schema = mongoose.Schema;


var RatingsSchema = new Schema({
  year: { type: String, required: true },
  semester: { type: String, required: true },
  section: { type: String },
  subject: { type: Schema.Types.ObjectId, ref: 'Course' },
  professor: { type: Schema.Types.ObjectId, ref: 'Professor' },
  reviews: [Schema.Types.Mixed]
});

RatingsSchema.statics.findOrCreate = function (query) {
  // console.log(query)
  return new Promise((resolve) => {
    this.findOne(query, (err, ratings) => {
      if (err) throw err
     // console.log('ratings: ', ratings)
      if (!ratings) {
        this.create(query, (err, ratings) => {
          if (err) throw err
          resolve(ratings)
        })
      } else {
        resolve(ratings)
      }
    })
  })
}
module.exports = mongoose.model('Ratings', RatingsSchema);
