var express = require('express')
var logger = require('morgan')
var bodyParser = require('body-parser')
var exphbs = require('express-handlebars')
var app = express()
module.exports = app

// this sets the layout template MAIN for handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}))

// this sets the views engine of handlebars
app.set('view engine', 'handlebars')
app.set('views', './views')

// outputs to the console
app.use(logger('dev'))

// sets the public directory to our PATH
app.use(express.static(__dirname + '/public'))

// body parser to read URL
app.use(bodyParser.urlencoded({ extended: false }))

// we use this to route ajax responses for ExpressJS
app.use(require('./routes'))


app.listen(3000)
