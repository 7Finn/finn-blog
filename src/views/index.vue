<template>
  <div>
    <div class="right">
      <Information id="information"></Information>
      <TagList></TagList>
    </div>
    <div class="article-list">
      <FinnArticle v-for="article in articles" v-bind:article="article"></FinnArticle>
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
      articles: []
    }
  },
  components: {
    FinnArticle,
    Information,
    TagList
  },
  mounted: function() {
    this.$http.get('/api/article/getall')
      .then(res => { //success
        this.articles = res.body.articles;
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
