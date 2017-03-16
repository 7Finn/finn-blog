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
