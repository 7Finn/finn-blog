var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var history = require('connect-history-api-fallback');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var FileStore = require('session-file-store')(session);

var JsonUtil = require('./models/jsonUtil');


module.exports = function(db) {
  // 创建一个express实例
  var app = express();
  app.use(history());
  app.use(logger('dev'));
  app.use(favicon(path.join(__dirname, '/src/assets/img', 'favicon.ico')));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(session({
    store: new FileStore(),
    resave: false,
    saveUninitialized: false,
    secret: 'finn secret',
    cookie: { maxAge: 60000 * 20 },
  }));


  if (app.get('env') == 'development') {
    var webpack = require('webpack');
    var webpackConfig = require('./build/webpack.dev.conf');
       // 调用webpack并把配置传递过去
    var compiler = webpack(webpackConfig);
      // 使用 webpack-dev-middleware 中间件
    var devMiddleware = require('webpack-dev-middleware')(compiler, {
       publicPath: '/',
       stats: {colors: true, chunks: false    }
    });
    app.use(devMiddleware);
    app.use(require("webpack-hot-middleware")(compiler));

  } else{
    app.use(express.static('output'));
  }


  var usersApi = require('./apis/usersApi')(db);
  var articlesApi = require('./apis/articlesApi')(db);
  var geetestApi = require('./apis/geetestApi')();
  app.use(JsonUtil());
  app.use('/api', usersApi);
  app.use('/api/article', articlesApi);
  app.use('/api/geetest', geetestApi);



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
    // res.jsonError("找不到当前相关信息");
  });

  return app;
}
