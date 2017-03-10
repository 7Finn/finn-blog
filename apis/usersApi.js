var express = require('express');
var router = express.Router();

module.exports = function(db) {
  var userModel = require('../models/usersModel')(db);

  router.get('/', function(req, res) {
    if (req.session.user) {
        res.json({
            username : req.session.user.username
        })
    } else {
        res.json({
            username : ''
        })
    }
  });

  router.post('/login', function(req, res, next) {
    userModel.findUser(req.body.username, req.body.password)
      .then(function(data) {
        req.session.user = data.user;
        console.log("登录成功: ");
        console.log(data.user);
        res.json(data.user);
      })
      .catch(function(data) {
        console.log("登录出错:" + data.error);
        res.json(false);
      })
  });

  router.post('/register', function(req, res, next) {
    var user = req.body;
    userModel.addUser(user)
      .then(data => {
        if (data) res.json(true);
      })
      .catch(data => {
        res.json(false);
      });
  });

  router.get('/logout', function(req, res, next) {
    console.log("/logout");
    delete req.session.user;
    res.redirect('/login');
  });

  return router;
}
