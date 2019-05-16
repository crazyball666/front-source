<template>
  <div class="register-page">
    <div class="title">用户注册</div>
    <div class="line"></div>
    <div class="info-list">
      <div class="info-item">
        <span class="info-title">帐号：</span>
        <input type="text" class="info-input" v-model="account">
      </div>
      <div class="info-item">
        <span class="info-title">昵称：</span>
        <input type="text" class="info-input" v-model="name">
      </div>
      <div class="info-item">
        <span class="info-title">密码：</span>
        <input type="password" class="info-input" v-model="password">
      </div>
      <div class="info-item">
        <span class="info-title">确认密码：</span>
        <input type="password" class="info-input" v-model="confirmPassword">
      </div>
      <div class="info-item">
        <span class="info-title">性别：</span>
        <select class="info-input" v-model="sex">
          <option value="0">男</option>
          <option value="1">女</option>
          <option value="2">保密</option>
        </select>
      </div>
    </div>
    <div class="register-btn" @click="register">注册</div>
  </div>
</template>

<script>
import api from "../common/api";
export default {
  data() {
    return {
      account: "",
      name: "",
      password: "",
      confirmPassword: "",
      sex: "2"
    };
  },
  methods: {
    async register() {
      try {
        let res = await api.register(
          this.account,
          this.password,
          this.confirmPassword,
          this.name,
          this.sex
        );
        if (res.data.code != 200) {
          alert(res.data.message);
        } else {
          alert("注册成功");
        }
      } catch (err) {
        alert(err);
      }
    }
  }
};
</script>

<style lang='scss' scoped>
.register-page {
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
  margin-bottom: 50px;
}
.info-list {
  width: 400px;
  margin: 0 auto;
}
.info-item {
  display: flex;
  margin: 25px 0;
}
.info-title {
  font-size: 16px;
  width: 80px;
  padding: 8px 20px 8px 0;
  text-align: right;
}
.info-input {
  flex: 1;
  border: none;
  outline: none;
  border-bottom: 1px solid #ddd;
  padding: 0 8px;
  transition: all 0.5s ease;
  &:focus {
    border-color: #088ed1;
  }
}
.register-btn {
  margin: 50px auto 10px;
  text-align: center;
  padding: 10px 0;
  width: 120px;
  background: #0088ee;
  color: #fff;
  border-radius: 30px;
}
</style>
