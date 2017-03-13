<template>
  <div>
    <div class="right">
      <Information id="information"></Information>
    </div>
    <div class="article-list">
      <ArticleDetail v-bind:article="article"></ArticleDetail>
    </div>
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
    this.$http.get('/api/article/detail/' + this.$route.params['id'])
      .then(res => { //success
        this.article = res.body;
      }, res=> { //fail
        console.log("错误返回");
      });
  }
}
</script>

<style>
.article-list {
  margin-right: 220px;
}

/* 右边信息栏 */
.right {
  float: right;
}

#information {
  margin-bottom: 20px;
}

</style>
