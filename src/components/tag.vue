<template>
  <li><a @click="setCategory">{{ tag.name }}({{ tag.articlesId.length }})</a></li>
</template>


<script>
export default {
  props: ['tag'],
  data: function() {
    return {}
  },
  methods: {
    setCategory: function() {
      this.$http.get('/api/article/category?name=' + this.tag.name)
        .then(res => { //success
          if (!res.body.err) {
            this.$store.state.categoryArticles = res.body.data;
            this.$router.replace('/category/' + this.tag.name);
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
