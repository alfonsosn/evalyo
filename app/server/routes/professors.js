var express = require('express')
var router = express.Router()
var p = require('./parser.js')

router.get('/:prof', function(req, res){
  let file = __dirname + 'data/cs_professors/' + req.params.prof + '.json';

  p.getJSON(file).then((data) => {
    let professor_courses = p.parseProfJSON(data)
    res.send(professor_courses)
  })

})

module.exports = router;
