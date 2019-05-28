<template>
  <div class="user-center">
    <div class="title">个人中心</div>
    <div class="line"></div>
    <el-tabs v-model="activeName" @tab-click="handleClick" class="tab-list">
      <el-tab-pane label="个人信息" name="info"></el-tab-pane>
      <el-tab-pane label="我的帖子" name="post"></el-tab-pane>
      <el-tab-pane label="我的关注" name="follow"></el-tab-pane>
      <el-tab-pane label="我的粉丝" name="fans"></el-tab-pane>
      <el-tab-pane label="我的收藏" name="collection"></el-tab-pane>
    </el-tabs>
    <router-view class="content"/>
  </div>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      activeName: "info"
    };
  },
  methods: {
    detail(path) {
      this.$router.push({ path: `/user/${this.id}/${path}` });
    },
    handleClick() {
      this.$router.push({ path: `/user/${this.id}/${this.activeName}` });
    }
  }
};
</script>

<style lang='scss' scoped>
.user-center {
  width: 800px;
  padding-bottom: 20px;
  box-shadow: 0 0 15px 0 #ccc;
  border-radius: 8px;
}
.title {
  font-size: 28px;
  font-weight: bold;
  padding: 30px 30px 10px;
}
.line {
  height: 5px;
  width: 240px;
  margin-left: 30px;
  background: #0b6796;
  margin-bottom: 30px;
}
.tab-list {
  padding: 0 30px;
}
.content {
  padding: 30px;
}
</style>
