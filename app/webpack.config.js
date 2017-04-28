"use strict";

const webpack = require('webpack');
const path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
  devtool: 'inline-sourcemap',
  entry: path.join(__dirname, 'client', 'app-client.js'),

  output: {
    path: path.join(__dirname, 'server', 'static', 'bundle'),
    publicPath: '/',
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
        [{
          loader: 'babel-loader',
          options: {
            plugins: ["transform-class-properties", "transform-object-rest-spread"]
          }
        }]
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
        test: /\.scss$/,
        use:
        [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(jpe?g|gif|svg)$/i,
        use: [{
          loader: 'file-loader',
          options: {
              name: '[name].[ext]',
              publicPath: '/',
              outputPath: 'bundle/'
          }
        }]
      },
      {
        test: /\.png$/i,
        use: [{
          loader: 'file-loader',
          options: {
              name: '[name].[ext]',
              publicPath: '/',
              outputPath: 'bundle/'
          }
        }]
      },
    ]
  }
}
