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
    rules:
    [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use:
        [
          'babel-loader'
        ]
      },
      {
        test: /\.css$/,
        use:
        [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          'url-loader?limit=10000',
          'file-loader',
          'img-loader'
        ]
      }
    ]
  }
}
