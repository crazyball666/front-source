<template>
  <div class="register-page">
    <div class="title">用户注册</div>
    <div class="line"></div>
    <div class="info-list">
      <div class="info-item">
        <span class="info-title">头像：</span>
        <div class="upload-box">
          <el-upload
            class="avatar-uploader"
            action="//39.108.174.110/api/v1/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            accept="image/jpeg, image/png"
            :on-error="handleError"
          >
            <img v-if="avator" :src="avator" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </div>
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
          <option value="1">男</option>
          <option value="2">女</option>
          <option value="0">保密</option>
        </select>
      </div>
    </div>
    <el-button type="primary" class="register-btn" @click="register" :loading="loading">注册</el-button>
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
      sex: "0",
      avator: "",
      loading: false
    };
  },
  methods: {
    async register() {
      this.loading = true;
      let res = await api
        .register(
          this.account,
          this.password,
          this.confirmPassword,
          this.name,
          this.sex,
          this.avator
        )
        .then(res => {
          if (res.code == 200) {
            this.$message({
              message: "注册成功",
              type: "success",
              center: true
            });
            this.loading = false;
            this.$router.push({ path: "/" });
          }
        })
        .catch(err => {
          this.loading = false;
        });
    },
    handleError(err) {
      this.$message.error("上传头像失败!");
    },
    handleAvatarSuccess(res, file) {
      this.avator = res.data[0];
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG或者PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
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
.upload-box {
  flex: 1;
  .avatar-uploader {
    width: 120px;
    height: 120px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    overflow: hidden;
  }
  .avatar-uploader:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
  .avatar {
    width: 120px;
    height: 120px;
    display: block;
  }
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
  display: block;
  margin: 50px auto 10px;
  text-align: center;
  padding: 10px 0;
  width: 120px;
  background: #0088ee;
  color: #fff;
  border-radius: 30px;
}
</style>
