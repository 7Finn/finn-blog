<template>
  <div class="">
    <h1>管理博客</h1>
    <router-link to='/article/write'>发表博客</router-link>
    <input type="text" name="input" v-model="articleId">
    <router-link v-bind:to="updateLink">更新博客</router-link>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      articleId: ''
    }
  },
  computed: {
    updateLink: function() {
      return '/article/update/' + this.articleId; 
    }
  }
}
</script>
