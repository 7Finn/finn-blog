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
      this.$router.push('/category/' + this.tag.name);
    }
  }
}
</script>
