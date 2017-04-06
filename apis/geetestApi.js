var express = require('express');
var Geetest = require('gt3-sdk');
var router = express.Router();
// 注册
var captcha = new Geetest({
    geetest_id: '0a27ee51f5f9733bcd596e02317049b4', // 注册公钥
    geetest_key: '95bc4a3583998aa975af6b71234d8076' // 注册密钥
});


module.exports = function() {
  router.get('/register', function(req, res, next) {
    captcha.register({
        client_type: 'unknown',
        ip_address: 'unknown'
    }, function (err, data) {
        if (err) {
            console.error(err);
            return;
        }
        if (!data.success) {
            console.log("服务器不可访问");
            // 进入 failback，如果一直进入此模式，请检查服务器到极验服务器是否可访问
            // 可以通过修改 hosts 把极验服务器 api.geetest.com 指到不可访问的地址
            // 为以防万一，你可以选择以下两种方式之一：
            // 1. 继续使用极验提供的failback备用方案
            req.session.fallback = true;
            res.jsonSend(data);
            // 2. 使用自己提供的备用方案
            // todo
        } else {
            // 正常模式
            req.session.fallback = false;
            res.jsonSend(data);
        }
    });
  });

  router.post("/register-validate", function (req, res, next) {

    // 对form表单提供的验证凭证进行验证
    captcha.validate(req.session.fallback, {

        geetest_challenge: req.body.geetest_challenge,
        geetest_validate: req.body.geetest_validate,
        geetest_seccode: req.body.geetest_seccode

    }, function (err, success) {

        if (err) {
            // 网络错误
            res.jsonError(err);

        } else if (!success) {

            // 二次验证失败
            res.jsonSend("注册失败");

        } else {
            res.jsonSend("注册成功");
        }

    });
});

  return router;
}
