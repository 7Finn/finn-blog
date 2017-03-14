<template>
  <div class="smallApp" @click="onClick">
    <div class="cover" v-bind:class="classObject"></div>
    <div class="info-box">
      <p class="title">{{ name }}</p>
      <p class="introduce">{{ introduce }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["name", "url", "introduce"],
  data: function() {
    return {
    }
  },
  methods: {
    onClick: function() {
      this.$router.push(this.url);
    }
  },
  computed: {
    classObject: function () {
      return {
        'puzzle-cover': this.name == '拼图游戏',
      }
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
  width: 100%;
  box-shadow: 1px 1px 1px #ddd;
  transition: all 0.2s;
}

.smallApp:hover {
  margin-top: -4px;
  box-shadow: 4px 4px 4px #ddd;
  transition: all 0.2s;
}

.smallApp .cover {
  border-radius: 4px 0 0 4px;
  height: 300px;
  width: 30%;
  float: left;
  background-size:cover;
}


.smallApp .info-box {
  float: left;
  padding: 20px;
  width: 60%;
}

.smallApp .info-box .title {
  font-size: 20px;
}

.smallApp .info-box .introduce {
  font-size: 16px;
}

.smallApp .puzzle-cover {
  background-image: url(../assets/img/3.jpg);
}
</style>
