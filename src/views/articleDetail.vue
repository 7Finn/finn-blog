<template>
  <div>
    <div class="right">
      <Information id="information"></Information>
      <button @click="backTop" class="back-top" v-if="this.$store.state.scrollTop > 300">
        <i class="fa fa-arrow-up" aria-hidden="true"></i>
        返回顶部
      </button>
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
        this.$router.push('/404');
      });
  },
  methods: {
    backTop: function() {
      document.body.scrollTop = 0;
    }
  }
}
</script>

<style>
.article-detail {
  margin-right: 220px;
}


</style>
