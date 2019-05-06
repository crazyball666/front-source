<template>
  <div class="index">
    <topic-tab :topic-list="topicList"/>
    <div class="post-list-box">
      <div class="header">
        <button>发帖</button>
      </div>
      <div class="post-list">
        <div class="post-item" v-for="post in postList" :key="post.id">
          <div class="title">{{post.title}}</div>
          <div class="user">{{post.user.name}}</div>
          <div class="topic">{{post.topic.title}}</div>
          <div class="like">LIKE:{{post.like}}</div>
          <div class="collect-count">收藏数：{{post.collect_count}}</div>
          <div class="time">时间：{post.updated_at}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TopicTab from "../components/topicTab";
import api from "../common/api";
/* eslint-disable */
export default {
  components: { TopicTab },
  data() {
    return {
      topicList: [],
      postList: []
    };
  },
  async mounted() {
    try {
      let topicList = await api.getTopicList();
      this.topicList = topicList.data.data.rows;
      let postList = await api.getPostList();
      this.postList = postList.data.data.rows;
      console.log(postList);
    } catch (err) {
      alert(err);
    }
  }
};
</script>

<style lang='scss' scoped>
.index {
  display: flex;
  flex-direction: row;
}
.post-list-box {
  flex: 1;
}
</style>
