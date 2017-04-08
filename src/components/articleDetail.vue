<template>
  <article class="article" v-if="article">
    <button class="back-btn" @click="back" ><i class="fa fa-reply" aria-hidden="true"></i>   返回</button>
    <h1>{{ article.title }}</h1>
    <div class="article-info">
      <span class="article-date"><i class="fa fa-calendar" aria-hidden="true"></i>  {{ article.date }}</span>
      <span class="article-pv"><i class="fa fa-eye" aria-hidden="true"></i>  {{ article.pv }}次阅读 </span>
      <span class="tags-group">
        <a v-for="tag in article.tags" @click="toTag"> {{ tag }} </a>
      </span>
    </div>
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
  methods: {
    back: function(event) {
      this.$router.go(-1);
    },
    toTag: function(event) {
      let category = event.target.innerHTML.trim();
      this.$router.push('/category/' + category);
    }
  }

}
</script>


<style>

.article-info {

}

.back-btn {
  float: right;
  outline: none;
  border: none;
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
