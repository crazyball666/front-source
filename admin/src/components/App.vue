<template>
  <div class="base">
    <div class="header">
      <p class="user-name" @mouseover="showPop=true" @mouseout="showPop=false">欢迎，{{name}}</p>
      <div v-show="showPop" class="popover" @mouseover="showPop=true" @mouseout="showPop=false">
        <p>ID：{{userId}}</p>
        <p>账号：{{account}}</p>
        <p>角色：{{roles ? roles : "无"}}</p>
        <el-button type="danger" size="small" @click="logout">登出</el-button>
      </div>
    </div>
    <div class="container">
      <div class="mune-box">
        <el-menu
          class="mune"
          @select="handleSelect"
          background-color="#666"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu index="1">
            <span slot="title">Blog系统</span>
            <el-menu-item index="1-1">文章管理</el-menu-item>
            <el-menu-item index="1-2">标签管理</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <span slot="title">User系统</span>
            <el-menu-item index="2-1">用户管理</el-menu-item>
            <el-menu-item index="2-2">角色管理</el-menu-item>
            <el-menu-item index="2-3">权限管理</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <span slot="title">Service系统</span>
            <el-menu-item index="3-1">自动部署</el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
      <div class="content-box">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import userApi from "../api/user";
export default {
  name: "App",
  data() {
    return {
      showPop: false
    };
  },
  computed: {
    ...mapState(["userId", "account", "name", "roles", "power"])
  },
  methods: {
    handleSelect(key, keyPath) {
      if (key == "1-1") {
        this.$router.push("/blog/article-list");
      } else if (key == "1-2") {
        this.$router.push("/blog/tag-list");
      } else if (key == "2-1") {
        this.$router.push("/user/user-list");
      } else if (key == "2-2") {
        this.$router.push("/user/role-list");
      } else if (key == "2-3") {
        this.$router.push("/user/power-list");
      } else if (key == "3-1") {
        this.$router.push("/service/depoly-manager");
      }
    },
    logout: async function() {
      let res = await userApi.logout();
      if (res.code == 200) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userInfo");
        location.reload();
      }
      console.log(res);
    }
  }
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
  height: 50px;
  position: relative;
  .user-name {
    color: white;
    text-align: center;
    width: 200px;
    height: 50px;
    line-height: 50px;
    position: absolute;
    right: 0;
    cursor: pointer;
  }
  .popover {
    position: absolute;
    width: 160px;
    right: 10px;
    top: 100%;
    z-index: 999;
    box-sizing: border-box;
    padding: 10px 20px;
    background: #333;
    color: white;
    p {
      margin: 5px 0;
    }
  }
}
.container {
  flex: 1;
  display: flex;
  overflow: hidden;
}
.mune-box,
.mune {
  width: 200px;
  height: 100%;
  background: #666;
  overflow: scroll;
}
.content-box {
  height: 100%;
  flex: 1;
  padding: 30px 50px 0;
  box-sizing: border-box;
  overflow: scroll;
}
</style>
