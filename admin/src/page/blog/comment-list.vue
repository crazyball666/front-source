<template>
  <div class="tag-list">
    <h1 class="title">评论列表</h1>
    <el-table
      :data="commentList"
      empty-text="暂无数据"
      border
      v-loading="loading"
    >
      <el-table-column
        prop="pid"
        label="ID"
        align="center"
        class-name="column-content"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="article"
        label="文章"
        align="center"
        class-name="column-content"
      ></el-table-column>
      <el-table-column
        prop="nick_name"
        label="名称"
        align="center"
        class-name="column-content"
      ></el-table-column>
      <el-table-column
        prop="content"
        label="评论内容"
        align="center"
        class-name="column-content"
      ></el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        align="center"
        class-name="column-content"
      ></el-table-column>
      <el-table-column
        prop="created_at"
        label="评论时间"
        align="center"
        class-name="column-content"
      ></el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        align="center"
        class-name="column-content"
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.status == 0 ? 'danger' : 'success'">{{
            scope.row.status == 0 ? "未显示" : "已显示"
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop
        label="操作"
        align="center"
        class-name="column-content"
        width="120"
      >
        <template slot-scope="scope">
          <el-button
            @click="handleShow(scope.row.pid)"
            v-if="scope.row.status != 1"
            type="text"
            size="small"
            class="showBtn"
            >显示</el-button
          >
          <el-button
            @click="handleHide(scope.row.pid)"
            v-if="scope.row.status != 0"
            type="text"
            size="small"
            class="hideBtn"
            >隐藏</el-button
          >
          <el-button
            @click="handleDelete(scope.row.pid)"
            type="text"
            size="small"
            class="deleteBtn"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagination"
      background
      layout="prev, pager, next"
      :total="commentCount"
      :current-page="currentPage"
      @current-change="pageDidChange"
    ></el-pagination>
  </div>
</template>

<script>
import blogApi from "../../api/blog";

export default {
  data: () => {
    return {
      loading: false,
      commentList: [],
      commentCount: 0,
      currentPage: 1,
    };
  },
  async mounted() {
    this.loading = true;
    await this.updateList();
    this.loading = false;
  },
  methods: {
    updateList: async function () {
      this.loading = true;
      let res = await blogApi.getCommentList(this.currentPage - 1, 10);
      this.commentList = res.data.comments;
      this.commentCount = res.data.count;
      this.loading = false;
    },
    //handle
    pageDidChange: async function (page) {
      this.currentPage = page;
      await this.updateList();
    },
    handleShow: async function (pid) {
      this.loading = true;
      blogApi
        .showComment(pid)
        .then(() => this.updateList())
        .then((res) => {
          this.$message({
            type: "success",
            message: "显示成功!",
          });
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    handleHide: async function (pid) {
      this.loading = true;
      blogApi
        .hideComment(pid)
        .then(() => this.updateList())
        .then((res) => {
          this.$message({
            type: "success",
            message: "隐藏成功!",
          });
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    handleDelete: async function (pid) {
      this.$confirm("是否删除该标签?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.loading = true;
          return blogApi.deleteComment(pid);
        })
        .then(() => this.updateList())
        .then((res) => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 20px;
  margin-bottom: 20px;
}
.pagination {
  margin: 20px auto;
}
.deleteBtn {
  color: #f56c6c;
  &:hover {
    color: #ff3333;
  }
}
.showBtn {
  color: #33cc99;
  &:hover {
    color: #66ddbb;
  }
}
.hideBtn {
  color: #666;
  &:hover {
    color: #999;
  }
}
</style>