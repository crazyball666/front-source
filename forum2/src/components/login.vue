<template>
  <transition name="changepage" mode="out-in">
    <div class="login-warp" v-if="show">
      <div class="login-box">
        <span class="close-btn" @click="close">关闭</span>
        <h2 class="title">论坛登录</h2>
        <div class="account-box">
          <span class="account-title">帐号：</span>
          <div class="input-warp" :class="{focus:focusAccount}">
            <input
              type="text"
              v-model="account"
              class="account-input"
              @focus="focusAccount=true"
              @blur="focusAccount=false"
            >
          </div>
        </div>
        <div class="password-box">
          <span class="password-title">密码：</span>
          <div class="input-warp" :class="{focus:focusPassword}">
            <input
              type="password"
              v-model="password"
              class="password-input"
              @focus="focusPassword=true"
              @blur="focusPassword=false"
            >
          </div>
        </div>
        <div class="login-btn" @click="login">登录</div>
        <div class="more">
          <span class="register" @click="goRegister">注册</span>
          <span class="forget">忘记密码</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import api from "../common/api";
/* eslint-disable */
export default {
  name: "login",
  props: ["show"],
  mounted() {},
  data() {
    return {
      account: "",
      password: "",
      focusAccount: false,
      focusPassword: false
    };
  },
  methods: {
    close() {
      this.$emit("closeEvent", false);
    },
    async login() {
      try {
        let res = await api.login(this.account, this.password);
        if (res.data.code != 200) {
          alert(res.data.message);
        } else {
          alert("登录成功");
          this.$store.commit("login", {
            id: res.data.data.id,
            name: res.data.data.name
          });
          window.localStorage.setItem("access_token", res.data.data.token);
          this.close();
        }
      } catch (err) {
        alert(err);
      }
    },
    goRegister() {
      this.close();
      this.$router.push({ path: "/register" });
    }
  }
};
</script>

<style lang='scss' scoped>
.login-warp {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
  background: rgba(30, 30, 30, 0.7);
  .close-btn {
    width: 30px;
    height: 30px;
    display: block;
    position: absolute;
    top: 10px;
    right: 10px;
    background: red;
  }
  .login-box {
    position: absolute;
    background: #fff;
    height: 280px;
    width: 480px;
    top: 50%;
    left: 50%;
    transform: translate(-250px, -150px);
    border-radius: 12px;
    box-shadow: 0 0 15px 0 #aaa;
  }
}
.more {
  position: absolute;
  right: 20px;
  bottom: 18px;
  .register,
  .forget {
    display: inline-block;
    padding: 0 12px;
    cursor: pointer;
    &:hover {
      color: #03488d;
    }
  }
}
.account-box,
.password-box {
  padding: 15px 80px 15px 50px;
  display: flex;
}
.title {
  text-align: center;
  padding-top: 20px;
  margin: 10px 0;
}
.account-title,
.password-title {
  display: inline-block;
  margin-right: 5px;
  font-size: 16px;
  padding: 5px 10px;
}
.login-btn {
  margin: 15px auto;
  text-align: center;
  padding: 10px 0;
  width: 120px;
  background: #0088ee;
  color: #fff;
  border-radius: 30px;
}
.input-warp {
  flex: 1;
  border-bottom: 1px solid #ccc;
  position: relative;
  &::after {
    content: "";
    position: absolute;
    display: block;
    width: 0;
    background: #1d95f0;
    bottom: -2px;
    height: 2px;
    transition: all 0.5s ease;
  }
  .account-input,
  .password-input {
    padding: 0 10px;
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
  }
}
.focus {
  &::after {
    width: 100%;
  }
}
.changepage-enter-active {
  animation: showpage 0.5s ease;
}
.changepage-leave-active {
  animation: hidepage 0.5s ease;
}
@keyframes showpage {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes hidepage {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
