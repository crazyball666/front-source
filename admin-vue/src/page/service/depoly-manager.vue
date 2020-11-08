<template>
  <div class="depoly-manager">
    <h1 class="title">部署管理</h1>
    <el-row type="flex" class="add-btn-row" justify="end">
      <el-button type="primary" @click="showDialog = true">新增/编辑项目设置</el-button>
    </el-row>
    <el-table :data="config" empty-text="暂无数据" border v-loading="loading">
      <el-table-column prop="name" label="项目名称" align="center" class-name="column-content"></el-table-column>
      <el-table-column prop="type" label="项目类型" align="center" class-name="column-content"></el-table-column>
      <el-table-column prop="path" label="项目路径" align="center" class-name="column-content"></el-table-column>
      <el-table-column prop="dependencies" label="项目依赖" align="center" class-name="column-content"></el-table-column>
      <el-table-column prop label="操作" align="center" class-name="column-content" width="150">
        <template slot-scope="scope">
          <el-button @click="handleRestart(scope.row.name)" type="text" size="small">重启</el-button>
          <el-button
            @click="handleDelete(scope.row.name)"
            type="text"
            size="small"
            class="deleteBtn"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 新增配置弹窗 -->
    <el-dialog
      title="新增/编辑设置"
      :visible="showDialog"
      width="420px"
      :center="true"
      @close="handleCloseDialog"
    >
      <p class="tips">- 以名称作为唯一索引，名称相同会覆盖旧的设置 -</p>
      <el-form :model="configForm" label-width="60px">
        <el-form-item label="名称：">
          <el-input v-model="configForm.name"></el-input>
        </el-form-item>
        <el-form-item label="类型：">
          <el-input v-model="configForm.type"></el-input>
        </el-form-item>
        <el-form-item label="路径：">
          <el-input v-model="configForm.path"></el-input>
        </el-form-item>
        <el-form-item label="依赖：">
          <el-input v-model="configForm.dependencies"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleAddConfig" :loading="loadingCreate">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import serviceApi from "../../api/service";
import { Message } from "element-ui";
export default {
  async mounted() {
    await this.getDepolyConfig();
  },
  data() {
    return {
      loading: false,
      config: [],
      showDialog: false,
      loadingCreate: false,
      configForm: {
        name: "",
        type: "",
        path: "",
        dependencies: ""
      }
    };
  },
  methods: {
    getDepolyConfig: async function() {
      this.loading = true;
      let res = await serviceApi.getDepolyConfig();
      let arr = [];
      for (const key in res.projects) {
        if (res.projects.hasOwnProperty(key)) {
          const item = res.projects[key];
          arr.push({
            name: key,
            type: item.type,
            path: item.path,
            dependencies: item.dependencies || "无"
          });
        }
      }
      this.config = arr;
      this.loading = false;
    },
    handleAddConfig: async function() {
      this.loadingCreate = true;
      let res = await serviceApi.addAndSetDepolyConfig(
        this.configForm.name,
        this.configForm.type,
        this.configForm.path,
        this.configForm.dependencies
      );
      if (res.message == "success") {
        Message.success("添加成功");
      }
      this.loadingCreate = false;
      this.showDialog = false;
      await this.getDepolyConfig();
    },
    handleCloseDialog: async function() {
      this.configForm = {
        name: "",
        type: "",
        path: "",
        dependencies: ""
      };
      this.showDialog = false;
    },
    handleDelete: function(name) {
      this.$confirm("是否删除该配置?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => serviceApi.deleteDepolyConfig(name))
        .then(res => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          return this.getDepolyConfig();
        })
        .catch(() => {});
    },
    handleRestart: function(name) {
      this.loading = true;
      serviceApi
        .restartProject(name)
        .then(res => {
          Message.success("操作完成，详情看邮件");
          this.loading = false;
        })
        .catch(err => {
          Message.error("失败：" + err);
          this.loading = false;
        });
    }
  }
};
</script>

<style lang='scss' scoped>
.title {
  font-size: 20px;
  margin-bottom: 20px;
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
  color: #999;
  font-size: 12px;
  margin: 15px 0;
}
</style>