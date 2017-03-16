var express = require('express');
var router = express.Router();

module.exports = function(db) {
  var articlesModel = require('../models/articlesModel')(db);
  var tagsModel = require('../models/tagsModel')(db);
  var usersModel = require('../models/usersModel')(db);

  router.get('/getArticles', function(req, res, next) {
    let start = req.query.start;
    articlesModel.getArticlesFrom(start, 5) // 一次拿5篇
      .then(data => {
        let articles = [];
        data.forEach(function (article, i) {
          // 过长的话根据换行符进行裁剪
          let content = article.content;
          if (content.length > 100) content = content.substr(0, 100) + '\n...';

          articles.push({
            id: article._id,
            title : article.title,
            content: content,
            date: article.date.toLocaleString(),
            pv: article.pv,
            tags: article.tags
          });
        }, function(err) {
          res.jsonSend(articles);
        });
      })
      .catch(err => {
        res.jsonError(err);
      });
  });

  router.post('/add', function(req, res, next) {
    var article = req.body;
    var date = new Date();
    article.date = date;
    article.lastModifyDate = date;
    // 验证权限
    if (req.session.user) {
      usersModel.isManager(req.session.user.username)
        .then(data => {
          return articlesModel.addArticle(article);
        })
        .then(data => {
          return tagsModel.addTags(article.tags, data.insertedIds[1]);
        })
        .then(data => {
          res.jsonSend(data);
        })
        .catch(err => {
          console.log(err);
          res.jsonError(err);
        });
    } else {
      console.log(err);
      res.jsonError(err);
    }
  });

  router.get('/detail', function(req, res, next) {
    let id = req.query.id;
    articlesModel.getArticle(id)
      .then(data => {
        if (data[1]) {
          data[1].date = data[1].date.toLocaleString();
          res.jsonSend(data[1]);
        } else {
          console.log("找不到当前文章");
          res.jsonError("找不到当前文章");
        }
      }, data => {
        console.log(data);
        res.jsonError(data);
      })
      .catch(err => {
        console.log(err);
        res.jsonError(err);
      })
  });

  router.get('/tags', function(req, res, next) {
    tagsModel.getAllTags()
      .then(data => {
        let tags = [];
        data.forEach(function (tag, i) {
          tags.push({
            id: tag._id,
            name: tag.name,
            articlesId: tag.articlesId
          })
        }, function(err) {
          res.jsonSend(tags);

        });
      })
      .catch(err => {
        console.log(err);
        res.jsonError(err);
      })
  });

  router.get('/category', function(req, res, next) {
    var name = req.query.name;
    if (name == '') res.json(false);
    tagsModel.getTagByName(name)
      .then(articlesModel.getArticlesByTag)
      .then(data => {
        var articles = [];
        data.forEach(function (article, i) {
          // 过长的话根据换行符进行裁剪
          let content = article.content;
          if (content.length > 100) content = content.substr(0, 100) + '\n...';

          articles.push({
            id: article._id,
            title : article.title,
            content: content,
            date: article.date.toLocaleString(),
            pv: article.pv,
            tags: article.tags
          });
        }, function(err) {
          if (articles.length == 0) {
            res.jsonError("不存在此Tag");
          } else {
            res.jsonSend(articles);
          }
        });
      })
      .catch(err => {
        console.log(err);
        res.jsonError(err);
      });
  });

  return router;
}
