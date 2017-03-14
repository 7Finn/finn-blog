<template>
  <div id="index">
    <div class="right">
      <Information id="information"></Information>
      <TagList></TagList>
      <button @click="backTop" class="back-top" v-if="this.$store.state.scrollTop > 300">
        <i class="fa fa-arrow-up" aria-hidden="true"></i>
        返回顶部
      </button>
    </div>
    <div class="article-list">
      <FinnArticle v-for="article in this.$store.state.indexArticles" v-bind:article="article"></FinnArticle>
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
    // 初始化清空文章列表
    if (this.$store.state.indexArticles.length == 0) {
      this.$store.state.articlesLoading = true;
      this.$http.get('/api/article/getArticles?start=' + this.$store.state.indexArticles.length)
        .then(res => { //success
          this.$store.state.articlesLoading = false;
          this.$store.state.indexArticles = [...this.$store.state.indexArticles, ...res.body];
        }, res=> { //fail
          console.log("错误返回");
        });
    }
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

      this.$store.state.scrollTop = scrollTop;

      if (scrollTop + clientHeight >= scrollHeight) {
        // 主页
        if (this.$route.name == 'index' && this.$store.state.articlesLoading == false) {
          this.$store.state.articlesLoading = true;
          this.$http.get('/api/article/getArticles?start=' + this.$store.state.indexArticles.length)
            .then(res => { //success
              this.$store.state.articlesLoading = false;
              this.$store.state.indexArticles = [...this.$store.state.indexArticles, ...res.body];
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
  },
  methods: {
    backTop: function() {
      document.body.scrollTop = 0;
    }
  }
}
</script>

<style>
hr {
  border-color: #ddd;
}

footer {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 10px;
  text-align: center;
  color: #888;
}

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

.loading {
  margin-right: 220px;
  text-align: center;
}

.back-top {
  cursor: pointer;
  position: fixed;
  right: 20%;
  height: 40px;
  bottom: 50px;
  outline: none;
  border: none;
  background-color: rgba(0, 0, 0, 0.1);
  width: 100px;
  transition: all 0.2s;
}

.back-top:hover {
  color: #fff;
  background-color: rgba(0, 0, 0, 0.3);
  transition: all 0.2s;
}

.loading span {
  margin-left: 10px;
}
</style>
