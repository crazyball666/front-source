<template>
  <div class="index">
    <topic-tab :topic-list="topicList" @select="selectTab"/>
    <div class="post-list-box">
      <div class="header">
        <div class="title">{{selectTabTitle}}</div>
        <span class="post-btn" @click="createPost">发帖</span>
      </div>
      <div class="post-list">
        <div class="post-item" v-for="post in postList" :key="post.id" @click="read(post.id)">
          <div class="first">
            <div class="topic">{{post.topic.title}}</div>
            <div class="user">{{post.user.name}}</div>
          </div>
          <div class="title">{{post.title}}</div>
          <div class="last">
            <div class="like">赞:{{post.like_count}}</div>
            <div class="collect-count">收藏数：{{post.collect_count}}</div>
            <div class="time">时间：{{post.updated_at}}</div>
          </div>
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
      postList: [],
      selectTabTitle: "热门推荐"
    };
  },
  async mounted() {
    try {
      let topicList = await api.getTopicList();
      this.topicList = topicList.data.data.rows;
      let postList = await api.getPostList();
      this.postList = postList.data.data.rows;
    } catch (err) {
      alert(err);
    }
  },
  methods: {
    async selectTab(topic) {
      this.selectTabTitle = topic.title;
      console.log(topic.id);
      try {
        let postList = await api.getPostList(topic.id);
        this.postList = postList.data.data.rows;
      } catch (err) {
        alert(err);
      }
    },
    createPost() {
      this.$router.push({ path: "/post" });
    },
    read(id) {
      this.$router.push({ path: "/post/" + id });
    }
  }
};
</script>

<style lang='scss' scoped>
.index {
  display: flex;
  flex-direction: row;
  box-shadow: 0 0 15px 0 #ccc;
  border-radius: 8px;
}
.post-list-box {
  flex: 1;
}
.header {
  display: flex;
  padding: 20px 20px;
  .title {
    font-size: 24px;
    font-weight: bold;
    border-left: 8px solid #d41515;
    padding-left: 8px;
    flex: 1;
  }
  .post-btn {
    cursor: pointer;
    text-align: center;
    padding: 5px 0;
    width: 80px;
    background: #0088ee;
    color: #fff;
    border-radius: 30px;
  }
}
.post-item {
  padding: 10px 20px;
  border-bottom: 1px solid #ccc;
  .first {
    color: #666;
    // margin: 5px 0;
    .topic {
      display: inline-block;
      margin-right: 25px;
    }
    .user {
      display: inline-block;
      font-size: 12px;
    }
  }
  .title {
    font-size: 16px;
    font-weight: bold;
    margin: 8px 0;
  }
  .last {
    display: flex;
    font-size: 12px;
    color: #666;
    div {
      // flex: 1;
      width: 25%;
    }
  }
}
</style>
