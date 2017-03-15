<template>
  <div>
    <div class="right">
      <Information id="information"></Information>
      <TagList></TagList>
    </div>
    <div class="article-list">
      <FinnArticle v-for="article in this.$store.state.categoryArticles" v-bind:article="article"></FinnArticle>
    </div>
    <div class="loading" v-if="this.$store.state.articlesLoading">
      <i class="fa fa-clock-o" aria-hidden="true"></i>
      <span>加载中</span>
    </div>
  </div>
</template>

<script>
import FinnArticle from '../components/article'
import Information from '../components/information'
import TagList from '../components/tagList'

export default {
  data: function() {
    return {
    }
  },
  components: {
    FinnArticle,
    Information,
    TagList
  },
  mounted: function() {
    this.$store.state.articlesLoading = true;
    this.$store.state.categoryArticles = [];
    this.$http.get('/api/article/category?name=' + this.$route.params['name'])
      .then(res => { //success
        this.$store.state.articlesLoading = false;
        this.$store.state.categoryArticles = res.body;
      }, res=> { //fail
        this.$router.push('/404');
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
