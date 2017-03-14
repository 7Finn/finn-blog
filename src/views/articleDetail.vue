<template>
  <div>
    <div class="right">
      <Information id="information"></Information>
      <router-link class="back-btn" to="/" ><i class="fa fa-reply" aria-hidden="true"></i>   返回</router-link>
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

.back-btn {
  display: block;
  background-color: #fff;
  border-radius: 2px;
  padding: 10px;
  color: #6d6d6d;
}

.back-btn:hover {
  background-color: #4ec156;
  color: #fff;
}

.back-btn:active {
  background-color: #338439;
  color: #fff;
}

</style>
