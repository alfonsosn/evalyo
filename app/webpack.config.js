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
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        include: __dirname + '/node_modules/uswds/dist/',
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract('css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'),
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("styles.css")
  ]
};
