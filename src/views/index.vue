<template>
  <div id="index">
    <h1 class="hide-head"></h1>
    <div class="right">
      <Information id="information"></Information>
      <TagList></TagList>
      <BackTop></BackTop>
    </div>
    <div class="article-list">
      <FinnArticle v-for="article in this.$store.state.indexArticles" v-bind:article="article"></FinnArticle>
    </div>
    <div class="loading" v-if="this.$store.state.articlesLoading">
      <i class="fa fa-clock-o" aria-hidden="true"></i>
      <span>加载中</span>
    </div>
    <div class="article-over" v-if="this.$store.state.indexOver">
      <hr/><span>已经到底啦</span><hr/>
    </div>
  </div>
</template>

<script>
import FinnArticle from '../components/article'
import Information from '../components/information'
import TagList from '../components/tagList'
import BackTop from '../components/backtop'

export default {
  data: function() {
    return {
      timer: null
    }
  },
  components: {
    FinnArticle,
    Information,
    TagList,
    BackTop
  },
  mounted: function() {
    // 初始化清空文章列表
    if (this.$store.state.indexArticles.length == 0) {
      this.$store.state.articlesLoading = true;
      this.$http.get('/api/article/getArticles?start=' + this.$store.state.indexArticles.length)
        .then(res => { //success
          if (!res.body.err) {
            this.$store.state.articlesLoading = false;
            this.$store.state.indexArticles = [...this.$store.state.indexArticles, ...res.body.data];
          } else {
            console.log(res.body.data);
          }
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
      let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
      let scrollHeight = document.body.scrollHeight || document.documentElement.scrollHeight;
      let clientHeight = document.body.clientHeight || document.documentElement.clientHeight;

      this.$store.state.scrollTop = scrollTop;

      if (scrollTop + clientHeight >= scrollHeight) {
        // 主页
        if (this.$route.name == 'index' && this.$store.state.indexOver) return;
        if (this.$route.name == 'index' && this.$store.state.articlesLoading == false) {
          this.$store.state.articlesLoading = true;
          this.$http.get('/api/article/getArticles?start=' + this.$store.state.indexArticles.length)
            .then(res => { //success
              if (!res.body.err) {
                this.$store.state.articlesLoading = false;
                // 如果已经没有文章了
                if (res.body.data.length == 0) {
                  this.$store.state.indexOver = true;
                  return;
                }
                this.$store.state.indexArticles = [...this.$store.state.indexArticles, ...res.body.data];
              } else {
                console.log(res.body.data);
              }
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
  color: #969696;
}

.article-over {
  margin-right: 220px;
  text-align: center;
  color: #969696;
}

.article-over hr {
  display: inline-block;
  margin: 0 20px;
  width: 30%;
  border: none;
  border-top: 1px solid #ccc;
  vertical-align: middle;
}

.hide-head {
  padding-top: 10px;
  margin: 0;
  margin-top: -10px;
}



.loading span {
  margin-left: 10px;
}
</style>
