<template>
  <li @click="setCategory"><router-link v-bind:to="url"> {{ tag.name }}({{ tag.articlesId.length }})</router-link></li>
</template>


<script>
export default {
  props: ['tag'],
  data: function() {
    return {}
  },
  computed: {
    url: function() {
      return '/category/' + this.tag.name;
    }
  },
  methods: {
    setCategory: function() {
      this.$http.get('/api/article/category?name=' + this.tag.name)
        .then(res => { //success
          this.$store.state.articles = res.body;
        }, res=> { //fail
          console.log("错误返回");
        });
    }
  }
}
</script>
