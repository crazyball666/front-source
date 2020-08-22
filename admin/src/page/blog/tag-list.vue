<template>
  <div class="tag-list">
    <h1 class="title">标签列表</h1>
    <el-row type="flex" class="add-btn-row" justify="end">
      <el-button type="primary" @click="handleAddTag">新增标签</el-button>
    </el-row>
    <el-table :data="tagList" empty-text="暂无数据" border v-loading="loading">
      <el-table-column
        prop="p_id"
        label="ID"
        align="center"
        class-name="column-content"
        width="150"
      ></el-table-column>
      <el-table-column prop="content" label="标签" align="center" class-name="column-content"></el-table-column>
      <el-table-column prop="created_at" label="创建时间" align="center" class-name="column-content"></el-table-column>
      <el-table-column prop label="操作" align="center" class-name="column-content" width="120">
        <template slot-scope="scope">
          <el-button
            @click="handleDelete(scope.row.p_id)"
            type="text"
            size="small"
            class="deleteBtn"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagination"
      background
      layout="prev, pager, next"
      :total="tagCount"
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
      tagList: [],
      tagCount: 0,
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
      let res = await blogApi.getTagList(this.currentPage - 1, 10);
      this.tagList = res.data.tags;
      this.tagCount = res.data.count;
    },
    //handle
    pageDidChange: async function (page) {
      this.currentPage = page;
      await this.updateList();
    },
    handleEdit: function (pid) {
      // this.$router.push(`/article-edit/${pid}`);
    },
    handleDelete: function (pid) {
      this.$confirm("是否删除该标签?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => blogApi.deleteTag(pid))
        .then((res) => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.loading = true;
          return this.updateList();
        })
        .then(() => {
          this.loading = false;
        })
        .catch(() => {});
    },
    handleAddTag: function () {
      this.$prompt("请输入新标签", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(({ value }) => blogApi.createTag({ content: value }))
        .then((data) => {
          this.$message({
            type: "success",
            message: "创建成功",
          });
          this.loading = true;
          return this.updateList();
        })
        .then(() => {
          this.loading = false;
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang='scss' scoped>
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
</style>