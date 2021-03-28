<template>
  <div class="module-detail-page">
    <div class="search-bar">
      <el-button
        type="danger"
        @click="$router.go(-1)"
        v-if="parseInt($route.query.parent_id) > 0"
        class="back-btn"
        >后退</el-button
      >
      <el-input v-model="search" placeholder="搜索配置项" class="input-box">
      </el-input>
      <el-button type="primary" icon="el-icon-search" @click="searchItem"
        >搜索</el-button
      >
      <el-button type="primary" @click="showAddItemDialog = true"
        >添加</el-button
      >
    </div>
    <p
      v-if="parseInt($route.query.parent_id) > 0"
      style="color: #909399; padding: 10px 0"
    >
      父配置：{{
        $route.path.replace(/\/service-go\/config\/module\/\d*\//, "")
      }}
    </p>
    <el-table
      :data="itemList"
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
        prop="key"
        label="key"
        align="center"
        class-name="column-content"
      ></el-table-column>
      <el-table-column
        prop="value"
        label="配置值"
        align="center"
        class-name="column-content"
      ></el-table-column>
      <el-table-column label="类型" align="center" class-name="column-content">
        <template slot-scope="scope">
          <span>{{ getValueType(scope.row.value_type) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150" align="center">
        <template slot-scope="scope">
          <el-button @click="onClickDetail(scope.row)" type="text" size="small"
            >查看</el-button
          >
          <el-button
            @click="onClickEditItem(scope.row)"
            type="text"
            size="small"
            >修改</el-button
          >
          <el-button
            type="text"
            size="small"
            style="color: #f56c6c"
            @click="onClickDeleteItem(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagination"
      background
      layout="prev, pager, next"
      :total="itemCount"
      :current-page="currentPage"
      :page-size="pageSize"
      @current-change="pageDidChange"
    ></el-pagination>

    <!-- 创建配置项弹窗 -->
    <el-dialog
      title="创建配置项"
      :visible.sync="showAddItemDialog"
      @closed="onCloseAddItemDialog"
      v-loading="loadingAddItemDialog"
    >
      <el-row type="flex" align="middle" class="input-row">
        <el-col :span="6" style="text-align: center">名称</el-col>
        <el-col :span="18"
          ><el-input v-model="formData.name"></el-input
        ></el-col>
      </el-row>
      <el-row type="flex" align="middle" class="input-row">
        <el-col :span="6" style="text-align: center">描述</el-col>
        <el-col :span="18"
          ><el-input v-model="formData.description"></el-input
        ></el-col>
      </el-row>
      <el-row type="flex" align="middle" class="input-row">
        <el-col :span="6" style="text-align: center">key</el-col>
        <el-col :span="18"><el-input v-model="formData.key"></el-input></el-col>
      </el-row>
      <el-row type="flex" align="middle" class="input-row">
        <el-col :span="6" style="text-align: center">value</el-col>
        <el-col :span="18"
          ><el-input v-model="formData.value"></el-input
        ></el-col>
      </el-row>
      <el-row type="flex" align="middle" class="input-row">
        <el-col :span="6" style="text-align: center">数据类型</el-col>
        <el-col :span="18">
          <el-select
            v-model="formData.value_type"
            placeholder="请选择"
            style="width: 100%"
          >
            <el-option
              v-for="(value, key) in valueTypeMap"
              :key="key"
              :label="`${key} - ${value}`"
              :value="key"
            >
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showAddItemDialog = false">取 消</el-button>
        <el-button type="primary" @click="onSubmitItem">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import serviceApi from "../../../api/service-go";
export default {
  data: function () {
    return {
      valueTypeMap: {
        0: "Null",
        1: "Number",
        2: "String",
        3: "Bool",
        4: "Array",
        5: "Object",
      },
      itemCount: 0,
      currentPage: 1,
      pageSize: 10,
      loading: false,
      itemList: [],
      search: "",
      showAddItemDialog: false,
      formData: {
        module_id: 0,
        parent_id: null,
        name: "",
        description: "",
        key: "",
        value: "",
        value_type: "0",
      },
      loadingAddItemDialog: false,
      selectedRowId: null,
      routeListener: null,
    };
  },
  mounted: async function () {
    this.resetFormData();
    this.updateList();
  },
  activated() {
    this.routeListener = this.$watch("$route", this.updateRoute);
  },
  deactivated() {
    if (this.routeListener) {
      this.routeListener();
    }
  },
  methods: {
    updateRoute(newVal, oldVal) {
      this.itemCount = 0;
      this.currentPage = 1;
      this.loading = false;
      this.itemList = [];
      this.search = "";
      this.showAddItemDialog = false;
      this.resetFormData();
      this.selectedRowId = false;
      this.loadingAddItemDialog = false;
      this.updateList();
    },
    resetFormData() {
      this.formData.module_id = parseInt(this.$route.params.id);
      this.formData.parent_id = parseInt(this.$route.query.parent_id);
      this.formData.name = "";
      this.formData.description = "";
      this.formData.key = "";
      this.formData.value = "";
      this.formData.value_type = "0";
    },
    updateList: async function () {
      this.loading = true;
      try {
        let res = await serviceApi.getConfigModuleItemList(
          this.$route.params.id,
          this.$route.query.parent_id,
          this.currentPage - 1,
          this.pageSize,
          this.search
        );
        this.itemList = res.data.items;
        this.itemCount = res.data.count;
      } catch (err) {}
      this.loading = false;
    },
    pageDidChange: async function (page) {
      this.currentPage = page;
      await this.updateList();
    },
    getValueType(type) {
      return this.valueTypeMap[type];
    },
    searchItem() {},
    onCloseAddItemDialog() {
      this.resetFormData();
      this.selectedRowId = false;
      this.showAddItemDialog = false;
    },
    async onSubmitItem() {
      if (
        !this.formData.module_id ||
        !this.formData.name ||
        !this.formData.description ||
        !this.formData.key ||
        !this.formData.value
      ) {
        this.$message.error("不能为空");
        return;
      }
      this.loadingAddItemDialog = true;
      try {
        if (this.selectedRowId) {
          // 更新
          await serviceApi.updateConfigItem(this.selectedRowId, this.formData);
          this.$message.success("更新成功");
        } else {
          //新增
          await serviceApi.addConfigItem(this.formData);
          this.$message.success("添加成功");
        }
        this.showAddItemDialog = false;
      } catch (err) {
        console.log(err);
      }
      this.loadingAddItemDialog = false;
      this.updateList();
    },
    async onClickEditItem(row) {
      this.showAddItemDialog = true;
      this.selectedRowId = row.id;
      this.formData.name = row.name;
      this.formData.description = row.description;
      this.formData.key = row.key;
      this.formData.value = row.value;
      this.formData.value_type = row.value_type.toString();
    },
    async onClickDeleteItem(row) {
      try {
        await this.$confirm("删除此配置？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
        await serviceApi.deleteConfigItem(row.id);
        this.$message.success("删除成功");
        this.updateList();
      } catch (err) {}
    },
    onClickDetail: async function (row) {
      this.$router.push({
        path: `${this.$route.path}/${row.key}`,
        query: { parent_id: row.id },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.search-bar {
  display: flex;
  justify-content: flex-end;
  .input-box {
    margin-right: 30px;
  }
  .back-btn {
    margin-right: 30px;
  }
  margin: 15px 0;
}
.pagination {
  text-align: center;
  margin: 10px auto;
}
.input-row {
  padding: 10px 0;
}
</style>
