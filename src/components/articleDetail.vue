<template>
  <article class="article" v-if="article">
    <router-link class="back-btn" to="/" ><i class="fa fa-reply" aria-hidden="true"></i>   返回</router-link>
    <h1>{{ article.title }}</h1>
    <span class="article-date"><i class="fa fa-calendar" aria-hidden="true"></i>  {{ article.date }}</span>
    <span class="article-pv"><i class="fa fa-eye" aria-hidden="true"></i>  {{ article.pv }}次阅读 </span>
    <span class="tags-group">
      <a v-for="tag in article.tags"> {{ tag }} </a>
    </span>
    <hr />
    <div v-html="compiledMarkdown" class="marked-html"></div>
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

.back-btn {
  float: right;
  width: 50px;
  text-align: center;
  display: inline-block;
  background-color: #fff;
  border-radius: 2px;
  padding: 10px;
  color: #6d6d6d;
  transition: all 0.2s;
}

.back-btn:hover {
  background-color: #b5b5b5;
  color: #fff;
  transition: all 0.2s;
}

.back-btn:active {
  background-color: #6d6d6d;
  color: #fff;
}

</style>
