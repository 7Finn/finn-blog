<template>
  <div id="index">
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
    this.$http.get('/api/article/getArticles/' + this.articles.length)
      .then(res => { //success
        this.articles = [...this.articles, ...res.body];
      }, res=> { //fail
        console.log("错误返回");
      });
    // window绑定

    window.addEventListener("scroll", () => {
      // 网页可见区域高： document.body.clientHeight;
      // 网页被卷去的高： document.body.scrollTop;
      // 网页正文全文高： document.body.scrollHeight;
      // clientHeight + scrollTop = scrollHeight
      let scrollTop = document.body.scrollTop;
      let scrollHeight = document.body.scrollHeight;
      let clientHeight = document.body.clientHeight;

      if (scrollTop + clientHeight >= scrollHeight) {
        this.$http.get('/api/article/getArticles/' + this.articles.length)
          .then(res => { //success
            this.articles = [...this.articles, ...res.body];
          }, res=> { //fail
            console.log("错误返回");
          });
        }
      }, false);
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
