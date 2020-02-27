<template>
  <div class="role-list">
    <h1 class="title">角色管理</h1>
    <el-row type="flex" class="add-btn-row" justify="end">
      <el-button type="primary" @click="showDialog = true">新增角色</el-button>
    </el-row>
    <el-table :data="roleList" empty-text="暂无数据" border v-loading="loading">
      <el-table-column prop="id" label="ID" align="center" class-name="column-content" width="150"></el-table-column>
      <el-table-column prop="role" label="角色" align="center" class-name="column-content"></el-table-column>
      <el-table-column prop="powers" label="拥有权限" align="center" class-name="column-content"></el-table-column>
      <el-table-column prop="created_at" label="创建时间" align="center" class-name="column-content"></el-table-column>
      <el-table-column prop label="操作" align="center" class-name="column-content" width="120">
        <template slot-scope="scope">
          <el-button
            @click="handleAssociate(scope.row)"
            type="text"
            size="small"
            class="associateBtn"
          >关联权限</el-button>
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
      :total="roleCount"
      :current-page="currentPage"
      :page-size="pageSize"
      @current-change="pageDidChange"
    ></el-pagination>

    <!-- 新增角色弹窗 -->
    <el-dialog
      title="新增角色"
      :visible="showDialog"
      width="350px"
      :center="true"
      @close="handleCloseDialog"
    >
      <el-form :model="roleForm" label-width="100px">
        <el-form-item label="角色名称：">
          <el-input v-model="roleForm.role"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleAddRole" :loading="loadingCreate">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 关联权限弹窗 -->
    <el-dialog
      title="关联权限"
      :visible="showAssociateDialog"
      width="600px"
      :center="true"
      @close="handleCloseAssociateDialog"
    >
      <div class="tips">编辑角色：{{tempRole?tempRole.role:"UNKNOW"}}</div>
      <div class="power-list" v-loading="loadingPower">
        <div class="line"></div>
        <div class="power-box" v-for="power in powerList" :key="power.id">
          <span class="power-title">{{power.power}}</span>
          <el-switch
            v-model="power.select"
            active-color="#67C23A"
            inactive-color="#F56C6C"
            @change="handleSwitchChange(power)"
          ></el-switch>
        </div>
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
      loadingPower: false,
      loadingCreate: false,
      currentPage: 1,
      pageSize: 10,
      roleList: [],
      roleCount: 0,
      showDialog: false,
      showAssociateDialog: false,
      powerList: [],
      tempRole: null,
      roleForm: {
        role: ""
      }
    };
  },
  async mounted() {
    await this.updateRoleList();
  },
  methods: {
    updateRoleList: async function() {
      this.loading = true;
      let res = await userApi.getRoleList(this.currentPage - 1, this.pageSize);
      this.roleCount = res.data.count;
      this.roleList = res.data.roles;
      this.loading = false;
    },
    pageDidChange: async function(page) {
      this.currentPage = page;
      await this.updateRoleList();
    },
    handleAddRole: async function() {
      this.loadingCreate = true;
      userApi
        .createRole(this.roleForm)
        .then(res => {
          this.handleCloseDialog();
          this.$message({ type: "success", message: "新建成功" });
          this.loadingCreate = false;
        })
        .then(() => this.updateRoleList())
        .catch(err => {
          this.loadingCreate = false;
        });
    },
    handleCloseDialog: function() {
      this.roleForm.role = "";
      this.showDialog = false;
    },
    handleDelete: function(roleId) {
      this.$confirm("是否删除该角色?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => userApi.deleteRole(roleId))
        .then(res => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.loading = true;
          return this.updateRoleList();
        })
        .then(() => {
          this.loading = false;
        })
        .catch(() => {});
    },
    handleAssociate: async function(role) {
      this.showAssociateDialog = true;
      this.loadingPower = true;
      this.tempRole = role;
      userApi
        .getAllPower()
        .then(res => {
          this.loadingPower = false;
          let hasPowers = (role.powers && role.powers.split(",")) || [];
          res.data.forEach(power => {
            power.select = hasPowers.includes(power.power);
          });
          this.powerList = res.data;
        })
        .catch(err => {
          this.loadingPower = false;
        });
    },
    handleCloseAssociateDialog: function() {
      this.showAssociateDialog = false;
      this.updateRoleList();
    },
    handleSwitchChange: async function(power) {
      this.loadingPower = true;
      if (power.select) {
        // 创建关联
        userApi
          .addRolePowerRelation(this.tempRole.id, power.id)
          .then(res => {
            this.loadingPower = false;
          })
          .catch(err => {
            this.loadingPower = false;
            power.select = false;
          });
      } else {
        // 删除关联
        userApi
          .deleteRolePowerRelation(this.tempRole.id, power.id)
          .then(res => {
            this.loadingPower = false;
          })
          .catch(err => {
            this.loadingPower = false;
            power.select = true;
          });
      }
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
.tips {
  text-align: center;
  font-weight: bold;
  margin-bottom: 30px;
}
.power-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  position: relative;
  .power-box {
    width: 50%;
    box-sizing: border-box;
    padding: 15px 20px;
    display: flex;
    flex-direction: row;
    .power-title {
      flex: 1;
    }
  }
  .line {
    background: #999;
    position: absolute;
    width: 1px;
    left: 50%;
    height: 100%;
  }
}
</style>