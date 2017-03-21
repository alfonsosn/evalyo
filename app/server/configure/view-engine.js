'use strict'
var exphbs = require('express-handlebars');

module.exports = function(app){
  var views = app.getValue('viewsPath');

  // this sets the layout template MAIN for handlebars
  app.engine('handlebars', exphbs({
          defaultLayout: 'main',
          extname: '.handlebars',
          layoutsDir: views + '/layouts',
          partialsDir: views + '/partials',
  }));

  // this sets the views engine of handlebars
  app.set('view engine', 'handlebars');
  app.set('views', views);
}
