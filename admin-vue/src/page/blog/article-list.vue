<template>
  <div class="article-list">
    <h1 class="title">文章列表</h1>
    <el-row type="flex" class="add-btn-row" justify="end">
      <el-button type="primary" @click="handleAddArticle">新增文章</el-button>
    </el-row>
    <el-table
      :data="articleList"
      empty-text="暂无数据"
      border
      v-loading="loading"
    >
      <el-table-column
        prop="pid"
        label="ID"
        align="center"
        class-name="column-content"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        align="center"
        class-name="column-content"
      ></el-table-column>
      <el-table-column
        prop="tags"
        label="标签"
        align="center"
        class-name="column-content"
      >
        <template slot-scope="scope">
          <el-tag type="primary" v-for="tag in scope.row.tags" :key="tag.pid">{{
            tag.content
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="read_count"
        label="阅读数"
        align="center"
        class-name="column-content"
        width="80"
      ></el-table-column>
      <el-table-column
        prop="like_count"
        label="点赞数"
        align="center"
        class-name="column-content"
        width="80"
      ></el-table-column>
      <el-table-column
        prop="created_at"
        label="创建时间"
        align="center"
        class-name="column-content"
      ></el-table-column>
      <el-table-column
        prop="statusStr"
        label="状态"
        align="center"
        class-name="column-content"
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.status == 0 ? 'danger' : 'success'">{{
            scope.row.statusStr
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop
        label="操作"
        align="center"
        class-name="column-content"
        width="150"
      >
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.row.pid)" type="text" size="small"
            >编辑</el-button
          >
          <el-button
            @click="handleDelete(scope.row.pid)"
            type="text"
            size="small"
            class="deleteBtn"
            >删除</el-button
          >
          <el-button
            @click="handlePublish(scope.row.pid)"
            v-if="scope.row.status != 1"
            type="text"
            size="small"
            class="publishBtn"
            >发布</el-button
          >
          <el-button
            @click="handleUnPublish(scope.row.pid)"
            v-if="scope.row.status != 0"
            type="text"
            size="small"
            class="unpublishBtn"
            >隐藏</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagination"
      background
      layout="prev, pager, next"
      :total="articleCount"
      :current-page="currentPage"
      @current-change="pageDidChange"
    ></el-pagination>
  </div>
</template>

<script>
import blogApi from "../../api/blog";

const statusMap = {
  0: "未发布",
  1: "已发布",
};

export default {
  data: () => {
    return {
      loading: false,
      articleList: [],
      articleCount: 0,
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
      let res = await blogApi.getArticleList(this.currentPage - 1, 10);
      this.articleList = res.data.articles;
      this.articleList.forEach((article) => {
        // article.tags = article.tags.map((e) => e.content).join(", ");
        article.statusStr = statusMap[article.status] || "未知";
      });
      this.articleCount = res.data.count;
    },
    //handle
    pageDidChange: async function (page) {
      this.loading = true;
      this.currentPage = page;
      await this.updateList();
      this.loading = false;
    },
    handleEdit: function (pid) {
      this.$router.push(`/blog/article-edit/${pid}`);
    },
    handleDelete: function (pid) {
      this.$confirm("是否删除该文章?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.loading = true;
          return blogApi.deleteArticle(pid);
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
    handleAddArticle: function () {
      this.$router.push("/blog/article-add");
    },
    handlePublish: function (pid) {
      this.loading = true;
      blogApi
        .publishArticle(pid)
        .then(() => this.updateList())
        .then((res) => {
          this.$message({
            type: "success",
            message: "发布成功!",
          });
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    handleUnPublish: function (pid) {
      this.loading = true;
      blogApi
        .unpublishArticle(pid)
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
.add-btn-row {
  margin-bottom: 20px;
}
.deleteBtn {
  color: #f56c6c;
  &:hover {
    color: #ff3333;
  }
}
.publishBtn {
  color: #33cc99;
  &:hover {
    color: #66ddbb;
  }
}
.unpublishBtn {
  color: #666;
  &:hover {
    color: #999;
  }
}
</style>
