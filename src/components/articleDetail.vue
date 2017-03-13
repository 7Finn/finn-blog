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
.article {
  border-radius: 2px;
  background-color: #fff;
  box-shadow: 1px 1px 1px #ddd;
  padding: 20px;
  margin-bottom: 20px;
}

.article hr {
  border: none;
  margin-bottom: 15px;
  border-top: 1px solid #ddd;
}

.article .article-date {
  color: #a0a0a0;
  font-size: 15px;
}

.article .article-pv {
  margin-left: 20px;
  color: #a0a0a0;
  font-size: 15px;
}

.article .tags-group {
  float: right;
}

.article .tags-group a {
  cursor: pointer;
  padding: 0 6px;
  height: 20px;
  line-height: 20px;
  font-size: 12px;
  text-decoration: none;
  color: #017e66;
  background-color: rgba(1,126,102,.08);
  text-align: center;
  display: inline-block;
  margin-left: 10px;
}

.article .tags-group a:hover {
  background-color: #017e66;
  color: #fff;
}

</style>
