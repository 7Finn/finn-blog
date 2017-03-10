<template>
  <div>
    <div class="right">
      <Information id="information"></Information>
      <TagList></TagList>
    </div>
    <div class="article-list">
      <FinnArticle></FinnArticle>
      <FinnArticle></FinnArticle>
    </div>
  </div>
</template>

<script>
import FinnArticle from '../components/article.vue'
import Information from '../components/information.vue'
import TagList from '../components/tagList.vue'

export default {
  date() {
    return {

    }
  },
  components: {
    FinnArticle,
    Information,
    TagList
  }
}
</script>

<style>
.article-list {
  margin-right: 220px;
}

/* 右边信息栏 */
.right {
  float: right;
}

#information {
  margin-bottom: 20px;
}

</style>
