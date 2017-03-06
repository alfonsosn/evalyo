const mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ProfessorSchema = new Schema({
 firstname: {type: String, required: true},
 lastName:  {type: String, required: true},
 courses: [Schema.Types.Mixed]
});



module.exports = mongoose.model('Professor', ProfessorSchema);
