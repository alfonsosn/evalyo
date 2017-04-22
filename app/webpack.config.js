"use strict";

const webpack = require('webpack');
const path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
  devtool: 'inline-sourcemap',
  entry: path.join(__dirname, 'client/app-client.js'),

  output: {
    path: path.join(__dirname, 'server/static'),
    filename: 'bundle.js',
    publicPath: '/',
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
        test: /\.(jpe?g|gif|svg)$/i,
        use: [{
          loader: 'file-loader',
          options: {
              name: '[name].[ext]'
          }
        }]       
      },
      {
        test: /\.png$/i,
        use: [{
          loader: 'file-loader',
          options: {
              name: '[name].[ext]'
          }
        }]       
      },
    ]
  }
}

/* 
{
  loader: 'file-loader',
  options: {
      name: '[path][name].[hash].[ext]'
  }
}     
*/
