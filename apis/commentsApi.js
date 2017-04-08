var express = require('express');
var router = express.Router();

module.exports = function(db) {
  var articlesModel = require('../models/articlesModel')(db);

  router.post('/add', function(req, res, next) {
    let aid = req.body.aid;
    let comment = req.body.comment;
    let user = req.session.user;
    console.log(comment);

    // 用户未登陆，违法操作
    if (!user) res.jsonError("请登录");
    articlesModel.addComment(aid, user, comment)
      .then(data => {
        res.jsonSend("添加评论成功");
      })
      .catch(err => {
        res.jsonError(err);
      })
  });

  return router;
}
