<template>
  <div class="config-module-page">
    <div class="search-bar">
      <el-input v-model="search" placeholder="搜索模块" class="input-box">
      </el-input>
      <el-button type="primary" icon="el-icon-search" @click="searchModule"
        >搜索</el-button
      >
      <el-button type="primary" @click="showDialog = true">添加</el-button>
    </div>
    <el-table
      :data="moduleList"
      empty-text="暂无数据"
      border
      v-loading="loading"
      class="table"
    >
      <el-table-column
        prop="id"
        label="id"
        align="center"
        class-name="column-content"
      ></el-table-column>
      <el-table-column
        prop="name"
        label="名称"
        align="center"
        class-name="column-content"
      ></el-table-column>
      <el-table-column
        prop="description"
        label="描述"
        align="center"
        class-name="column-content"
      ></el-table-column>
      <el-table-column
        prop="created_at"
        label="创建时间"
        align="center"
        class-name="column-content"
      ></el-table-column>
      <el-table-column label="操作" width="150" align="center">
        <template slot-scope="scope">
          <el-button @click="onClickDetail(scope.row)" type="text" size="small"
            >查看</el-button
          >
          <el-button
            @click="onClickEditModule(scope.row)"
            type="text"
            size="small"
            >修改</el-button
          >
          <el-button
            type="text"
            size="small"
            style="color: #f56c6c"
            @click="onClickDeleteModule(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagination"
      background
      layout="prev, pager, next"
      :total="moduleCount"
      :current-page="currentPage"
      :page-size="pageSize"
      @current-change="pageDidChange"
    ></el-pagination>
    <!-- 创建模块弹窗 -->
    <el-dialog
      :title="selectedRowId ? '修改模块' : '创建模块'"
      :visible.sync="showDialog"
      @closed="onCloseDialog"
      v-loading="loadingDialog"
    >
      <el-row type="flex" align="middle" class="input-row">
        <el-col :span="6" style="text-align: center">模块名</el-col>
        <el-col :span="18"><el-input v-model="name"></el-input></el-col>
      </el-row>
      <el-row type="flex" align="middle" class="input-row">
        <el-col :span="6" style="text-align: center">描述</el-col>
        <el-col :span="18"><el-input v-model="description"></el-input></el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false">取 消</el-button>
        <el-button type="primary" @click="onClickAddModule">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import serviceApi from "../../../api/service-go";
export default {
  data: () => {
    return {
      moduleCount: 0,
      currentPage: 1,
      pageSize: 20,
      loading: false,
      moduleList: [],
      search: "",
      showDialog: false,
      name: "",
      description: "",
      loadingDialog: false,
      selectedRowId: null,
    };
  },
  mounted: async function () {
    await this.updateList();
  },
  methods: {
    updateList: async function () {
      this.loading = true;
      try {
        let res = await serviceApi.getConfigModuleList(
          this.currentPage - 1,
          this.pageSize,
          this.search
        );
        this.moduleList = res.data.modules;
        this.moduleCount = res.data.count;
      } catch (err) {}
      this.loading = false;
    },
    searchModule: async function () {},
    pageDidChange: async function (page) {
      this.currentPage = page;
      await this.updateList();
    },
    onClickDetail: async function (row) {
      this.$router.push({
        path: "/service-go/config/module/" + row.id,
        query: { parent_id: 0 },
      });
    },
    onCloseDialog: function () {
      this.name = "";
      this.description = "";
      this.selectedRowId = null;
    },
    onClickAddModule: async function () {
      if (!this.name || !this.description) {
        this.$message.error("不能为空");
        return;
      }
      this.loadingDialog = true;
      try {
        if (this.selectedRowId) {
          //更新
          await serviceApi.updateConfigModule(
            this.selectedRowId,
            this.name,
            this.description
          );
          this.$message.success("更新成功");
        } else {
          //新增
          await serviceApi.createConfigModule(this.name, this.description);
          this.$message.success("添加成功");
        }
        this.showDialog = false;
      } catch (err) {
        console.log(err);
      }
      this.loadingDialog = false;
      this.updateList();
    },
    onClickDeleteModule: async function (row) {
      try {
        await this.$confirm("删除此模块？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
        await serviceApi.deleteConfigModule(row.id);
        this.$message.success("删除成功");
        this.updateList();
      } catch (err) {}
    },
    onClickEditModule: async function (row) {
      this.showDialog = true;
      this.selectedRowId = row.id;
      this.name = row.name;
      this.description = row.description;
    },
  },
};
</script>

<style lang="scss" scoped>
.config-module-page {
  padding: 20px 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.pagination {
  margin: 10px auto;
}
.search-bar {
  display: flex;
  justify-content: flex-end;
  .input-box {
    margin-right: 30px;
  }
  margin-bottom: 15px;
}
.table {
  flex: 1;
  overflow: auto;
}
.input-row {
  padding: 10px 0;
}
</style>
