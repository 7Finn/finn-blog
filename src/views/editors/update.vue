<template lang="html">
  <Editor v-bind:articleId="this.$route.params['id']"></Editor>
</template>

<script>
import Editor from '../../components/editor'
export default {
  data: function() {
    return {}
  },
  components: {
    Editor
  }
}
</script>

<style lang="css">
</style>
