<template>
  <div class="logs-page">
    <div class="search-bar">
      <el-input v-model="search" placeholder="搜索日志" class="input-box">
      </el-input>
      <el-button type="primary" icon="el-icon-search" @click="searchLog"
        >搜索</el-button
      >
    </div>
    <el-pagination
      class="pagination"
      background
      layout="prev, pager, next"
      :total="logCount"
      :current-page="currentPage"
      :page-size="pageSize"
      @current-change="pageDidChange"
    ></el-pagination>
    <el-table
      :data="logList"
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
        width="120"
      ></el-table-column>
      <el-table-column
        prop="platform"
        label="平台"
        align="center"
        class-name="column-content"
      ></el-table-column>
      <el-table-column
        prop="event"
        label="事件"
        align="center"
        class-name="column-content"
      ></el-table-column>
      <el-table-column
        prop="data"
        label="数据"
        align="center"
        class-name="column-content"
      ></el-table-column>
      <el-table-column
        prop="time"
        label="时间"
        align="center"
        class-name="column-content"
      ></el-table-column>
      <el-table-column
        prop="remark"
        label="附加信息"
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
      logList: [],
      logCount: 0,
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
        let res = await serviceApi.getCBAppLogsList(
          this.currentPage - 1,
          this.pageSize,
          this.search
        );
        this.logList = res.data.logs;
        this.logCount = res.data.count;
      } catch (err) {}
      this.loading = false;
    },
    pageDidChange: async function (page) {
      this.currentPage = page;
      await this.updateList();
    },
    searchLog: async function () {
      this.currentPage = 1;
      await this.updateList();
    },
  },
};
</script>

<style lang="scss" scoped>
.logs-page {
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
