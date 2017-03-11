var express = require('express');
var router = express.Router();

module.exports = function(db) {
  var articlesModel = require('../models/articlesModel')(db);

  router.get('/getall', function(req, res) {
    articlesModel.getAll()
      .then(data => {
        let articles = [];
        data.forEach(function (article, i) {
          // 过长的话根据换行符进行裁剪
          let content = article.content;
          // let cutPosition = content.indexOf("\n");
          // let nNum = 0;
          // while (cutPosition > -1 && nNum <= 8) {
          //   nNum++;
          //   cutPosition = content.indexOf("\n", cutPosition + 1);
          // }
          //
          // content = content.substr(0, cutPosition) + '\n...';
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
          res.json({
            articles: articles
          });
        });
      })
      .catch(err => {
        res.json(false);
      });
  });

  router.post('/add', function(req, res, next) {
    var article = req.body;
    var date = new Date();
    article.date = date;
    article.lastModifyDate = date;
    articlesModel.addArticle(article)
      .then(data => {
        if (data) res.json(true);
        else res.json(false);
      })
      .catch(err => {
        res.json(false);
      });
  });

  router.get('/detail/:id', function(req, res, next) {
    let id = req.params.id;
    articlesModel.getArticle(id)
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.json(false);
      })
  });

  return router;
}
