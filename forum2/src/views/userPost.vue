<template>
  <div class="user-post">
    <div class="post-list" v-if="postList.length>0">
      <div class="post-item" v-for="post in postList" :key="post.id">
        <div class="title">{{post.title}}</div>
        <div class="post-info">
          <div class="like">赞:{{post.like_count}}</div>
          <div class="collect-count">收藏数：{{post.collect_count}}</div>
          <div class="time">时间：{{post.updated_at}}</div>
        </div>
        <div class="btn-group">
          <el-button type="primary" plain size="mini" @click="update(post.id)">修改</el-button>
          <el-button
            type="danger"
            plain
            size="mini"
            @click="deletePost(post.id)"
            :loading="deleting.indexOf(post.id)!==-1"
          >删除</el-button>
        </div>
      </div>
    </div>
    <div class="tips" v-else>暂无帖子</div>
  </div>
</template>

<script>
import api from "../common/api";
export default {
  data() {
    return {
      postList: [],
      deleting: []
    };
  },
  mounted() {
    api.getPostList(0, this.$route.params.id).then(res => {
      this.postList = res.data.rows;
    });
  },
  watch: {
    "$route.params.id": function(newV, oldV) {
      if (newV == oldV) return;
      api.getPostList(0, this.$route.params.id).then(res => {
        this.postList = res.data.rows;
      });
    }
  },
  methods: {
    update(id) {
      this.$router.push({ path: `/post/${id}/edit` });
    },
    deletePost(id) {
      this.deleting.push(id);
      api
        .deletePost(id)
        .then(res => {
          this.$message({ message: "删除成功", type: "success", center: true });
          this.deleting.splice(this.deleting.indexOf(id), "");
          return api.getPostList(0, this.$route.params.id);
        })
        .then(res => {
          this.postList = res.data.rows;
        });
    }
  }
};
</script>

<style lang='scss' scoped>
.post-list {
  padding: 20px 0;
}
.post-item {
  margin: 0 auto;
  width: 85%;
  padding: 20px;
  border-bottom: 1px solid #ccc;
  position: relative;
}
.title {
  font-size: 18px;
  font-weight: bold;
}
.like,
.collect-count,
.time {
  display: inline-block;
  margin-right: 30px;
  font-size: 12px;
  color: #999;
}
.btn-group {
  position: absolute;
  right: 0;
  top: 30px;
}
.tips {
  text-align: center;
  font-weight: bold;
  font-size: 20px;
  color: #999;
  padding: 50px 0;
}
</style>
