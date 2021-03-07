<template>
  <div class="verify-list">
    <h1 class="title">权鉴管理</h1>
    <el-row type="flex" class="add-btn-row" justify="end">
      <el-button type="primary" @click="handleShowDialog(1, null)"
        >新增权鉴</el-button
      >
    </el-row>
    <el-table
      :data="verifyList"
      empty-text="暂无数据"
      border
      v-loading="loading"
    >
      <el-table-column
        prop="app"
        label="App"
        align="center"
        class-name="column-content"
      ></el-table-column>
      <el-table-column
        prop="method"
        label="请求方法"
        align="center"
        class-name="column-content"
      ></el-table-column>
      <el-table-column
        prop="path"
        label="路径"
        align="center"
        class-name="column-content"
      ></el-table-column>
      <el-table-column
        prop
        label="操作"
        align="center"
        class-name="column-content"
        width="120"
      >
        <template slot-scope="scope">
          <el-button
            @click="handleShowDialog(2, scope.row.id)"
            type="text"
            size="small"
            class="editBtn"
            >修改</el-button
          >
          <el-button
            @click="handleDelete(scope.row.id)"
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
      :total="verifyCount"
      :current-page="currentPage"
      :page-size="pageSize"
      @current-change="pageDidChange"
    ></el-pagination>

    <!-- 新增修改弹窗 -->
    <el-dialog
      :title="dialogTitle"
      :visible="showDialog"
      width="960px"
      :center="true"
      @close="handleCloseDialog"
    >
      <div v-loading="loadingDialog">
        <el-form :model="dialogForm" label-width="100px">
          <el-form-item label="App：">
            <el-input v-model="dialogForm.app"></el-input>
          </el-form-item>
          <el-form-item label="请求方法：">
            <el-input v-model="dialogForm.method"></el-input>
          </el-form-item>
          <el-form-item label="路径">
            <el-input v-model="dialogForm.path"></el-input>
          </el-form-item>
        </el-form>
        <div v-if="dialogForm.id" style="margin-top: 50px; padding: 0 30px">
          <el-divider>规则列表</el-divider>
          <div style="margin-bottom: 10px">
            <el-button
              type="primary"
              round
              @click="onOpenRuleDialog(1, null)"
              size="mini"
              >添加规则</el-button
            >
          </div>
          <el-table :data="dialogForm.rules" style="width: 100%">
            <el-table-column
              prop
              label="操作"
              align="center"
              class-name="column-content"
              width="140"
            >
              <template slot-scope="scope">
                {{ ruleType[scope.row.type] || "未知" }}
              </template>
            </el-table-column>
            <el-table-column prop="value" label="内容"> </el-table-column>
            <el-table-column
              prop
              label="操作"
              align="center"
              class-name="column-content"
              width="120"
            >
              <template slot-scope="scope">
                <el-button
                  @click="onOpenRuleDialog(2, scope.row)"
                  type="text"
                  size="small"
                  class="editBtn"
                  >修改</el-button
                >
                <el-button
                  @click="onDeleteRule(scope.row.id)"
                  type="text"
                  size="small"
                  class="deleteBtn"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="handleSubmitDialog"
          :loading="loadingDialog"
          round
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <!-- 规则弹窗 -->
    <el-dialog
      :title="ruleDialogTitle"
      :visible="showRuleDialog"
      width="750px"
      :center="true"
      @close="onCloseRuleDialog"
    >
      <el-form
        :model="ruleForm"
        label-width="100px"
        v-loading="loadingRuleDialog"
      >
        <el-form-item label="类型：">
          <el-select v-model="ruleForm.type" placeholder="请选择">
            <el-option
              v-for="(value, key) in ruleType"
              :key="key"
              :label="value"
              :value="key"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="内容：">
          <el-input
            v-model="ruleForm.value"
            type="textarea"
            :rows="5"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="onSubmitRule"
          :loading="loadingRuleDialog"
          round
          >确 定</el-button
        >
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
      currentPage: 1,
      pageSize: 10,
      verifyList: [],
      verifyCount: 0,
      //弹窗
      showDialog: false,
      dialogTitle: "",
      loadingDialog: false,
      dialogForm: {
        id: null,
        app: "",
        method: "",
        path: "",
        rules: [],
      },
      // 规则弹窗
      ruleType: {
        1: "权限控制",
        2: "ip白名单",
        3: "ip黑名单",
      },
      showRuleDialog: false,
      ruleDialogTitle: "",
      loadingRuleDialog: false,
      ruleForm: {
        id: null,
        verfiyId: null,
        type: null,
        value: "",
      },
    };
  },
  async mounted() {
    await this.updateVerifyList();
  },
  methods: {
    updateVerifyList: async function () {
      this.loading = true;
      let res = await userApi.getVerifyList(
        this.currentPage - 1,
        this.pageSize
      );
      this.verifyCount = res.data.count;
      this.verifyList = res.data.data;
      this.loading = false;
    },
    pageDidChange: async function (page) {
      this.currentPage = page;
      await this.updateVerifyList();
    },

    handleDelete: function (id) {
      this.$confirm("是否删除该角色?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => userApi.deleteVerify(id))
        .then((res) => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.loading = true;
          return this.updateVerifyList();
        })
        .then(() => {
          this.loading = false;
        })
        .catch(() => {});
    },

    // 添加修改弹窗相关
    handleShowDialog: async function (type, id) {
      this.resetDialogForm();
      this.showDialog = true;
      if (type == 1) {
        this.dialogTitle = "新增权鉴";
      } else {
        this.dialogTitle = "修改权鉴";
        this.dialogForm.id = id;
        await this.getVerifyDetail(id);
      }
    },
    handleCloseDialog: function () {
      this.showDialog = false;
    },
    resetDialogForm: function () {
      this.dialogForm.id = null;
      this.dialogForm.app = "";
      this.dialogForm.method = "";
      this.dialogForm.path = "";
      this.dialogForm.rules = [];
    },
    getVerifyDetail: async function (id) {
      this.loadingDialog = true;
      try {
        let res = await userApi.getVerifyDetail(id);
        this.dialogForm.app = res.data.app;
        this.dialogForm.method = res.data.method;
        this.dialogForm.path = res.data.path;
        this.dialogForm.rules = res.data.rules;
      } catch (err) {}
      this.loadingDialog = false;
    },
    handleSubmitDialog: async function () {
      this.loadingDialog = true;
      try {
        if (this.dialogForm.id) {
          await userApi.updateVerify({
            id: this.dialogForm.id,
            app: this.dialogForm.app,
            method: this.dialogForm.method,
            path: this.dialogForm.path,
          });
          this.$message({ type: "success", message: "更新成功" });
          this.handleCloseDialog();
          this.updateVerifyList();
        } else {
          await userApi.createVerify({
            app: this.dialogForm.app,
            method: this.dialogForm.method,
            path: this.dialogForm.path,
          });
          this.$message({ type: "success", message: "新建成功" });
          this.handleCloseDialog();
          this.updateVerifyList();
        }
      } catch (err) {}
      this.loadingDialog = false;
    },
    // 规则弹窗相关
    onOpenRuleDialog: function (type, row) {
      this.resetRuleForm();
      this.ruleForm.verfiyId = this.dialogForm.id;
      if (type == 1) {
        this.ruleDialogTitle = "新增规则";
      } else {
        this.ruleDialogTitle = "修改规则";
        this.ruleForm.id = row.id;
        this.ruleForm.type = `${row.type}`;
        this.ruleForm.value = row.value;
      }
      this.showRuleDialog = true;
    },
    onCloseRuleDialog: function () {
      this.showRuleDialog = false;
    },
    resetRuleForm: function () {
      this.ruleForm.id = null;
      this.ruleForm.verfiyId = null;
      this.ruleForm.type = null;
      this.ruleForm.value = "";
    },
    onSubmitRule: async function () {
      this.loadingRuleDialog = true;
      try {
        if (this.ruleForm.id) {
          await userApi.updateVerifyRule({
            id: this.ruleForm.id,
            type: parseInt(this.ruleForm.type),
            value: this.ruleForm.value,
          });
          this.$message({ type: "success", message: "更新成功" });
          this.onCloseRuleDialog();
          this.getVerifyDetail(this.dialogForm.id);
        } else {
          await userApi.addVerifyRule({
            verifyId: this.ruleForm.verfiyId,
            type: parseInt(this.ruleForm.type),
            value: this.ruleForm.value,
          });
          this.$message({ type: "success", message: "新建成功" });
          this.onCloseRuleDialog();
          this.getVerifyDetail(this.dialogForm.id);
        }
      } catch (err) {
        console.error(err);
      }
      this.loadingRuleDialog = false;
    },
    onDeleteRule: async function (id) {
      this.$confirm("是否删除该规则?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => userApi.deleteVerifyRule(id))
        .then((res) => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.loadingDialog = true;
          this.getVerifyDetail(this.dialogForm.id);
        })
        .then(() => {
          this.loadingDialog = false;
        })
        .catch(() => {});
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
</style>
