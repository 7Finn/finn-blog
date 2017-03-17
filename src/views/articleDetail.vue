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
    <div class="temp-comment" v-if="!this.loading">
      <h3><i class="fa fa-wrench" aria-hidden="true"></i>  评论区建设中...</h3>
      <p>欢迎反馈问题~可投送邮箱879788904@qq.com</p>
    </div>
  </div>
</template>

<script>
import ArticleDetail from '../components/articleDetail'
import Information from '../components/information'
import BackTop from '../components/backtop'

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
    BackTop
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
