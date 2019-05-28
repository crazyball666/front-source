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
    <hr class="line">
    <div class="comment-header">- 评论列表 -</div>
    <div class="comment-list">
      <div class="comment-add" @click="addComment">添加评论</div>
      <div v-bind:class="showCommentNew?'show-comment-new-warp':'comment-new-warp'">
        <textarea class="comment-new" v-model="commentContent" placeholder="请输入回复内容..."></textarea>
        <div class="btn-list">
          <el-button type="text" @click="cancel">取消</el-button>
          <el-button
            type="primary"
            size="mini"
            class="comfirm-btn"
            @click="sendComment"
            :loading="sending"
          >确认</el-button>
        </div>
      </div>
      <div class="comment-item" v-for="comment in commentList" :key="comment.id">
        <div class="comment-user" @click="showUser(comment.id)">
          <img class="comment-user-avator" :src="comment.user.avator">
          <div class="comment-user-name">{{comment.user.name}}</div>
        </div>
        <UserPop
          :show="comment.id == showCommentId"
          :userId="comment.user.id"
          @close="showCommentId=0"
        />
        <div class="right">
          <div class="comment-created-at">{{comment.created_at}}</div>
          <div class="comment-like">👍({{comment.like_count}})</div>
          <div class="comment-content">{{comment.content}}</div>
        </div>
      </div>
    </div>
    <el-pagination layout="prev, pager, next" :total="totalCommentCount" class="pagination"></el-pagination>
  </div>
</template>

<script>
import UserPop from "../components/userPop";
import api from "../common/api";
export default {
  props: ["id"],
  components: { UserPop },
  data() {
    return {
      post: null,
      commentList: [],
      showCommentNew: false,
      commentContent: "",
      sending: false,
      showCommentId: 0,
      totalCommentCount: 0
    };
  },
  async mounted() {
    api
      .postDetail(this.id)
      .then(res => {
        this.post = res.data;
      })
      .catch(err => {
        this.$message({
          message: "资源不存在",
          type: "error",
          center: true
        });
        this.$router.push({ path: "/" });
      });
    api.getCommentList(this.id).then(res => {
      this.commentList = res.data.rows;
      this.totalCommentCount = res.data.count;
    });
  },
  methods: {
    addComment() {
      this.showCommentNew = true;
    },
    cancel() {
      this.showCommentNew = false;
      this.commentContent = "";
    },
    sendComment() {
      this.sending = true;
      api
        .addComment(this.id, this.commentContent)
        .then(res => {
          this.$message({
            message: "回复成功",
            type: "success",
            center: true
          });
          this.commentContent = "";
          this.sending = false;
        })
        .then(() => {
          return api.getCommentList(this.id);
        })
        .then(res => {
          this.commentList = res.data.rows;
          this.totalCommentCount = res.data.count;
        })
        .catch(err => {
          this.sending = false;
        });
    },
    showUser(commentId) {
      this.showCommentId = commentId;
    }
  }
};
</script>

<style lang='scss'>
.post-detail {
  padding: 30px 50px 50px 50px;
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
    padding: 20px 15px;
  }
  .line {
    background: #ccc;
    height: 1px;
    border: none;
    margin: 30px 0;
  }
  .show-comment-new-warp {
    max-height: 150px;
    width: 80%;
    transition: all 0.5s ease;
    margin: 15px auto;
    overflow: hidden;
  }
  .comment-new-warp {
    width: 80%;
    max-height: 0;
    transition: all 0.5s ease;
    margin: 15px auto;
    overflow: hidden;
  }
  .comment-new {
    width: 100%;
    box-sizing: border-box;
    height: 100px;
    resize: none;
    padding: 8px;
  }
  .comment-add {
    text-align: right;
    padding: 0 15px;
    color: #0066ff;
    cursor: pointer;
  }
  .btn-list {
    text-align: right;
    .comfirm-btn {
      margin-left: 20px;
      display: inline-block;
    }
  }
  .comment-header {
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    padding: 15px 0;
  }
  .comment-item {
    padding: 15px;
    display: flex;
    border-bottom: 1px solid #ccc;
    .right {
      padding-top: 5px;
    }
  }
  .comment-created-at {
    display: inline-block;
    margin-right: 30px;
    color: #666;
    font-size: 12px;
  }
  .comment-like {
    display: inline-block;
    margin-right: 30px;
    cursor: pointer;
  }
  .comment-user {
    text-align: center;
    font-weight: bold;
    width: 80px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-right: 20px;
    cursor: pointer;
  }
  .comment-user-avator {
    height: 50px;
    width: 50px;
    border-radius: 50%;
    display: block;
    margin: 5px auto;
  }
  .comment-content {
    padding: 5px 0;
  }
  .pagination {
    margin-top: 60px;
    text-align: center;
  }
}
</style>
