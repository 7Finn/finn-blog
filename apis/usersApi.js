var express = require('express');
var router = express.Router();

module.exports = function(db) {
  var userModel = require('../models/usersModel')(db);

  router.get('/manager', function(req, res) {
    if (req.session.user) {
      userModel.isManager(req.session.user.username)
        .then(data => {
          res.jsonSend(true);
        })
        .catch(err => {
          res.jsonError(false);
        })
    } else {
        res.jsonError(false);
    }
  });

  router.post('/login', function(req, res, next) {
    userModel.findUser(req.body.username, req.body.password)
      .then(data => {
        req.session.user = data;
        res.jsonSend(data);
      })
      .catch(err => {
        res.jsonError(err);
      })
  });

  router.post('/register', function(req, res, next) {
    let user = req.body;
    userModel.checkUser(user)
      .then(userModel.addUser)
      .then(function() {
        req.session.user = user;
        res.jsonSend("注册成功");
      })
      .catch(function(error){
        console.log("Regist Error:" + error);
        res.jsonError(error);
      });
  });

  router.get('/logout', function(req, res, next) {
    delete req.session.user;
    res.jsonSend(true);
  });

  return router;
}
