<template>
  <nav id="navbar" class="nav">
    <router-link to='/' class="brand">Finn</router-link>
    <ul class="nav-right">
      <router-link to='/' class="nav-item">主页</router-link>
      <router-link to='/puzzle' class="nav-item">迷宫小游戏</router-link>
      <a href="" @click='logout' class="nav-item" v-if="online">退出登录</a>
      <router-link to='/login' class="nav-item" v-else>登录</router-link>
    </ul>
  </nav>
</template>

<script>
export default {
  data: function() {
    return {
      online: false
    }
  },
  mounted: function() {
    this.$http.get('/api/user')
      .then(res => {  // success
        if(res.body.username) {
          this.online = true;
        } else {
          // this.$router.push('/');
        }
      });
  },
  methods: {
    logout: function(event) {
      this.$http.get('/api/logout')
        .then(res => {  // success
          this.online = false;
        });
    }
  }
}
</script>

<style>
.nav {
  background-color: #f9f9f9;
  border-bottom: 1px solid #ddd;
  box-shadow: 1px 1px 1px #ddd;
  height: 70px;
  padding: 0 10%;
  margin-bottom: 40px;
}

.brand {
  color: #000;
  font-size: 24px;
  float: left;
  width: 50px;
  height: inherit;
  line-height: 70px;
  display: inline-block;
  vertical-align: middle
}

.nav-right {
  float: right;
  height: inherit;
}

.nav-item {
  line-height: 70px;
  display: inline-block;
  margin: 0 10px;
}
</style>
