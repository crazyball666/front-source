<template>
  <div class="users-page">
    <div class="search-bar">
      <el-input v-model="search" placeholder="搜索用户" class="input-box">
      </el-input>
      <el-button type="primary" icon="el-icon-search" @click="updateList"
        >搜索</el-button
      >
    </div>
    <el-pagination
      class="pagination"
      background
      layout="prev, pager, next"
      :total="userCount"
      :current-page="currentPage"
      :page-size="pageSize"
      @current-change="pageDidChange"
    ></el-pagination>
    <el-table
      :data="userList"
      height="100%"
      empty-text="暂无数据"
      border
      v-loading="loading"
      class="table"
    >
      <el-table-column
        prop="uid"
        label="用户id"
        align="center"
        class-name="column-content"
      ></el-table-column>
      <el-table-column
        prop="platform"
        label="平台"
        align="center"
        class-name="column-content"
      ></el-table-column>
      <el-table-column
        prop="created_at"
        label="创建时间"
        align="center"
        class-name="column-content"
      ></el-table-column>
    </el-table>
  </div>
</template>

<script>
import serviceApi from "../../../api/service-go";
export default {
  data: () => {
    return {
      loading: false,
      userList: [],
      userCount: 0,
      currentPage: 1,
      pageSize: 20,
      search: "",
    };
  },
  async mounted() {
    await this.updateList();
  },
  methods: {
    updateList: async function () {
      this.loading = true;
      try {
        let res = await serviceApi.getCBAppUserList(
          this.currentPage - 1,
          this.pageSize,
          this.search
        );
        this.userList = res.data.users;
        this.userCount = res.data.count;
      } catch (err) {}
      this.loading = false;
    },
    pageDidChange: async function (page) {
      this.currentPage = page;
      await this.updateList();
    },
  },
};
</script>

<style lang="scss" scoped>
.users-page {
  padding: 20px 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.pagination {
  margin: 15px auto;
}
.search-bar {
  display: flex;
  justify-content: flex-end;
  .input-box {
    margin-right: 30px;
  }
}
.table {
  flex: 1;
  overflow: auto;
}
</style>
