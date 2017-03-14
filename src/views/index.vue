<template>
  <div id="index">
    <div class="right">
      <Information id="information"></Information>
      <TagList></TagList>
    </div>
    <div class="article-list">
      <FinnArticle v-for="article in this.$store.state.articles" v-bind:article="article"></FinnArticle>
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
    // 初始化清空文章列表
    this.$store.state.articles = [];
    this.$http.get('/api/article/getArticles?start=' + this.$store.state.articles.length)
      .then(res => { //success
        this.$store.state.articles = [...this.$store.state.articles, ...res.body];
      }, res=> { //fail
        console.log("错误返回");
      });
    // window绑定
    // 绑定scroll
    window.addEventListener("scroll", () => {
      // 网页可见区域高： document.body.clientHeight;
      // 网页被卷去的高： document.body.scrollTop;
      // 网页正文全文高： document.body.scrollHeight;
      // clientHeight + scrollTop = scrollHeight
      let scrollTop = document.body.scrollTop;
      let scrollHeight = document.body.scrollHeight;
      let clientHeight = document.body.clientHeight;

      if (scrollTop + clientHeight >= scrollHeight) {
        // 主页
        if (this.$route.name == 'index') {
          this.$http.get('/api/article/getArticles?start=' + this.$store.state.articles.length)
            .then(res => { //success
              this.$store.state.articles = [...this.$store.state.articles, ...res.body];
            }, res=> { //fail
              console.log("错误返回");
            });
          }
        } else if (this.$route.name == 'category') {
          //
        } else {
          //
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
