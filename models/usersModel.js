var bcrypt = require('bcrypt-nodejs');

module.exports = function(db) {
	var users = db.collection('users');

	return {
		// 参数:
		// username: 用户名
		// password: 密码
		// 返回值:
		// { error: string, user: object }
    findUser: function(username, password) {
			return new Promise(function(resolve, reject) {
				users.findOne({username: username}, function(err, doc) {
	      	if (doc == null) {
	      		reject("用户不存在");
	      	} else {
						bcrypt.compare(password, doc.password, function(err, res) {
	      			if (res) { // 账号密码正确
								resolve(doc);
							} else { // 密码错误
								reject("密码错误");
							}
	      		});
	      	}
				});
			});
    },

		// 返回值:
		// Promise
    addUser: function(user) {
			return new Promise(function(resolve, reject) {
				bcrypt.hash(user.password, null, null, function(error, hash) {
					let u = {
						username: user.username,
						nickname: user.nickname,
						password: hash,
						manager: false
					}
	        users.insert(u);
					resolve(true);
	      });
			});
    },

		// 参数:
		// username: 用户名
		// 返回值:
		// boolean
		isManager: function(username) {
			return new Promise(function(resolve, reject) {
				users.findOne({username: username}, function(err, doc) {
					if (doc == null) {
						reject(false);
					} else if (doc.manager == true) {
						resolve(true);
					} else {
						reject(false);
					}
				});
			});
		},

		checkUser: function(user) {
			return users.findOne({username:user.username})
				.then(function(existedUser) {
					console.log('Exist: ', existedUser);
					return existedUser ? Promise.reject("用户已存在") : Promise.resolve(user);
				});
    },
  }
};
