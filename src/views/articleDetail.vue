<template>
  <div>
    <div class="right">
      <Information id="information"></Information>
    </div>
    <ArticleDetail class="article-detail" v-bind:article="article"></ArticleDetail>
  </div>
</template>

<script>
import ArticleDetail from '../components/articleDetail'
import Information from '../components/information'

export default {
  data: function() {
    return {
      article: null
    }
  },
  components: {
    ArticleDetail,
    Information
  },
  beforeCreate: function() {
    this.$http.get('/api/article/detail?id=' + this.$route.params['id'])
      .then(res => { //success
        this.article = res.body;
      }, res=> { //fail
        console.log("错误返回");
      });
  }
}
</script>

<style>
.article-detail {
  margin-right: 220px;
}


</style>
