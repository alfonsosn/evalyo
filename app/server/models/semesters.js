const mongoose = require('mongoose');
var Schema = mongoose.Schema;


var SemesterSchema = new Schema({
    year: {type: Number, required: true},
    season:  {type: String, required: true},
    questions: [Schema.Types.Mixed],
    courseId: {type: Schema.Types.ObjectId, ref: 'Course'},
    professorId: {type: Schema.Types.ObjectId, ref: 'Professor'}
});



module.exports = mongoose.model('Semester', SemesterSchema);
