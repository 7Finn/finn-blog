module.exports = {
  checkUsername: function(username) {
    if (username.length == 0) return "用户名不可为空 ×";
    if (username.length < 8 || username.length > 16) {
      return "用户名长度在8到16位间 ×"
    }
    var pattern = /\w/g;
    if (!pattern.test(username)) {
      return "只能含有数字、字母与下划线 ×";
    }
    return "";
  },
  checkNickname: function(nickname) {
    if (nickname.length == 0) return "昵称不可为空 ×";
    if (nickname.length < 2 || nickname.length > 10) {
      return "请控制长度在2到10位间 ×";
    }
    return "";
  },
  checkPassword: function(password) {
    if (password.length == 0) return "密码不可为空 ×";
    if (password.length < 8 || password.length > 16) {
      return "密码长度在8到16位间 ×"
    }
    var pattern = /\w/g;
    if (!pattern.test(password)) {
      return "只能含有数字、字母与下划线 ×";
    }
    return "";
  }
}
