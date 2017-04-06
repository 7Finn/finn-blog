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
            <label for="username">用户名</label>
            <input type="text" name="username" placeholder="8-16位数字与英文组合用户名" required>
            <label for="password">密码</label>
            <input type="password" name="password" placeholder="密码" required>
            <input id="login-btn" class="btn" type="button" name="login-btn" value="登录">
          </form>
        </div>
        <div class="register-box">
          <h4>新游客注册</h4>
          <form class="login-form" method="post">
            <label for="username">用户名(用于登录)</label>
            <input type="text" name="username" placeholder="8-16位数字与英文组合用户名" required>
            <label for="username">昵称(评论时显示)</label>
            <input type="text" name="username" placeholder="8-16位，可用中文" required>
            <label for="password">密码</label>
            <input type="password" name="password" placeholder="密码" required>
            <label>完成验证：<span id="cap-error" class="hide" v-if="capError">请先完成验证 ×</span></label>
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


export default {
  data: function() {
    return {
      waitCap: true,
      capError: false,
      captchaObj: null,
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
      if (!result) {
        console.log("fail");
        this.capError = true,
        setTimeout(() => {
          this.capError = false;
        }, 2000);
        e.preventDefault();
      } else {
        console.log("success");
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

#cap-error {
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
  top: 20%;
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
  height: 400px;
  padding: 0 5%;
  border-right: 1px solid #ccc;
}

#modal .register-box {
  box-sizing: border-box;
  float: right;
  width: 50%;
  height: 400px;
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
