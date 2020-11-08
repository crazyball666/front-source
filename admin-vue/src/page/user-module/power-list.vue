<template>
  <div class="power-list">
    <h1 class="title">权限管理</h1>
    <el-row type="flex" class="add-btn-row" justify="end">
      <el-button type="primary" @click="showDialog = true">新增权限</el-button>
    </el-row>
    <el-table :data="powerList" empty-text="暂无数据" border v-loading="loading">
      <el-table-column prop="id" label="ID" align="center" class-name="column-content" width="150"></el-table-column>
      <el-table-column prop="power" label="权限" align="center" class-name="column-content"></el-table-column>
      <el-table-column prop="roles" label="所属角色" align="center" class-name="column-content"></el-table-column>
      <el-table-column prop="created_at" label="创建时间" align="center" class-name="column-content"></el-table-column>
      <el-table-column prop label="操作" align="center" class-name="column-content" width="120">
        <template slot-scope="scope">
          <el-button
            @click="handleDelete(scope.row.id)"
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
      :total="powerCount"
      :current-page="currentPage"
      :page-size="pageSize"
      @current-change="pageDidChange"
    ></el-pagination>

    <!-- 新增权限弹窗 -->
    <el-dialog
      title="新增权限"
      :visible="showDialog"
      width="350px"
      :center="true"
      @close="handleCloseDialog"
    >
      <el-form :model="powerForm" label-width="100px">
        <el-form-item label="权限名称：">
          <el-input v-model="powerForm.power"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleAddPower" :loading="loadingCreate">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import userApi from "../../api/user";
export default {
  data() {
    return {
      loading: false,
      loadingCreate: false,
      currentPage: 1,
      pageSize: 10,
      powerList: [],
      powerCount: 0,
      showDialog: false,
      powerForm: {
        power: ""
      }
    };
  },
  async mounted() {
    await this.updatePowerList();
  },
  methods: {
    updatePowerList: async function() {
      this.loading = true;
      let res = await userApi.getPowerList(this.currentPage - 1, this.pageSize);
      this.powerCount = res.data.count;
      this.powerList = res.data.powers;
      this.loading = false;
    },
    pageDidChange: async function(page) {
      this.currentPage = page;
      await this.updatePowerList();
    },
    handleAddPower: async function() {
      this.loadingCreate = true;
      userApi
        .createPower(this.powerForm)
        .then(res => {
          this.handleCloseDialog();
          this.$message({ type: "success", message: "新建成功" });
          this.loadingCreate = false;
        })
        .then(() => this.updatePowerList())
        .catch(err => {
          this.loadingCreate = false;
        });
    },
    handleCloseDialog: function() {
      this.powerForm.power = "";
      this.showDialog = false;
    },
    handleDelete: function(id) {
      this.$confirm("是否删除该权限?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => userApi.deletePower(id))
        .then(res => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.loading = true;
          return this.updatePowerList();
        })
        .then(() => {
          this.loading = false;
        })
        .catch(() => {});
    }
  }
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