<template>
  <div>
    <div class="banner">
      <div class="header">
        <h1>
          放各种稀奇古怪的东西
        </h1>
        <small>暂时只有一个（笑）</small>
      </div>
    </div>
    <div class="apps-group">
      <SmallApp imgUrl="../../assets/img/1.jpg" name="拼图游戏"
        url="/puzzle"
        introduce="原生Javascript+html+css，好像是Web2.0课程的第四个作业，15年的作品，有简单和困难可选，可自动还原。">
        </SmallApp>
    </div>
  </div>
</template>

<script>
import SmallApp from '../components/smallApp'

export default {
  data: function() {
    return {}
  },
  components: {
    SmallApp
  }
}
</script>

<style lang="css">

.banner {
  position: absolute;
  background-color: #2f2f2f;
  width: 100%;
  height: 300px;
  left: 0;
  top: 71px;
}

.banner .header {
  position: absolute;
  top: 30%;
  left: 20%;
  color: #fff;
}

.apps-group {
  margin-top: 350px;
  width: 100%;
}
</style>
