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
  mounted: function() {
    this.$http.get('/api/article/detail?id=' + this.$route.params['id'])
      .then(res => { //success
        if (!res.body.err) {
          this.article = res.body.data;
        } else {
          console.log(res.body.data);
          this.$router.replace('/404');
        }
      }, res=> { //fail
        console.log(res.body.data);
        this.$router.replace('/404');
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
