var express  = require('express')
var app = express();

// Mongoose
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);
const connection = mongoose.connection;

// Professor db model
var Professor = require('./models/professors');

 
var port = process.env.PORT || 3000

connection.on('open', function() {
  app.listen(port, function(){
    console.log('Listening to port ' + port);
  });
})

connection.on('error', function(){
  console.log('error connecting to db!');
})
