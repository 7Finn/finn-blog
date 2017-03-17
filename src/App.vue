<template>
  <div id="outer">
    <!-- <Modal></Modal> -->
    <Navbar></Navbar>
    <div id="container">
      <router-view class="router"></router-view>
    </div>
    <footer>©2017 吴其锋. All rights reserved.</footer>
  </div>
</template>

<script>
import Vue from 'vue'
import Navbar from './components/navbar'
// import Modal from './components/modal'
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

#outer {
  position: relative;
  height: auto;
  min-height: 100%;
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
  margin: 0 auto;
  padding-bottom: 40px;
  min-width: 700px;
}



</style>
