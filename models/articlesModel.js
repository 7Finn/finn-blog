
module.exports = function(db) {
	var articles = db.collection('articles');
  var ObjectID = require('mongodb').ObjectID;

	return {
    addArticle: function(article) {
    	return articles.insert(article);
    },
    getAll: function() {
			return new Promise(function(resolve, reject) {
				console.log("查找所有");
				resolve(articles.find().sort({date:-1}));
			});
    },
    getArticle: function(id) {
			articles.updateOne({_id:ObjectID(id)}, {$inc:{pv:1}}); //自增长一点访问
      return articles.findOne({_id:ObjectID(id)});
    },
    deleteArticle: function(id) {
      return articles.remove({_id:ObjectID(id)});
    },
    updateArticle: function(id, data) {
      return articles.updateOne({_id:ObjectID(id)}, {$set:{title:data.title, text:data.text}});
    }
  }
};
