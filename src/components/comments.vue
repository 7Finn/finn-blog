<template lang="html">
  <div class="comment-block">
    <div class="comments">
      <p>暂无评论</p>
    </div>
    <div id="comment-editor">
      <div class="comment-cover" v-if="true">
        <p>请先<a @click="showLoginModal">登录</a>或<a @click="showRegistorModal">注册</a></p>
      </div>
      <div v-else>
        <p class="nick-name">57Finn</p>
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

.comment-block {
  padding: 20px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 1px 1px 1px #ddd;
  margin-right: 220px;
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
  background-color: #009a61;
  border: 1px solid #008151;
  color: #fff;
  font-size: 15px;
  height: 30px;
}

#comment-editor .submit:active {
  background-color: #006741;
  border: 1px solid #00432a;
}

</style>
