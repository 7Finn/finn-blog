<template lang="html">
  <button @click="backTop" class="back-top" v-if="this.$store.state.scrollTop > 300">
    <i class="fa fa-arrow-up" aria-hidden="true"></i>
    返回顶部
  </button>
</template>

<script>
export default {
  data: function() {
    return {
      timer: null
    }
  },
  methods: {
    backTop: function() {
      let that = this;
      cancelAnimationFrame(this.timer);
      this.timer = requestAnimationFrame(function fn(){
        let oTop = document.body.scrollTop || document.documentElement.scrollTop;
        if (oTop > 0) {
          document.body.scrollTop = document.documentElement.scrollTop = oTop - 100;
          that.timer = requestAnimationFrame(fn);
        } else {
          cancelAnimationFrame(that.timer);
        };
      });
    }
  }
}
</script>

<style lang="css">
.back-top {
  cursor: pointer;
  position: fixed;
  right: 20%;
  height: 40px;
  bottom: 50px;
  outline: none;
  border: none;
  background-color: rgba(0, 0, 0, 0.1);
  width: 100px;
  transition: all 0.2s;
}

.back-top:hover {
  color: #fff;
  background-color: rgba(0, 0, 0, 0.3);
  transition: all 0.2s;
}
</style>
