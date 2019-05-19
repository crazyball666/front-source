<template>
  <div class="user-info">
    <div class="info-list">
      <div class="info-item">
        <!-- <span class="info-title">头像：</span> -->
        <div class="upload-box">
          <el-upload
            class="avatar-uploader"
            action="//39.108.174.110/api/v1/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            accept="image/jpeg, image/png"
            :on-error="handleError"
            :disabled="!isEdit"
          >
            <img v-if="avator" :src="avator" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </div>
      <div class="info-item">
        <span class="info-title">帐号：</span>
        <input type="text" class="info-input" v-model="account" :disabled="true">
      </div>
      <div class="info-item">
        <span class="info-title">昵称：</span>
        <input type="text" class="info-input" v-model="name" :disabled="!isEdit">
      </div>
      <div class="info-item">
        <span class="info-title">性别：</span>
        <select class="info-input" v-model="sex" :disabled="!isEdit">
          <option value="1">男</option>
          <option value="2">女</option>
          <option value="0">保密</option>
        </select>
      </div>
      <div v-if="this.$route.params.id==this.$store.state.userId">
        <el-button class="edit-btn" v-if="!isEdit" @click="edit" type="primary">修改</el-button>
        <el-button class="save-btn" v-else @click="save" type="primary" :loading="loading">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../common/api";
export default {
  data() {
    return {
      account: "",
      name: "",
      sex: "",
      avator: "",
      isEdit: false,
      user: {},
      loading: false
    };
  },
  mounted() {
    api.getUser(this.$route.params.id).then(res => {
      this.account = res.data.account;
      this.name = res.data.name;
      this.sex = res.data.sex;
      this.avator = res.data.avator;
    });
  },
  watch: {
    "$route.params.id": function(newV, oldV) {
      if (newV == oldV) return;
      api.getUser(this.$route.params.id).then(res => {
        this.account = res.data.account;
        this.name = res.data.name;
        this.sex = res.data.sex;
        this.avator = res.data.avator;
      });
    }
  },
  updated() {},
  methods: {
    edit() {
      this.isEdit = true;
    },
    save() {
      this.loading = true;
      api
        .updateUser(this.$route.params.id, {
          name: this.name,
          sex: this.sex,
          avator: this.avator
        })
        .then(res => {
          this.isEdit = false;
          this.loading = false;
          this.$message({
            message: "修改成功！",
            type: "success",
            center: true
          });
          this.$store.commit("login", {
            id: this.$route.params.id,
            name: this.name
          });
          window.localStorage.setItem("user_id", this.$route.params.id);
          window.localStorage.setItem("user_name", this.name);
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
      console.log(this.avator);
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
.info-list {
  width: 400px;
  margin: 0 auto;
}
.upload-box {
  flex: 1;
  .avatar-uploader {
    margin: 0 auto;
    width: 120px;
    height: 120px;
    box-shadow: 0 0 8px 1px #999;
    border-radius: 50%;
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
  &:disabled {
    background: #fff;
    color: #999;
  }
}
.save-btn,
.edit-btn {
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
