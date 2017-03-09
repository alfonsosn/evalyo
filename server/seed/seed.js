const mongoose = require('mongoose');
const professorModel = require('../models/professors.js');
const courseRoutes = require('../models/courses.js')
const semesterModel = require('../models/semesters.js');
const Professor = mongoose.model('Professor');
const Course = mongoose.model('Course');
const Semester = mongoose.model('Semester')
const path = require('path');
const rootPath = path.join(__dirname, '..');

var ObjectId = require('mongodb').ObjectId;

mongoose.connect('mongodb://localhost/professors');

const db = mongoose.connection;



/*

app.post('/edit-post', (req, res) => {
  console.log('DATA FROM AJAX:', req.body);
  console.log('POST req: ready to update post');

  var obj_id = new ObjectId(req.body.id);

  Post.update( {_id: obj_id }, {text: req.body.text},
    (err) => {
      if (err){
      console.log('Error');
      return;
    }
    console.log('Edited post!')
  });
});

//Make a new post
app.post('/my-posts', (req, res) => {
  console.log('DATA FROM AJAX:', req.body);
  console.log('POST req: ready to make a new post');
  Post.create(req.body, (err) => {
    if (err){
      console.log('Error');
      return;
    }
    console.log('Created new post!')
  });
});

app.get('/my-posts', (req, res) => {
  console.log('GET request: ready to make a new post');
});

app.get('/create-new-post', (req, res) => {
  // const newPost = req.body;
  console.log(req);
});

app.post('/create-new-post', (req, res) => {
  const newPost = req.body;
  console.log('Ready to create new post', req.body);
  Post.create(req.body, (err, data) => {
    if(err) console.log("err");
    else console.log('Created new post!');
  });
});

app.get('/comments', (req, res) => {
  console.log('Getting comments!');
  Comment.find({}, () => {
    res.send('data coming soon')
  });
});

app.post('/comments', (req, res) => {
  const newComment = req.body;
  console.log('New comment', newComment);
  Comment.create(newComment);

});

*/
db.on('open', () => {
  console.log('db connection opened!');
  Professor.create(
    {
      firstName: 'Lev',
      lastName: 'Izraelit'
    },
    function(err, professor){
      if(err){
        console.log(err)
        return
      }
      console.log(professor)
    }
  )
})

db.on('error', () => {
  console.log('error in db connection!');
})
