<template>
  <div class="header-bar">
    <div
      class="login-resign-btn"
      v-if="userId"
      @click="goUserCenter"
      @mouseover="maxHeight = '150px'"
      @mouseleave="maxHeight = '0px'"
    >{{userName}}</div>
    <div class="login-resign-btn" @click="showLoginBox" v-else>登录/注册</div>
    <login :show="showLogin" @closeEvent="closeLogin" class="login"/>
    <div
      class="option"
      @mouseover="maxHeight = '150px'"
      @mouseleave="maxHeight = '0px'"
      :style="{maxHeight:maxHeight}"
      v-if="userId"
    >
      <div class="option-item" @click="goUserCenter">个人中心</div>
      <div class="option-item" @click="logout">退出登录</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import login from "./login";
export default {
  components: { login },
  data() {
    return {
      showLogin: false,
      maxHeight: 0
    };
  },
  computed: {
    ...mapState(["userId", "userName"])
  },
  methods: {
    showLoginBox() {
      this.showLogin = true;
    },
    closeLogin() {
      this.showLogin = false;
    },
    goUserCenter() {
      this.$router.push({ path: `/user/${this.userId}/info` });
    },
    logout() {
      this.$store.commit("logout");
      window.localStorage.removeItem("user_id");
      window.localStorage.removeItem("user_name");
      window.localStorage.removeItem("access_token");
      this.$router.push({ path: `/` });
    }
  }
};
</script>

<style lang='scss' scoped>
.header-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 50px;
  background: #333;
  z-index: 999;
}
.option {
  position: absolute;
  padding-top: 50px;
  top: 0;
  right: 50px;
  width: 120px;
  background: #333;
  color: white;
  overflow: hidden;
  z-index: 1;
  transition: all 0.5s ease;
}
.option-item {
  padding: 15px 0;
  text-align: center;
  cursor: pointer;
  &:not(:last-child) {
    border-bottom: 1px solid #ccc;
  }
}
.login-resign-btn {
  cursor: pointer;
  position: absolute;
  width: 120px;
  text-align: center;
  right: 50px;
  height: 30px;
  top: 15px;
  color: #fff;
  z-index: 2;
}
.login {
  z-index: 999;
}
</style>
