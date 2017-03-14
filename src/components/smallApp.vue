<template>
  <div class="smallApp" @click="onClick">
    <div class="bg-img"></div>
    <p>{{ name }}</p>
  </div>
</template>

<script>
export default {
  props: ["imgUrl", "name", "url"],
  data: function() {
    return {}
  },
  methods: {
    onClick: function() {
      this.$router.push(this.url);
    }
  }
}
</script>

<style>
.smallApp {
  cursor: pointer;
  display: inline-block;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 1px 1px 1px #ddd;
  width: 31%;
  margin: 0 1%;
  transition: all 0.2s;
}

.smallApp:hover {
  margin-top: -4px;
  box-shadow: 4px 4px 4px #ddd;
  transition: all 0.2s;
}

.bg-img {
  border-radius: 4px 4px 0 0;
  height: 250px;
  background-size:cover;
  background-image: url(../assets/img/3.jpg);
}

.smallApp p {
  font-size: 18px;
  padding: 0 20px;
}
</style>
