<template>
  <article class="article">
    <h1><router-link v-bind:to='articleURL'>{{ article.title }}</router-link></h1>
    <div v-html="compiledMarkdown" class="marked-html"></div>
    <hr />
    <span class="article-date"><i class="fa fa-calendar" aria-hidden="true"></i>  {{ article.date }}</span>
    <span class="article-pv"><i class="fa fa-eye" aria-hidden="true"></i>  {{ article.pv }}次阅读 </span>
    <span class="tags-group">
      <a v-for="tag in article.tags"> {{ tag }} </a>
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
    articleURL: function() {
      return '/article/detail/' + this.article.id;
    },
    compiledMarkdown: function () {
      return marked(this.article.content, { sanitize: true })
    }
  },

}
</script>


<style>

@import '../assets/css/article.css';

</style>
