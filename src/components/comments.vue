<template lang="html">
  <div class="comment-block">
    <div class="comments">
      <ul>
        <li v-show="commentsArray.length == 0">暂无评论哦</li>
        <li v-for="comment in commentsArray">
          <div class="user-box">
            <img class="avatar" :src="comment.avatarSrc" alt="头像">
            <span class="nickname">{{ comment.nickname }}</span>
          </div>
          <div class="content-box">
            <p>{{ comment.comment }}</p>
          </div>
        </li>
      </ul>
    </div>
    <div id="comment-editor">
      <div class="comment-cover" v-if="!this.$store.state.user">
        <p>请先<a @click="showLoginModal">登录</a>或<a @click="showLoginModal">注册</a></p>
      </div>
      <div v-else>
        <p>
          <span class="online-circle"></span>
          {{ this.$store.state.user.nickname }}
          <a type="button" name="logout-btn" class="logout-btn" @click="logout">退出登录</a>
        </p>
        <textarea name="comment-editor" class="comment-editor" rows="10" v-model="textValue"></textarea>
        <button type="button" name="submit" class="submit" @click="submit">发表</button>
      </div>
    </div>
  </div>
</template>


<script>

export default {
  props: ['aid', 'comments'],
  data: function() {
    return {
      textValue: "",
      commentsArray: []
    }
  },
  watch: {
    comments: function() {
      this.commentsArray = this.comments;
    }
  },
  beforeCreate: function() {
    this.$http.get('/api/user')
      .then(res => {  // success
        if(!res.body.err) {
          // 这里直接就判断管理员了，因为只有一个账号（笑）
          this.$store.state.user = res.body.data;
        } else {
          this.$store.state.user = null;
        }
      });
  },
  methods: {
    showLoginModal: function() {
      this.$store.state.modalShow = true;
    },
    submit: function() {
      if (!this.textValue) return false;
      else {
        let data = {
          aid: this.aid,
          comment: this.textValue
        }
        this.$http.post('/api/comment/add', data)
          .then(res => {
            if (!res.body.err) {
              let c = {
                nickname: this.$store.state.user.nickname,
                comment: data.comment,
                avatarSrc: require('../assets/avatar/' + this.$store.state.user.nickname.charCodeAt(this.$store.state.user.nickname.length - 1)%10 + '.svg')
              }
              this.commentsArray.push(c);
              this.textValue = ""; // 清空文本框
            } else {
              console.log(res.body.data);
            }
          })
      }
    },
    logout: function() {
      this.$http.get('/api/logout')
        .then(res => {
          this.$store.state.user = null;
        })
        .catch(err => {
          console.log("退出失败");
        })
    }
  }
}
</script>

<style lang="css">

.comments {
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

.comment-block li {
  overflow: auto;
  padding-bottom: 10px;
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
}

.comment-block .user-box {
  text-align: center;
  float: left;
  width: 80px;
  margin-right: 20px;
}

.comment-block .user-box .nickname {
  word-wrap: break-word;
}

.comment-block .user-box .avatar {
  width: 50px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 5px;
}

.comment-block .logout-btn {
  float: right;
}

.comment-block .content-box {
  margin-left: 100px;
}

.comment-block .content-box p {
  margin: 0;
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
