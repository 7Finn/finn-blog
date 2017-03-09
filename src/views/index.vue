<template>
  <div class="article-list">
    <myArticle></myArticle>
    <myArticle></myArticle>
  </div>
</template>

<script>
import myArticle from '../components/article.vue'
export default {
  date() {
    return {

    }
  },
  components: {
    myArticle
  }
}
</script>

<style>
.article-list {
  margin-right: 220px;
}
</style>
