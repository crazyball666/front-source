<template>
  <div class="header-bar">
    <div class="login-resign-btn" @click="showLoginBox">登录/注册</div>
    <login :show="showLogin" @closeEvent="closeLogin" class="login"/>
  </div>
</template>

<script>
import login from "./login";
export default {
  components: { login },
  data() {
    return {
      showLogin: false
    };
  },
  methods: {
    showLoginBox() {
      this.showLogin = true;
    },
    closeLogin() {
      this.showLogin = false;
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
  z-index: 99999;
}
.login-resign-btn {
  position: absolute;
  right: 50px;
  height: 30px;
  top: 10px;
  color: #fff;
}
.login {
  z-index: 999;
}
</style>
