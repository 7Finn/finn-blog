<template>
  <nav id="navbar" class="nav">
    <router-link to='/' class="brand">Finn</router-link>
    <ul class="nav-list">
      <li><router-link to='/' class="nav-item">主页</router-link></li>
      <li><router-link to='/smallapps' class="nav-item">小应用</router-link></li>
      <li v-if="this.$store.state.isManager">
        <router-link to='/manager' class="nav-item">管理</router-link>
      </li>
      <li v-if="this.$store.state.isManager">
        <a @click='logout' class="nav-item nav-item-link">退出登录</a>
      </li>
    </ul>
  </nav>
</template>

<script>

export default {
  data: function() {
    return {
    }
  },
  beforeCreate: function() {
    this.$http.get('/api/manager')
      .then(res => {  // success
        if(!res.body.err) {
          // 这里直接就判断管理员了，因为只有一个账号（笑）
          this.$store.state.isManager = true;
        } else {
          this.$store.state.isManager = false;
        }
      });
  },
  methods: {
    logout: function(event) {
      this.$http.get('/api/logout')
        .then(res => {  // success
          this.$store.state.isManager = false;
        });
    }
  }
}
</script>

<style>
.nav {
  background-color: #fff;
  border-bottom: 1px solid #ddd;
  box-shadow: 1px 1px 1px #ddd;
  height: 70px;
  padding: 0 10%;
  margin-bottom: 30px;
}

.nav li {
  display: inline-block;
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

.nav-list {
  float: right;
  height: inherit;
}

.nav-item {
  line-height: 70px;
  margin: 0 10px;
}

.nav-item-link {
  cursor: pointer;
}


</style>
