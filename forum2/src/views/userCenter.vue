<template>
  <div class="user-center">
    <div class="title">个人中心</div>
    <div class="line"></div>
    <div class="tab-list">
      <div class="item" @click="detail('info')">个人信息</div>
      <div class="item" @click="detail('follow')">我的关注</div>
      <div class="item" @click="detail('fans')">我的粉丝</div>
      <div class="item" @click="detail('collection')">我的收藏</div>
    </div>
    <router-view class="content"/>
  </div>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {};
  },
  methods: {
    detail(path) {
      this.$router.push({ path: `/user/${this.id}/${path}` });
    }
  }
};
</script>

<style lang='scss' scoped>
.user-center {
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
  margin-bottom: 30px;
}
.tab-list {
  display: flex;
  width: 400px;
  padding: 0 30px;
  .item {
    flex: 1;
    font-size: 16px;
    cursor: pointer;
  }
}
.content {
  padding: 30px;
}
</style>
