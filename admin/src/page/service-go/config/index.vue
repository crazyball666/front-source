<template>
  <div class="dynamic-config-module">
    <el-menu
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
        { title: "模块列表", url: "/service-go/config/moduleList" },
        { title: "接口测试", url: "/service-go/config/test" },
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

<style></style>
