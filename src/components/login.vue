<template>
  <div id="login">
    <h1>用户登录</h1>
    <div class="info">
      <form method="post" id="form">
        <div class="input-div" v-bind:class="userDivClass">
          <span class="span" v-bind:class="userSpanClass">用户名</span>
          <input name="username" type="text" class="input" @focus="userfs" @blur="userbr" v-model="username"/>
        </div>
        <div class="input-div" v-bind:class="passDivClass">
          <span class="span" v-bind:class="passSpanClass">密码</span>
          <input name="password" type="password" class="input" @focus='passfs' @blur="passbr" v-model="password"/>
        </div>
        <span class="warning"></span>
        <button type="reset" id="reset" class="button">清除</button>
        <button type="submit" id="post" class="button">登录</button>
      </form>
    </div>
  </div>
</template>

<script>

module.exports = {
  data: function() {
    return {
      usernameActive: false,
      passwordActive: false,
      usernameWarning: false,
      passwordWarning: false,
      username: null,
      password: null,
    }
  },
  computed: {
    userDivClass: function () {
      return {
        'blue-div': this.usernameActive,
        'used-div': !this.usernameActive && this.username
      }
    },
    passDivClass: function() {
      return {
        'blue-div': this.passwordActive,
        'used-div': !this.passwordActive && this.password
      }
    },
    userSpanClass: function() {
      return {
        'init-position' : !this.usernameActive,
        'up-position' : this.usernameActive,
        'used-span' : !this.usernameActive && this.username
      }
    },
    passSpanClass: function() {
      return {
        'init-position' : !this.passwordActive,
        'up-position' : this.passwordActive,
        'used-span' : !this.passwordActive && this.password
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
    // 用户名框焦点移除
    userbr: function(event) {
      this.usernameActive =  false;
    },
    passbr: function(event) {
      this.passwordActive =  false;
    }
  }

}
</script>

<style>

h1 {
	color: #444;
	font-size: 24px;
	margin-bottom: 30px;
}

#login {
  padding: 20px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  height: 280px;
	width: 400px;
	background-color: #f9f9f9;
	border-radius: 2px;
	-moz-box-shadow: 1px 1px 1px #ddd;
	-webkit-box-shadow: 1px 1px 1px #ddd;
	box-shadow: 1px 1px 1px #ddd;
	-moz-user-select: none;
	-webkit-user-select: none;
	user-select: none;
}


.input-div {
	position: relative;
	margin-left: auto;
	margin-right: auto;
	border: 2px solid #C8C8C8;
	border-radius: 2px;
	width: 300px;
	height: 40px;
	margin-bottom: 30px;
}

.span {
	position: absolute;
	left: 20px;
	background-color: #f9f9f9;
	z-index: 0;
	font-size: 18px;
	-moz-transition: all 0.1s;
 	-webkit-transition: all 0.1s;
  	transition: all 0.1s;
}

.init-position {
	top: 8px;
	color: #C8C8C8;
}

.up-position {
	top: -14px;
	color: #77C2FF;
}

.used-span {
	top: -14px;
	color: #C8C8C8;
}

.warning-span {
	color: #E24A1F;
}

.used-div {
	border: 2px solid #C8C8C8;
}

.blue-div {
	border: 2px solid #77C2FF;
}

.red-div {
	border: 2px solid #E24A1F;
}

.input {
	background-color: transparent;
	top: 10px;
	position: absolute;
	left: 20px;
	outline: none;
	border: none;
	z-index: 1;
	font-size: 18px;
	-webkit-appearance: none;

}


.warning {
	font-size: 15px;
	color: #E24A1F;
  position: absolute;
  right: 10px;
  top: 40px;
}

.button {
	cursor: pointer;
	color: #fff;
	width: 100px;
	height: 30px;
	outline: none;
	border: none;
	border-radius: 2px;
	font-size: 16px;
	font-weight: 500;
	text-align: center;
	text-decoration: none;
	/*font-family: SYHT, "Microsoft Yahei", "微软雅黑", Arial, Helvetica, sans-serif;*/
}

.button:active {
	margin-top: 1px;
	margin-bottom: 1px;
	border-bottom: 0;
}

#post {
  float: right;
	margin-right: 70px;
 	background-color: #1BB2C7;
 	border-bottom: 1px solid #1B8998;
/*	-moz-box-shadow: 0.5px 0.5px 0.5px 0.5px #3799A7;
 	-webkit-box-shadow: 0.5px 0.5px 0.5px 0.5px #3799A7;
 	box-shadow: 0.5px 0.5px 0.5px 0.5px #3799A7;*/
}

#reset {
	float: left;
	margin-left: 70px;
	background-color: #B5B5B5;
	border-bottom: 1px solid #A5A5A5;
/*  	-moz-box-shadow: 0.5px 0.5px 0.5px 0.5px #8A8A8A;
  	-webkit-box-shadow: 0.5px 0.5px 0.5px 0.5px #8A8A8A;
  	box-shadow: 0.5px 0.5px 0.5px 0.5px #8A8A8A;*/
}

</style>
