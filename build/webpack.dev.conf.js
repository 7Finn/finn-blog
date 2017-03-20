var path = require('path');
var webpack = require('webpack');
var webPackBaseConf = require('./webpack.base.conf');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var merge = require('webpack-merge');
var hotClient = './build/hot-client';

var webpackDevConf = merge(webPackBaseConf, {
    entry: { index: [  hotClient,  path.resolve(__dirname, '../src/main.js') ]},
    plugins:[
    // Webpack 1.0
    // new webpack.optimize.OccurenceOrderPlugin(),
    // Webpack 2.0 fixed this mispelling
    // new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
    ]
});

Object.keys(webpackDevConf.entry).forEach(function (name) {
    var extras = [hotClient];
    webpackDevConf.entry[name] = extras.concat(webpackDevConf.entry[name]);
});

module.exports = webpackDevConf;
