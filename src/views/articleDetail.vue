<template>
  <div>
    <div class="right">
      <Information id="information"></Information>
      <BackTop></BackTop>
    </div>
    <ArticleDetail class="article-detail" v-bind:article="article"></ArticleDetail>
    <div class="loading" v-if="this.loading">
      <i class="fa fa-clock-o" aria-hidden="true"></i>
      <span>加载中</span>
    </div>
    <Comments v-bind:aid="this.$route.params['id']" v-bind:comments="comments"></Comments>
  </div>
</template>

<script>
import ArticleDetail from '../components/articleDetail'
import Information from '../components/information'
import BackTop from '../components/backtop'
import Comments from '../components/comments'

export default {
  data: function() {
    return {
      article: null,
      loading: false
    }
  },
  components: {
    ArticleDetail,
    Information,
    BackTop,
    Comments,
  },
  computed: {
    comments: function() {
      if (this.article && this.article.comments) {
        this.article.comments.forEach(function(item, index, array) {
          item.avatarSrc =  require('../assets/avatar/' + item.nickname.charCodeAt(item.nickname.length - 1)%10 + '.svg');
        });
        return this.article.comments;
      } else return [];
    }
  },
  mounted: function() {
    this.loading = true;
    this.$http.get('/api/article/detail?id=' + this.$route.params['id'])
      .then(res => { //success
        if (!res.body.err) {
          this.loading = false;
          this.article = res.body.data;
        } else {
          console.log(res.body.data);
          this.$router.replace('/404');
        }
      }, res=> { //fail
        console.log(res.body.data);
        this.$router.replace('/404');
      });
  }
}
</script>

<style>
.article-detail {
  margin-right: 220px;
}

.temp-comment {
  padding: 30px;
  text-align: center;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 1px 1px 1px #ddd;
  margin-right: 220px;
}


</style>
