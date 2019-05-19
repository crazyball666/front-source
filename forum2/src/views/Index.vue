<template>
  <div class="index">
    <topic-tab :topic-list="topicList" @select="selectTab"/>
    <div class="post-list-box">
      <div class="header">
        <div class="title">{{selectTabTitle}}</div>
        <span class="post-btn" @click="createPost">发帖</span>
      </div>
      <div class="post-list">
        <div class="post-item" v-for="post in postList" :key="post.id">
          <div class="first">
            <div class="topic">{{post.topic.title}}</div>
            <div class="user" @click="showUser(post.id)">{{post.user.name}}</div>
            <UserPop :show="post.id == showPostId" :userId="post.user.id" @close="showPostId=0"/>
          </div>
          <div class="title" @click="read(post.id)">{{post.title}}</div>
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
import UserPop from "../components/userPop";
import api from "../common/api";

export default {
  components: { TopicTab, UserPop },
  data() {
    return {
      topicList: [],
      postList: [],
      selectTabTitle: "热门推荐",
      showPostId: 0
    };
  },
  async mounted() {
    api.getTopicList().then(res => {
      this.topicList = res.data.rows;
    });
    api.getPostList().then(res => {
      this.postList = res.data.rows;
    });
  },
  methods: {
    async selectTab(topic) {
      this.selectTabTitle = topic.title;
      api.getPostList(topic.id).then(res => {
        this.postList = res.data.rows;
      });
    },
    createPost() {
      if (!this.$store.state.userId) {
        this.$message({ message: "请先登录！", type: "warning", center: true });
        return;
      }
      this.$router.push({ path: "/post" });
    },
    read(id) {
      this.$router.push({ path: "/post/" + id });
    },
    showUser(commentId) {
      this.showPostId = commentId;
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
    .topic {
      display: inline-block;
      margin-right: 25px;
    }
    .user {
      display: inline-block;
      padding: 5px;
      font-size: 12px;
      cursor: pointer;
    }
  }
  .title {
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    margin: 5px 0 10px 0;
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
