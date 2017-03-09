<template>
  <div>
    <navbar></navbar>
    <div class="container">
      <information></information>
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
import navbar from './components/navbar.vue'
import information from './components/information'
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: { navbar, information }
}
</script>


<style>
/*
  微信：#7cd33b
  微博：#e6162d
*/

body {
  margin: 0;
  padding: 0;
  font: 14px "Lucida Grande", Helvetica, Arial, sans-serif;
  background-color: #eaeaea;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

a {
  color: #00B7FF;
  text-decoration: none;
}

.container {
  width: 70%;
  margin-left: auto;
  margin-right: auto;
}

</style>
