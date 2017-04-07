<template lang="html">
  <div id="modal" v-show="this.$store.state.modalShow">
    <div class="modal-mask" @click="hide"></div>
    <div class="modal-container">
      <div class="modal-header">
        <i class="fa fa-times" aria-hidden="true" @click="hide"></i>
        <h4 class="modal-title">登录</h4>
      </div>
      <div class="modal-content">
        <div class="login-box">
          <h4>游客登录</h4>
          <form class="login-form" method="post">
            <label for="loginUsername">用户名<span class="error-message" v-if="loginUsernameError">{{ loginUsernameError }}</span></label>
            <input type="text" name="loginUsername" placeholder="8到16位数字与英文组合用户名" v-model="loginUsername" @blur="blurHandler" required>
            <label for="loginPassword">密码<span class="error-message" v-if="loginPasswordError">{{ loginPasswordError }}</span></label>
            <input type="password" name="loginPassword" placeholder="密码" v-model="loginPassword" @blur="blurHandler" required>
            <input id="login-btn" class="btn" type="button" name="login-btn" value="登录" @click="loginHandler">
          </form>
        </div>
        <div class="register-box">
          <h4>新游客注册</h4>
          <form class="login-form" method="post">
            <label for="registerUsername">用户名(用于登录)<span class="error-message" v-if="registerUsernameError">{{ registerUsernameError }}</span></label>
            <input type="text" name="registerUsername" placeholder="8到16位数字与英文组合用户名" v-model="registerUsername" @blur="blurHandler" required>
            <label for="registerNickname">昵称(评论时显示)<span class="error-message" v-if="registerNicknameError">{{ registerNicknameError }}</span></label>
            <input type="text" name="registerNickname" placeholder="2到10位，可用中文" v-model="registerNickname" @blur="blurHandler" required>
            <label for="registerPassword">密码<span class="error-message" v-if="registerPasswordError">{{ registerPasswordError }}</span></label>
            <input type="password" name="registerPassword" placeholder="8到16位数字与英文组合" v-model="registerPassword" @blur="blurHandler" required>
            <label>完成验证：<span id="cap-error" class="error-message" v-if="capError">请先完成验证 ×</span></label>
            <div id="captcha">
                <p id="wait" class="show" v-if="waitCap">正在加载验证码...</p>
            </div>
            <input id="register-btn" class="btn" type="button" name="register-btn" value="注册" @click="registerHandler">
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
var validator = require('../utils/validator.js');
const crypto = require('crypto');

