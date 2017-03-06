const mongoose = require('mongoose');
var Schema = mongoose.Schema;


var CourseSchema = new Schema({
    code: {type: String, required: true},
    professorId: {type: Schema.Types.ObjectId, ref: 'Professor'}
    semsters: [{type: Schema.Types.ObjectId, ref: 'Semester'}]
});



module.exports = mongoose.model('Course', CourseSchema);
