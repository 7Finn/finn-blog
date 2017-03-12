<template>
  <div class="tag-list">
    <ul>
      <li v-for="tag in tags"><a href="#"> {{ tag.name }}({{ tag.articlesId.length }})</a></li>
    </ul>
  </div>
</template>

<script>

export default {
  data: function () {
    return {
      tags : []
    }
  },
  mounted: function() {
    this.$http.get('/api/article/tags')
      .then(res => { //success
        this.tags = res.body;
      }, res=> { //fail
        console.log("错误返回");
      });
  }
}

</script>

<style>
.tag-list {
  width: 160px;
  border-radius: 2px;
  background-color: #fff;
  box-shadow: 1px 1px 1px #ddd;
  padding: 10px;
}
</style>
