<template>
  <div class="right">
    <div class="right-div self-information">
      <img class="avatar" src="../assets/avatar.jpg" alt="头像">
      <ul class="contact-list">
        <li>
          <a class="weibo-link" href="http://weibo.com/u/2082859582/" target='_blank'>
            <img src="../assets/weibo.svg" alt="weibo">@57Finn</a>
        </li>
        <li>
          <a><img src="../assets/wechat.svg" alt="wechat">q879788904</a>
        </li>
      </ul>
    </div>
    <div class="right-div tag-list">
      <ul>
        <li><a href="#">JavaScript(20)</a></li>
        <li><a href="#">Python(0)</a></li>
      </ul>
    </div>
  </div>
</template>

<style>
/* 右边信息栏 */
.right {
  float: right;
  width: 180px;
}

.right-div {
  border-radius: 2px;
  background-color: #f9f9f9;
  box-shadow: 1px 1px 1px #ddd;
  padding: 10px;
}

/* 个人信息框 */

.self-information {
  margin-bottom: 20px;
}

.self-information .avatar {
  border-radius: 2px;
  width: 160px;
  margin-bottom: 20px;
}

.self-information .contact-list {
  margin-left: 10px;
}

.self-information .contact-list img[src *= '.svg'] {
  width: 20px;
  margin-right: 10px;
  vertical-align: middle;
}

.self-information .contact-list a {
  color: #000;
}

.self-information .contact-list .weibo-link {
  color: #e6162d;
}


/* Tag栏 */

.tag-list {
  margin-bottom: 20px;
}

/* 搜索框 */

.search-bar {

}

.search-bar input {
  border: none;
  width: 100%;
}

</style>
