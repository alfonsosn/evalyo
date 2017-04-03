const mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ProfessorSchema = new Schema({
  firstName: {type: String, required: true},
  lastName:  {type: String, required: true},
});


module.exports = mongoose.model('Professor', ProfessorSchema);