export default {
  data: function() {
    return {
      waitCap: true,
      capError: false,
      captchaObj: null,
      loginUsername: "",
      loginUsernameError: "",
      loginPassword: "",
      loginPasswordError: "",
      registerUsername: "",
      registerUsernameError: "",
      registerNickname: "",
      registerNicknameError: "",
      registerPassword: "",
      registerPasswordError: "",
    }
  },
  methods: {
    hide: function() {
      this.$store.state.modalShow = false;
    },
    handler: function(captchaObj) {
      this.captchaObj = captchaObj;
      // 将验证码加到id为captcha的元素里
      captchaObj.appendTo("#captcha");

      captchaObj.onReady(() => {
        this.waitCap = false;
      });
    },
    registerHandler: function(e) {
      var result = this.captchaObj.getValidate();
      if (!result) { // 检查有没有点验证
        this.capError = true,
        setTimeout(() => {
          this.capError = false;
        }, 2000);
        e.preventDefault();
      } else {
        // 重新检查一遍
        this.registerUsernameError = validator.checkUsername(this.registerUsername);
        this.registerNicknameError = validator.checkNickname(this.registerNickname);
        this.registerPasswordError = validator.checkPassword(this.registerPassword);
        if (!this.registerUsernameError && !this.registerNicknameError && !this.registerPasswordError) {
          // 对密码进行处理
          let user = {
            username: this.registerUsername,
            nickname: this.registerNickname,
            password: this.registerPassword,
          }
          // 对密码进行加密处理
          var hash = crypto.createHash('sha256');
          hash.update(user.password);
          user.password = hash.digest('hex');

          this.$http.post('/api/register', user)
            .then(res => {
              if (!res.body.err) {
                alert("注册成功");
                // this.$router.push('/');
                this.hide(); // 隐藏模态窗
              } else {
                this.registerUsernameError = res.body.data;
              }
            })
        }
      }
    },
    blurHandler: function(e) {
      let event = e || window.event;
      let target = e.target || e.srcElement;
      switch(target.name) {
        case 'loginUsername': this.loginUsernameError = validator.checkUsername(this.loginUsername); break;
        case 'loginPassword': this.loginPasswordError = validator.checkPassword(this.loginPassword); break;
        case 'registerUsername': this.registerUsernameError = validator.checkUsername(this.registerUsername); break;
        case 'registerNickname': this.registerNicknameError = validator.checkNickname(this.registerNickname); break;
        case 'registerPassword': this.registerPasswordError = validator.checkPassword(this.registerPassword); break;
      }
    },
    loginHandler: function(e) {
      // 重新检查一遍
      this.loginUsernameError = validator.checkUsername(this.loginUsername);
      this.loginPasswordError = validator.checkPassword(this.loginPassword);
      if (!this.loginUsernameError && !this.loginPasswordError) {
        // 对密码进行处理
        let user = {
          username: this.loginUsername,
          password: this.loginPassword,
        }
        // 对密码进行加密处理
        var hash = crypto.createHash('sha256');
        hash.update(user.password);
        user.password = hash.digest('hex');
        console.log(user.password);

        this.$http.post('/api/login', user)
          .then(res => {
            if (!res.body.err) {
              console.log("登录成功");
              this.$store.state.user = res.body.data;
              this.hide(); // 隐藏模态窗
            } else {
              if (res.body.data == "用户不存在") {
                this.loginUsernameError = res.body.data;
              } else if (res.body.data == "密码错误") {
                this.loginPasswordError = res.body.data;
              }
            }
          })

      }
    }
  },
  mounted: function() {
    this.$http.get('/api/geetest/register?t=' + (new Date()).getTime())
      .then(res => {
        if (!res.body.err) {
          // 调用 initGeetest 初始化参数
          // 参数1：配置参数
          // 参数2：回调，回调的第一个参数验证码对象，之后可以使用它调用相应的接口
          initGeetest({
              gt: res.body.data.gt,
              challenge: res.body.data.challenge,
              new_captcha: res.body.data.new_captcha, // 用于宕机时表示是新验证码的宕机
              offline: !res.body.data.success, // 表示用户后台检测极验服务器是否宕机，一般不需要关注
              product: "float", // 产品形式，包括：float，popup
              width: "100%"

              // 更多配置参数请参见：http://www.geetest.com/install/sections/idx-client-sdk.html#config
          }, this.handler);
        } else {
          this.$router.replace('/404');
        }
      });
  }
}
</script>

<style lang="css">

#captcha {
  margin-bottom: 10px;
}

#modal .error-message {
  color: #a94442;
  float: right;
}

#modal {
  z-index: 100;
  position: absolute;
  width: 100%;
  height: 100%;
}

#modal .modal-mask {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  transition: opacity .3s ease;
}

#modal .modal-container {
  border-radius: 2px;
  width: 800px;
  height: auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  background-color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  top: 10%;
}

#modal .modal-title {
  margin: 0;
  font-size: 18px;
}

#modal .modal-header {
  color: #333;
  border-radius: 2px 2px 0 0;
  background-color: #f3f3f3;
  position: absolute;
  height: 50px;
  line-height: 50px;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  border-bottom: 1px solid #e5e5e5;
  top: 0;
  left: 0;
}

#modal .btn {
  cursor: pointer;
  background-color: #5cb85c;
  border-color: #4cae4c;
  color: #fff;
  box-shadow: none;
}

#modal .btn:active {
  background-color: #449d44;
}


#modal .modal-header i {
  color: #aaa;
  cursor: pointer;
  font-size: 18px;
  margin-top: 18px;
  float: right;
}

#modal .modal-header i:hover {
  color: #333;
}

#modal .modal-content {
  padding: 20px;
  margin-top: 50px;
  /*margin-bottom: 50px;*/
  overflow: auto;
}

#modal .modal-content h4 {
  color: #777;
}

#modal .modal-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 50px;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border-top: 1px solid #e5e5e5;
}

#modal .login-box {
  box-sizing: border-box;
  float: left;
  width: 50%;
  max-height: 400px;
  padding: 0 5%;
}

#modal .register-box {
  border-left: 1px solid #ccc;
  box-sizing: border-box;
  float: right;
  width: 50%;
  max-height: 400px;
  padding: 0 5%;
}

#modal .login-form label {
  color: #333;
  display: block;
  font-weight: 700;
  margin-bottom: 5px;
}

#modal input{
  box-sizing: border-box;
  display: block;
  font-size: 14px;
  margin-bottom: 5px;
  color: #555;
  width: 100%;
  height: 35px;
  padding: 6px 12px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 2px;
  box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
  -webkit-transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}

</style>
