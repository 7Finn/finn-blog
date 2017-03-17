<template>
  <article class="article">
    <h1><a class="article-link" @click="pushUrl" >{{ article.title }}</a></h1>
    <div v-html="compiledMarkdown" class="marked-html"></div>
    <hr />
    <span class="article-date"><i class="fa fa-calendar" aria-hidden="true"></i>  {{ article.date }}</span>
    <span class="article-pv"><i class="fa fa-eye" aria-hidden="true"></i>  {{ article.pv }}次阅读 </span>
    <span class="tags-group">
      <a v-for="tag in article.tags" @click="toTag"> {{ tag }} </a>
    </span>
  </article>
</template>

<script>
import marked from 'marked'

export default {
  props: ['article'],
  data: function() {
    return {
    }
  },
  computed: {
    compiledMarkdown: function () {
      return marked(this.article.content, { sanitize: true })
    }
  },
  methods: {
    pushUrl: function() {
      this.$router.push('/article/detail/' + this.article.id);
    },
    toTag: function(event) {
      let category = event.target.innerHTML.trim();
      this.$router.push('/category/' + category);
      this.$http.get('/api/article/category?name=' + category)
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

@import '../assets/css/article.css';

</style>
