<template>
  <div class="config-test-page" v-loading="loading">
    <div>
      <el-row type="flex" align="middle" class="input-row">
        <el-col :span="6" style="text-align: center">模块</el-col>
        <el-col :span="18"><el-input v-model="module"></el-input></el-col>
      </el-row>
      <el-row type="flex" align="middle" class="input-row">
        <el-col :span="6" style="text-align: center">配置keys</el-col>
        <el-col :span="18"><el-input v-model="keys"></el-input></el-col>
      </el-row>
      <el-button
        type="primary"
        style="margin: 30px auto; display: block"
        @click="test"
        >发送</el-button
      >
    </div>
    <pre class="result" v-if="result.length > 0">{{ result }}</pre>
  </div>
</template>

<script>
import serviceApi from "../../../api/service-go";
export default {
  data() {
    return {
      loading: false,
      module: "",
      keys: "",
      result: "",
    };
  },
  methods: {
    async test() {
      if (!this.module || !this.keys) {
        this.$message.error("不能为空");
        return;
      }
      this.loading = true;
      try {
        let res = await serviceApi.configTest(this.module, this.keys);
        this.result = JSON.stringify(res, null, 1);
      } catch (err) {}
      this.loading = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.input-row {
  padding: 10px 0;
}
.result {
  display: block;
  padding: 20px;
  border-radius: 10px;
  background: #333;
  width: 80%;
  margin: 0 auto;
  overflow: auto;
  color: #fff;
}
</style>
