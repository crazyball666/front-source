<template>
  <el-popover :value="show" placement="left" width="220" class="user-pop" transition="showUserPop">
    <div class="user-pop-content" v-loading="loading">
      <i class="close-btn el-icon-close" @click="close"></i>
      <img class="user-avator" :src="user.avator">
      <div class="user-name">{{user.name}}</div>
      <el-button
        type="primary"
        size="mini"
        class="follow-btn"
        v-show="$store.state.userId!=user.id"
        @click="follow(user)"
        :loading="sending"
      >
        <i
          class="el-icon-check el-icon--left"
          v-show="((user.id && user['fans-list'].length>0)||isFollow)"
        ></i>
        {{(user.id && user['fans-list'].length>0||isFollow)?'已关注':'关注'}}
      </el-button>
      <div class="user-info">
        <div class="user-sex">性别：{{getSex(user.sex)}}</div>
        <div class="user-follow">关注：{{user.follow}}</div>
        <div class="user-fans">粉丝：{{user.fans}}</div>
      </div>
    </div>
  </el-popover>
</template>

<script>
import api from "../common/api";
export default {
  props: ["show", "userId"],
  data() {
    return {
      isFollow: false,
      user: {},
      loading: true,
      sending: false
    };
  },
  methods: {
    follow() {
      this.sending = true;
      if (this.user["fans-list"].length > 0 || this.isFollow) {
        api.unfollow(this.user.id).then(res => {
          this.isFollow = false;
          this.$message({
            message: "取消关注成功！",
            type: "success",
            center: true
          });
          this.sending = false;
          this.$emit("unfollow", { userId: this.user.id });
          this.user.fans--;
        });
      } else {
        api.follow(this.user.id).then(res => {
          this.isFollow = true;
          this.$message({
            message: "关注成功！",
            type: "success",
            center: true
          });
          this.sending = false;
          this.$emit("follow", { userId: this.user.id });
          this.user.fans++;
        });
      }
    },
    getSex(sex) {
      if (sex == 1) return "男";
      if (sex == 2) return "女";
      return "保密";
    },
    close() {
      this.$emit("close");
    }
  },
  watch: {
    show: function(newV, oldV) {
      if (!newV) return;
      this.loading = true;
      this.sending = false;
      this.isFollow = false;
      this.user = {};
      api.getUser(this.userId).then(res => {
        this.user = res.data;
        this.loading = false;
      });
    }
  }
};
</script>

<style>
</style>
