<template>
  <div class="cb-app">
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      :default-active="this.$route.path"
      @select="selectMenu"
    >
      <el-menu-item v-for="item in menu" :key="item.url" :index="item.url">
        {{ item.title }}
      </el-menu-item>
    </el-menu>
    <keep-alive>
      <router-view class="cb-app-content"></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menu: [
        { title: "用户管理", url: "/service-go/cbapp/user" },
        { title: "日志查询", url: "/service-go/cbapp/logs" },
      ],
    };
  },
  mounted() {},
  methods: {
    selectMenu: function (key, keyPath) {
      if (this.$route.path != key) this.$router.push(key);
    },
  },
};
</script>

<style lang="scss" scoped>
.cb-app {
  height: 100%;
  display: flex;
  flex-direction: column;
  .cb-app-content {
    flex: 1;
  }
}
</style>
