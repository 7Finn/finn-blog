<template>
  <div>
    <div class="right">
      <Information id="information"></Information>
      <TagList></TagList>
    </div>
    <h1>分类：{{this.$route.params['name']}}</h1>
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
  watch: {
    $route: function() {
      this.getArticleByCategory();
    }
  },
  mounted: function() {
    if (this.$store.state.categoryArticles.length == 0) {
      this.getArticleByCategory();
    }
  },
  methods: {
    getArticleByCategory: function() {
      this.$http.get('/api/article/category?name=' + this.$route.params['name'])
        .then(res => { //success
          if (!res.body.err) {
            this.$store.state.categoryArticles = res.body.data;
          } else {
            this.$router.replace('/404');
          }
        }, res=> { //fail
          console.log("错误返回");
          this.$router.replace('/404');
        });
    }
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
