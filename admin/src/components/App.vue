<template>
  <div class="base">
    <div class="header">
      <img
        src="//static.crazyball.xyz/uploads/2020-07-19/1595154126_53ykv0ieyfy.jpeg"
        class="avator"
      />
      <el-dropdown class="user-name">
        <span>
          欢迎，{{ name }}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown" class="popover">
          <el-dropdown-item>ID：{{ userId }}</el-dropdown-item>
          <el-dropdown-item>角色：{{ roles ? roles : "无" }}</el-dropdown-item>
          <el-dropdown-item divided>
            <el-button type="text" round @click="logout">登出</el-button>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
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
            <el-menu-item index="1-3">评论管理</el-menu-item>
            <el-menu-item index="1-4">Blog设置</el-menu-item>
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
      showPop: false,
    };
  },
  computed: {
    ...mapState(["userId", "account", "name", "roles", "power"]),
  },
  methods: {
    handleSelect(key, keyPath) {
      if (key == "1-1") {
        this.$route.path != "/blog/article-list" &&
          this.$router.push("/blog/article-list");
      } else if (key == "1-2") {
        this.$route.path != "/blog/tag-list" &&
          this.$router.push("/blog/tag-list");
      } else if (key == "1-3") {
        this.$route.path != "/blog/comment-list" &&
          this.$router.push("/blog/comment-list");
      } else if (key == "1-4") {
        this.$route.path != "/blog/setting" &&
          this.$router.push("/blog/setting");
      } else if (key == "2-1") {
        this.$route.path != "/user/user-list" &&
          this.$router.push("/user/user-list");
      } else if (key == "2-2") {
        this.$route.path != "/user/role-list" &&
          this.$router.push("/user/role-list");
      } else if (key == "2-3") {
        this.$route.path != "/user/power-list" &&
          this.$router.push("/user/power-list");
      } else if (key == "3-1") {
        this.$route.path != "/service/depoly-manager" &&
          this.$router.push("/service/depoly-manager");
      }
    },
    logout: async function () {
      let res = await userApi.logout();
      if (res.code == 200) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userInfo");
        location.reload();
      }
      console.log(res);
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
  height: 50px;
  position: relative;

  .avator {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    position: absolute;
    left: 20px;
    top: 0;
    bottom: 0;
    margin: auto 0;
  }

  .user-name {
    color: white;
    // text-align: center;
    // marginr: 200px;
    height: 50px;
    line-height: 50px;
    position: absolute;
    right: 50px;
    cursor: pointer;
  }
  .popover {
    width: 160px;
  }
}
.container {
  flex: 1;
  display: flex;
  flex-direction: row;
  overflow: hidden;
}
.mune-box {
  height: 100%;
  width: 16%;
  min-width: 200px;
  background: #666;
  overflow-x: hidden;
  overflow-y: auto;
}
.mune {
  height: 100%;
}

.content-box {
  flex: 1;
  height: 100%;
  padding: 30px 50px 0;
  box-sizing: border-box;
  background: white;
  overflow: scroll;
}
</style>
