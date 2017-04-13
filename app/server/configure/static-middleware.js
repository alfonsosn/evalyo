"use strict";
var path = require('path');
var express = require('express');

module.exports = function (app) {

  var root = app.getValue('projectRoot');
  // var views = path.join(root, '/server/views');
  var views = path.join(root, '/server/views');
  var staticPath = path.join(root, '/server/static');
  var npmPath = path.join(root, './node_modules');

  // sets the public directory to our PATH
  app.use(express.static(npmPath));
  app.use(express.static(staticPath));

  // Set the PATH for views
  app.setValue('viewsPath', views);
};
