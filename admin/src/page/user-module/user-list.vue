<template>
  <div class="user-list">
    <h1 class="title">用户管理</h1>
    <el-row type="flex" class="add-btn-row" justify="end">
      <el-button type="primary" @click="showDialog = true">新增用户</el-button>
    </el-row>
    <el-table :data="userList" empty-text="暂无数据" border v-loading="loading">
      <el-table-column prop="id" label="ID" align="center" class-name="column-content" width="150"></el-table-column>
      <el-table-column prop="account" label="账号" align="center" class-name="column-content"></el-table-column>
      <el-table-column prop="name" label="名称" align="center" class-name="column-content"></el-table-column>
      <el-table-column prop="roles" label="角色" align="center" class-name="column-content"></el-table-column>
      <el-table-column prop="powers" label="权限" align="center" class-name="column-content"></el-table-column>
      <el-table-column prop="created_at" label="创建时间" align="center" class-name="column-content"></el-table-column>
      <el-table-column prop label="操作" align="center" class-name="column-content" width="120">
        <template slot-scope="scope">
          <el-button
            @click="handleAssociate(scope.row)"
            type="text"
            size="small"
            class="associateBtn"
          >关联角色</el-button>
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
      :total="userCount"
      :current-page="currentPage"
      :page-size="pageSize"
      @current-change="pageDidChange"
    ></el-pagination>

    <!-- 新增用户弹窗 -->
    <el-dialog
      title="新增用户"
      :visible="showDialog"
      width="750px"
      :center="true"
      @close="handleCloseDialog"
    >
      <el-form :model="userForm" label-width="100px">
        <el-form-item label="账号：">
          <el-input v-model="userForm.account"></el-input>
        </el-form-item>
        <el-form-item label="名称：">
          <el-input v-model="userForm.name"></el-input>
        </el-form-item>
        <el-form-item label="密码：">
          <el-input v-model="userForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码：">
          <el-input v-model="userForm.comfirm_pass" type="password"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleAddUser" :loading="loadingCreate">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 关联角色弹窗 -->
    <el-dialog
      title="关联角色"
      :visible="showAssociateDialog"
      width="600px"
      :center="true"
      @close="handleCloseAssociateDialog"
    >
      <div class="tips">编辑用户：{{tempUser?tempUser.name:"UNKNOW"}}</div>
      <div class="role-list" v-loading="loadingRole">
        <div class="line"></div>
        <div class="role-box" v-for="role in roleList" :key="role.id">
          <span class="role-title">{{role.role}}</span>
          <el-switch
            v-model="role.select"
            active-color="#67C23A"
            inactive-color="#F56C6C"
            @change="handleSwitchChange(role)"
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
      loadingRole: false,
      loadingCreate: false,
      currentPage: 1,
      pageSize: 10,
      userList: [],
      userCount: 0,
      showDialog: false,
      showAssociateDialog: false,
      roleList: [],
      tempUser: null,
      userForm: {
        account: "",
        name: "",
        password: "",
        comfirm_pass: ""
      }
    };
  },
  async mounted() {
    await this.updateUserList();
  },
  methods: {
    updateUserList: async function() {
      this.loading = true;
      let res = await userApi.getUserList(this.currentPage - 1, this.pageSize);
      this.userCount = res.data.count;
      this.userList = res.data.users;
      this.loading = false;
    },
    pageDidChange: async function(page) {
      this.currentPage = page;
      await this.updateUserList();
    },
    handleAddUser: async function() {
      this.loadingCreate = true;
      userApi
        .createUser(this.userForm)
        .then(res => {
          this.handleCloseDialog();
          this.$message({ type: "success", message: "新建成功" });
          this.loadingCreate = false;
        })
        .then(() => this.updateUserList())
        .catch(err => {
          this.loadingCreate = false;
        });
    },
    handleCloseDialog: function() {
      this.userForm.account = "";
      this.userForm.name = "";
      this.userForm.password = "";
      this.userForm.comfirm_pass = "";
      this.showDialog = false;
    },
    handleDelete: function() {},
    handleAssociate: async function(user) {
      this.showAssociateDialog = true;
      this.loadingRole = true;
      this.tempUser = user;
      userApi
        .getAllRole()
        .then(res => {
          this.loadingRole = false;
          let hasRoles = (user.roles && user.roles.split(",")) || [];
          res.data.forEach(role => {
            role.select = hasRoles.includes(role.role);
          });
          this.roleList = res.data;
        })
        .catch(err => {
          this.loadingRole = false;
        });
    },
    handleCloseAssociateDialog: function() {
      this.showAssociateDialog = false;
      this.updateUserList();
    },
    handleSwitchChange: async function(role) {
      this.loadingRole = true;
      if (role.select) {
        // 创建关联
        userApi
          .addUserRoleRelation(this.tempUser.id, role.id)
          .then(res => {
            this.loadingRole = false;
          })
          .catch(err => {
            this.loadingRole = false;
            role.select = false;
          });
      } else {
        // 删除关联
        userApi
          .deleteUserRoleRelation(this.tempUser.id, role.id)
          .then(res => {
            this.loadingRole = false;
          })
          .catch(err => {
            this.loadingRole = false;
            role.select = true;
          });
      }
    }
  }
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
.tips {
  text-align: center;
  font-weight: bold;
  margin-bottom: 30px;
}
.role-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  position: relative;
  .role-box {
    width: 50%;
    box-sizing: border-box;
    padding: 15px 20px;
    display: flex;
    flex-direction: row;
    .role-title {
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