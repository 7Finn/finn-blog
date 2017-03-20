<template lang="html">
  <div id="modal" v-show="this.$store.state.modalShow">
    <div class="modal-mask" @click="hide">
      <div class="modal-container">
        <div class="modal-header">
          <slot name="header">头部信息</slot>
        </div>
        <div class="modal-content">
          <slot name="content">主体内容</slot>
        </div>
        <div class="modal-footer">
          <slot name="footer">脚部信息</slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {}
  },
  methods: {
    hide: function() {
      this.$store.state.modalShow = false;
    }
  }
}
</script>

<style lang="css">

#modal {
  z-index: 100;
  position: absolute;
  width: 100%;
  height: 100%;
}

#modal .modal-mask {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  transition: opacity .3s ease;
}

#modal .modal-container {
  border-radius: 2px;
  width: 400px;
  height: auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  background-color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  top: 30%;
}

#modal .modal-header {
  position: absolute;
  height: 50px;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border-bottom: 1px solid #ccc;
  top: 0;
  left: 0;
}

#modal .modal-content {
  padding: 20px;
  margin-top: 50px;
  margin-bottom: 50px;
}

#modal .modal-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 50px;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border-top: 1px solid #ccc;
}

</style>
