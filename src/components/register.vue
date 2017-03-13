<template>
  <div id="register">
    <h1>注册账号</h1>
    <form @submit.prevent="submit">
      <div class="input-div" v-bind:class="userDivClass">
        <span class="span" v-bind:class="userSpanClass">用户名</span>
        <input name="username" type="text" class="input" @focus="userfs" @blur="userbr" v-model="formData.username"/>
      </div>
      <p class="warning" > {{ usernameWarning }} </p>
      <div class="input-div" v-bind:class="passDivClass">
        <span class="span" v-bind:class="passSpanClass">密码</span>
        <input name="password" type="password" class="input" @focus='passfs' @blur="passbr" v-model="formData.password"/>
      </div>
      <p class="warning" > {{ passwordWarning }} </p>
      <div class="input-div" v-bind:class="repassDivClass">
        <span class="span" v-bind:class="repassSpanClass">重复密码</span>
        <input name="repassword" type="password" class="input" @focus='repassfs' @blur="repassbr" v-model="formData.repassword"/>
      </div>
      <p class="warning" > {{ repasswordWarning }} </p>
      <button id="post" class="button" type="submit">注册</button>
    </form>
    <span class="switch-to-login">已有账号?点击
      <router-link to='/login'>登录</router-link>
    </span>
  </div>
</template>

<script>

export default {
  data: function() {
    return {
      usernameActive: false,
      passwordActive: false,
      repasswordActive: false,
      usernameWarning: '',
      passwordWarning: '',
      repasswordWarning: '',
      formData: {
        username: null,
        password: null,
        repassword: null,
      }
    }
  },
  computed: {
    userDivClass: function () {
      return {
        'blue-div': this.usernameActive,
        'used-div': !this.usernameActive && this.formData.username,
        'red-div': this.usernameWarning != ''
      }
    },
    passDivClass: function() {
      return {
        'blue-div': this.passwordActive,
        'used-div': !this.passwordActive && this.formData.password,
        'red-div': this.passwordWarning != ''
      }
    },
    repassDivClass: function() {
      return {
        'blue-div': this.repasswordActive,
        'used-div': !this.repasswordActive && this.formData.repassword,
        'red-div': this.repasswordWarning != ''
      }
    },
    userSpanClass: function() {
      return {
        'init-position' : !this.usernameActive,
        'up-position' : this.usernameActive,
        'used-span' : !this.usernameActive && this.formData.username,
        'warning-span': this.usernameWarning != ''
      }
    },
    passSpanClass: function() {
      return {
        'init-position' : !this.passwordActive,
        'up-position' : this.passwordActive,
        'used-span' : !this.passwordActive && this.formData.password,
        'warning-span': this.passwordWarning != ''
      }
    },
    repassSpanClass: function() {
      return {
        'init-position' : !this.repasswordActive,
        'up-position' : this.repasswordActive,
        'used-span' : !this.repasswordActive && this.formData.repassword,
        'warning-span': this.repasswordWarning != ''
      }
    }
  },
  methods: {
    // 获取输入框焦点
    userfs: function(event) {
      this.usernameActive =  true;
    },
    passfs: function(event) {
      this.passwordActive = true;
    },
    repassfs: function(event) {
      this.repasswordActive = true;
    },
    // 焦点移除
    userbr: function(event) {
      this.usernameActive =  false;
    },
    passbr: function(event) {
      this.passwordActive =  false;
    },
    repassbr: function(event) {
      this.repasswordActive = false;
      if (this.formData.password && this.formData.password !== this.formData.repassword) {
        this.repasswordWarning = "两次密码不一致X";
      } else {
        this.repasswordWarning = "";
      }
    },
    submit: function() {
      var data = JSON.stringify(this.formData); // 这里才是你的表单数据
      this.$http.post('/api/register', data).then(res => {
          console.log("注册成功");
      }, res => {
          console.log("注册失败");
      });
    }
  }

}
</script>

<style scoped>

h1 {
	color: #444;
	font-size: 24px;
	margin-bottom: 30px;
}

#register {
  position: relative;
  padding: 20px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
	width: 240px;
	background-color: #f9f9f9;
	border-radius: 2px;
	-moz-box-shadow: 1px 1px 1px #ddd;
	-webkit-box-shadow: 1px 1px 1px #ddd;
	box-shadow: 1px 1px 1px #ddd;
	-moz-user-select: none;
	-webkit-user-select: none;
	user-select: none;
}


.switch-to-login {
	color: #444;
	position: absolute;
	font-size: 14px;
	right: 10px;
	bottom: 10px;
}

.input-div {
	position: relative;
	margin-left: auto;
	margin-right: auto;
	border: 1px solid #C8C8C8;
	border-radius: 2px;
	width: 230px;
	height: 40px;
}

.span {
	position: absolute;
	left: 20px;
	background-color: #f9f9f9;
	z-index: 0;
	font-size: 15px;
	-moz-transition: all 0.1s;
 	-webkit-transition: all 0.1s;
  transition: all 0.1s;
}

.init-position {
	top: 9px;
	color: #C8C8C8;
}

.up-position {
	top: -12px;
	color: #77C2FF;
}

.used-span {
	top: -12px;
	color: #C8C8C8;
}

.warning-span {
	color: #E24A1F;
}

.used-div {
	border: 1px solid #C8C8C8;
}

.blue-div {
	border: 1px solid #77C2FF;
}

.red-div {
	border: 1px solid #E24A1F;
}

.input {
	background-color: transparent;
	top: 10px;
  width: 85%;
	position: absolute;
	left: 20px;
	outline: none;
	border: none;
	z-index: 1;
	font-size: 18px;
	-webkit-appearance: none;

}


.warning {
  text-align: right;
  margin: 5px 0;
  height: 20px;
	font-size: 15px;
	color: #E24A1F;
}

.button {
  padding: 0;
	margin-left: auto;
	margin-right: auto;
	width: 232px;
	height: 44px;
	cursor: pointer;
	color: #fff;
	outline: none;
	border: none;
	border-radius: 2px;
	font-size: 16px;
	text-align: center;
	text-decoration: none;
	/*font-family: SYHT, "Microsoft Yahei", "微软雅黑", Arial, Helvetica, sans-serif;*/
  margin-bottom: 30px;
}

.button:active {
	background-color: #118494;
}

#post {
 	background-color: #1BB2C7;
}

</style>
