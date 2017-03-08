var express = require('express')
var logger = require('morgan')
var bodyParser = require('body-parser')
var exphbs = require('express-handlebars')
var app = express()
module.exports = app

app.engine('handlebars', exphbs({defaultLayout: 'main'}))

app.set('view engine', 'handlebars')
app.set('views', './views')

app.use(logger('dev'))

app.use(express.static(__dirname + '/public'))

app.use(bodyParser.urlencoded({ extended: false }))


app.use(require('./routes'))


app.listen(3000)
