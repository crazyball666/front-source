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
          :default-active="this.$route.path"
        >
          <el-submenu
            v-for="system in menu"
            :key="system.url"
            :index="system.url"
          >
            <span slot="title">{{ system.title }}</span>
            <el-menu-item
              v-for="item in system.items"
              :key="item.url"
              :index="system.url + item.url"
              >{{ item.title }}</el-menu-item
            >
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
      menu: [
        {
          title: "Blog系统",
          url: "/blog",
          items: [
            {
              title: "文章管理",
              url: "/article-list",
            },
            {
              title: "标签管理",
              url: "/tag-list",
            },
            {
              title: "评论管理",
              url: "/comment-list",
            },
            {
              title: "Blog设置",
              url: "/setting",
            },
          ],
        },
        {
          title: "User系统",
          url: "/user",
          items: [
            {
              title: "用户管理",
              url: "/user-list",
            },
            {
              title: "角色管理",
              url: "/role-list",
            },
            {
              title: "权限管理",
              url: "/power-list",
            },
            {
              title: "接口权鉴管理",
              url: "/verify-list",
            },
          ],
        },
        {
          title: "Service系统",
          url: "/service",
          items: [
            {
              title: "自动部署",
              url: "/depoly-manager",
            },
          ],
        },
        {
          title: "Service-go系统",
          url: "/service-go",
          items: [
            {
              title: "CB APP",
              url: "/cbapp",
            },
            {
              title: "动态配置系统",
              url: "/config",
            },
          ],
        },
      ],
    };
  },
  computed: {
    ...mapState(["userId", "account", "name", "roles", "power"]),
  },
  methods: {
    handleSelect(key, keyPath) {
      if (this.$route.path != key) {
        this.$router.push(key);
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
  overflow: auto;
}
</style>
