'use strict'
var path = require('path');
var exphbs = require('express-handlebars')

module.exports = function(app){
  var root = app.getValue('viewsPath');

  // this sets the layout template MAIN for handlebars
  app.engine('handlebars', exphbs({
          defaultLayout: 'main',
          extname: '.handlebars',
          layoutsDir: root + 'views/layouts',
          partialsDir: root + 'views/partials',
  }))

  // this sets the views engine of handlebars
  app.set('view engine', 'handlebars')
  app.set('views', root + 'views')
}
