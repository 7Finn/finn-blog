<template lang="html">
  <div class="comment-block">
    <div class="comments">
      <p>暂无评论</p>
    </div>
    <div id="comment-editor">
      <div class="comment-cover" v-if="!this.$store.state.user">
        <p>请先<a @click="showLoginModal">登录</a>或<a @click="showRegistorModal">注册</a></p>
      </div>
      <div v-else>
        <p class="nick-name"><span class="online-circle"></span>{{ this.$store.state.user.username }}</p>
        <textarea name="comment-editor" class="comment-editor" rows="10"></textarea>
        <button type="button" name="submit" class="submit">发表</button>
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
    showLoginModal: function() {
      this.$store.state.modalShow = true;
    },
    showRegistorModal: function() {
      this.$store.state.modalShow = true;
    }
  }
}
</script>

<style lang="css">

.comments {
  border-bottom: 1px solid #ddd;
}

.online-circle {
  width: 8px;
  height: 8px;
  background-color: #5cb85c;
  display: inline-block;
  /*box-shadow: 2px 2px 2px green;*/
  border-radius: 50%;
  margin-right: 5px;
}

.comment-block {
  padding: 20px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 1px 1px 1px #ddd;
  margin-right: 220px;
  overflow: auto;
}


#comment-editor .comment-cover {
  width: 100%;
  padding: 10px 0;
  text-align: center;
}

#comment-editor textarea {
  color: #555;
  width: 100%;
  resize: vertical;
  border: 1px solid #ddd;
  border-radius: 2px;
  box-sizing: border-box;
}


#comment-editor .submit {
  border-radius: 2px;
  cursor: pointer;
  float: right;
  margin-top: 10px;
  background-color: #5cb85c;
  border: 1px solid #4cae4c;
  color: #fff;
  font-size: 15px;
  width: 60px;
  height: 30px;
}

#comment-editor .submit:hover {
  background-color: #449d44;
  border: 1px solid #398439;
}

#comment-editor .submit:active {
  background-color: #398439;
  border: 1px solid #255625;
}

</style>
