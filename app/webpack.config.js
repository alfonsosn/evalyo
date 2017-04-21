"use strict";

const webpack = require('webpack');
const path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
  devtool: 'inline-sourcemap',
  entry: path.join(__dirname, 'client', 'app-client.js'),

  output: {
    path: path.join(__dirname, 'server', 'static', 'bundle'),
    filename: 'bundle.js',
    libraryTarget: 'umd' // this is super important
  },

  module: {
    loaders:
    [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    }
  }





  //   },
  //   {
  //     test: /\.css$/,
  //     include: __dirname + 'node_modules/uswds/dist',
  //     loader: ExtractTextPlugin.extract("css")
  //   }
]
// },
// plugins: [
//   new ExtractTextPlugin("server/static/stylesheets/styles.css")
// ]
