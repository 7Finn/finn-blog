<template>
  <div>
    <Navbar></Navbar>
    <div id="container">
      <router-view class="router"></router-view>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Navbar from './components/navbar.vue'
export default {
  name: 'app',
  data () {
    return {
    }
  },
  components: { Navbar }
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

#container {
  width: 70%;
  margin-left: auto;
  margin-right: auto;
}



</style>
