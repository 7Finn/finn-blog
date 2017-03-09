<template>
  <nav id="navbar" class="nav">
    <div class="brand">Finn</div>
    <ul class="nav-right">
      <li class="nav-item"><a href="#">主页</a></li>
      <!-- <li class="nav-item"><a href="#">联系我</a></li> -->
      <router-link to='/foo' class="nav-item">联系我</router-link>
    </ul>
  </nav>
</template>

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
