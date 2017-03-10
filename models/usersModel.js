var bcrypt = require('bcrypt-nodejs');

module.exports = function(db) {
	var users = db.collection('users');

	return {
    findUser: function(username, password) {
			return new Promise(function(resolve, reject) {
				users.findOne({username: username}, function(err, doc) {
	      	if (doc == null) {
	      		reject({
							error: "用户不存在。",
							user: null,
						});
	      	} else {
	      		bcrypt.compare(password, doc.password, function(err, res) {
	      			if (res) { // 账号密码正确
								resolve({ error: null, user: doc });
							} else { // 密码错误
								reject({ error: "密码错误。", user: null });
							}
	      		});
	      	}
				});
			});
    },

    addUser: function(user) {
			return new Promise(function(resolve, reject) {
				bcrypt.hash(user.password, null, null, function(error, hash) {
					let u = {
						username: user.username,
						password: hash,
						manager: false
					}
	        users.insert(u);
					resolve(true);
	      });
			});
    }
  }
};
