var express = require('express');
var path = require('path');
var webpack = require('webpack');
var favicon = require('serve-favicon');
var history = require('connect-history-api-fallback');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// 创建一个express实例
var app = express();

app.use(history());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// 使用 webpack-dev-middleware 中间件
if (app.get('env') == 'development') {
  var webpack = require('webpack');
  var webpackConfig = require('./build/webpack.dev.config');
     // 调用webpack并把配置传递过去
  var compiler = webpack(webpackConfig);
    // 使用 webpack-dev-middleware 中间件
  var devMiddleware = require('webpack-dev-middleware')(compiler, {
     publicPath: '/',
     stats: {
       colors: true,
       chunks: false
     }
  });
  app.use(devMiddleware);
  app.use(require("webpack-hot-middleware")(compiler));
}


// 引用数据库
// var mongoClient = require('mongodb').MongoClient;
// var mongoUrl = 'mongodb://localhost:27017/blog';
// var _db;

// view engine setup
// app.set('views', path.join(__dirname, './view'));
// app.engine('.html', ejs.__express);
// app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// app.use(express.static(path.join(__dirname, '/client/static')));

// app.use('/', index);
// app.use('/users', users);

// 连接数据库
// mongoClient.connect(mongoUrl, fcuntion(err, db) {
//   if (err) {
//     console.log(err);
//     return;
//   }
//
//   console.log('connected to mongo');
//   _db = db;
// })


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
