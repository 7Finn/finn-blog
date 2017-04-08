<template>
  <div class="tag-list">
    <ul>
      <Tag v-for="tag in this.$store.state.tags" v-bind:tag="tag"></Tag>
    </ul>
  </div>
</template>

<script>
import Tag from './tag'

export default {
  data: function () {
    return {
    }
  },
  mounted: function() {
    if (this.$store.state.tags.length == 0) {
      this.$http.get('/api/article/tags')
        .then(res => { //success
          if (!res.body.err) {
            this.$store.state.tags = res.body.data;
          } else {
            console.log("你请求的什么鬼tag￣△￣");
          }
        }, res=> { //fail
          console.log("错误返回");
        });
    }
  },
  components: {
    Tag
  }
}

</script>

<style>
.tag-list {
  width: 155px;
  border-radius: 2px;
  background-color: #fff;
  box-shadow: 1px 1px 1px #ddd;
  border-left: 5px solid #77c2ff;
  padding: 10px;
}

.tag-list li {
}
</style>
