const mongoose = require('mongoose');
var Schema = mongoose.Schema;


var SemesterSchema = new Schema({
    courseId: {type: Schema.Types.ObjectId, ref: 'Course'}
    professorId: {type: Schema.Types.ObjectId, ref: 'Professor'}
    year: {type: Number, required: true},
    season:  {type: String, required: true},
    questions: type: [Schema.Types.Mixed]
});



module.exports = mongoose.model('Semester', SemesterSchema);
