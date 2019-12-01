<template>
  <div class="base">
    <div class="header"></div>
    <div class="container">
      <div class="mune-box">
        <el-menu
          default-active="1-1"
          class="mune"
          @open="handleOpen"
          @close="handleClose"
          background-color="#666"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu index="1">
            <span slot="title">Blog系统</span>
            <el-menu-item index="1-1">文章管理</el-menu-item>
            <el-menu-item index="1-2">评论管理</el-menu-item>
            <el-menu-item index="1-3">系统管理</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <span slot="title">系统</span>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
            <el-menu-item index="2-3">选项3</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <span slot="title">系统</span>
            <el-menu-item index="3-1">选项1</el-menu-item>
            <el-menu-item index="3-2">选项2</el-menu-item>
            <el-menu-item index="3-3">选项3</el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
      <div class="content"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {};
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style lang="scss" scoped>
.base {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
}
.header {
  background: #333;
  height: 60px;
}
.container {
  flex: 1;
  display: flex;
}
.mune-box,
.mune {
  width: 200px;
  height: 100%;
  background: #666;
}
.content {
  background: red;
  height: 100%;
  flex: 1;
}
</style>
