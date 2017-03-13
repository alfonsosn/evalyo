"use strict";
var path = require('path');
var express = require('express');

module.exports = function (app) {

  // sets the public directory to our PATH
  var root = app.getValue('projectRoot');

  var viewsPath = path.join(root, 'app/views');
  var publicPath = path.join(root, 'app/public');

  app.use(express.static(publicPath));
};
