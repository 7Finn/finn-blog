<template>
  <div class="tag-list">
    <ul>
      <Tag v-for="tag in tags" v-bind:tag="tag"></Tag>
    </ul>
  </div>
</template>

<script>
import Tag from './tag'

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
  },
  components: {
    Tag
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
