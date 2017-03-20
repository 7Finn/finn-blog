var express = require('express');
var router = express.Router();

module.exports = function(db) {
  var userModel = require('../models/usersModel')(db);

  router.get('/user', function(req, res) {
    if (req.session.user) {
        res.jsonSend({
            username : req.session.user.username
        })
    } else {
        res.jsonSend({
            username : null
        })
    }
  });

  router.post('/login', function(req, res, next) {
    userModel.findUser(req.body.username, req.body.password)
      .then(data => {
        req.session.user = data.user;
        res.jsonSend(data);
      })
      .catch(err => {
        res.jsonError(err);
      })
  });

  router.post('/register', function(req, res, next) {
    var user = req.body;
    userModel.addUser(user)
      .then(data => {
        if (data) res.jsonSend(true);
      })
      .catch(err => {
        res.jsonError(err);
      });
  });

  router.get('/logout', function(req, res, next) {
    delete req.session.user;
    res.jsonSend(true);
  });

  return router;
}
