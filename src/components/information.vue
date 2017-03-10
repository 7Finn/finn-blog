<template>
  <div class="self-information">
    <img class="avatar" src="../assets/img/avatar.jpg" alt="头像">
    <!-- <ul class="contact-list">
      <li>
        <a class="weibo-link" href="http://weibo.com/u/2082859582/" target='_blank'>
          <img src="../assets/img/weibo.svg" alt="weibo">@57Finn</a>
      </li>
      <li>
        <a><img src="../assets/img/wechat.svg" alt="wechat">q879788904</a>
      </li>
    </ul> -->
  </div>
</template>

<style>
/* 个人信息框 */

.self-information {
  width: 160px;
  border-radius: 2px;
  background-color: #f9f9f9;
  box-shadow: 1px 1px 1px #ddd;
  padding: 10px;
}

.self-information .avatar {
  border-radius: 2px;
  width: 160px;
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




/* 搜索框 */

.search-bar {

}

.search-bar input {
  border: none;
  width: 100%;
}

</style>
