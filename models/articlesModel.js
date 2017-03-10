
module.exports = function(db) {
	var articles = db.collection('articles');
  var ObjectID = require('mongodb').ObjectID;

	return {
    addArticle: function(article) {
    	return articles.insert(article);
    },
    // showAllPosts: function() {
    //     return new Promise(function(resolve, reject) {
    //         resolve(posts.find());
    //     });
    // },
    getArticle: function(id) {
      return articles.findOne({_id:ObjectID(id)})
    },
    deleteArticle: function(id) {
      return articles.remove({_id:ObjectID(id)});
    },
    updateArticle: function(id, data) {
      return articles.updateOne({_id:ObjectID(id)}, {$set:{title:data.title, text:data.text}});
    }
  }
};
