<template>
  <div class="">
    <h1>管理页面</h1>
    <router-link to="/manager/blogs">管理博客</router-link>
    <router-link to="/manager/tags">管理标签</router-link>
             <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view></router-view>
  </div>
</template>
