<template>
  <article class="article" v-if="article">
    <h1>{{ article.title }}</h1>
    <span class="article-date"><i class="fa fa-calendar" aria-hidden="true"></i>  {{ article.date }}</span>
    <span class="article-pv"><i class="fa fa-eye" aria-hidden="true"></i>  {{ article.pv }}次阅读 </span>
    <span class="tags-group">
      <a v-for="tag in article.tags"> {{ tag }} </a>
    </span>
    <hr />
    <div v-html="compiledMarkdown" id="marked-html"></div>
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

}
</script>


<style>


</style>
