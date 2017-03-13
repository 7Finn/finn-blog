module.exports = function(db) {
	var tags = db.collection('tags');
  var ObjectID = require('mongodb').ObjectID;

	return {
    addTag: function(name, articleId) {
      return tags.update({name: name}, {$push:{'articlesId': articleId}},{upsert:true});
    },
    addTags: function(names, articleId) {
      return names.forEach(function(name, i) {
        tags.update({name: name}, {$push:{'articlesId': articleId}},{upsert:true});
      });
    },
    getTagByName: function(name) {
      return tags.findOne({name: name})
    },
    getAllTags: function() {
      return new Promise(function(resolve, reject) {
				resolve(tags.find());
			});
    },
    // getArticle: function(id) {
		// 	articles.updateOne({_id:ObjectID(id)}, {$inc:{pv:1}}); //自增长一点访问
    //   return articles.findOne({_id:ObjectID(id)});
    // },
    // deleteArticle: function(id) {
    //   return articles.remove({_id:ObjectID(id)});
    // },
    // updateArticle: function(id, data) {
    //   return articles.updateOne({_id:ObjectID(id)}, {$set:{title:data.title, text:data.text}});
    // }
  }
};
