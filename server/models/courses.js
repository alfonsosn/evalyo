const mongoose = require('mongoose');
var Schema = mongoose.Schema;


var CourseSchema = new Schema({
    code: {type: String, required: true},
    professors: [{type: Schema.Types.ObjectId, ref: 'Professor'}],

});



module.exports = mongoose.model('Course', CourseSchema);
