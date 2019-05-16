<template>
  <div class="post-detail">
    <div class="title">{{post && post.title}}</div>
    <div class="middle">
      <div class="type">主题：{{post && post.topic.title}}</div>
      <div class="author">作者：{{post && post.user.name}}</div>
    </div>
    <div class="foot">
      <div class="time">时间：{{post && post.created_at}}</div>
      <div class="like">赞:{{post && post.like_count}}</div>
      <div class="collection">收藏：{{post && post.collect_count}}</div>
    </div>
    <div class="content" v-html="post && post.content"></div>
  </div>
</template>

<script>
import api from "../common/api";
export default {
  props: ["id"],
  data() {
    return {
      post: null
    };
  },
  async mounted() {
    try {
      let res = await api.postDetail(this.id);
      if (res.data.code != 200) {
        alert(res.data.message);
      } else {
        this.post = res.data.data;
      }
    } catch (err) {
      alert(err);
    }
  }
};
</script>

<style lang='scss'>
.post-detail {
  padding: 30px 50px;
  box-sizing: border-box;
  box-shadow: 0 0 15px 0 #ccc;
  border-radius: 8px;
  .title {
    font-size: 24px;
    font-weight: bold;
    padding: 10px 0;
  }
  .middle,
  .foot {
    display: flex;
    padding: 5px 0px;
    font-size: 12px;
    color: #999;
    div {
      margin-right: 40px;
    }
  }
  .content {
    padding: 40px 20px;
  }
}
</style>
