<template>
  <div class="user-info">
    <div class="info-list">
      <div class="info-item">
        <span class="info-title">帐号：</span>
        <input type="text" class="info-input" v-model="account" :disabled="!isEdit">
      </div>
      <div class="info-item">
        <span class="info-title">昵称：</span>
        <input type="text" class="info-input" v-model="name" :disabled="!isEdit">
      </div>
      <div class="info-item">
        <span class="info-title">性别：</span>
        <select class="info-input" v-model="sex" :disabled="!isEdit">
          <option value="0">男</option>
          <option value="1">女</option>
          <option value="2">保密</option>
        </select>
      </div>
      <div class="edit-btn" v-if="!isEdit" @click="edit">修改</div>
      <div class="save-btn" v-else @click="save">保存</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      account: "asdhj",
      name: "asdsa",
      sex: "2",
      isEdit: false
    };
  },
  methods: {
    edit() {
      this.isEdit = true;
    },
    save() {
      this.isEdit = false;
    }
  }
};
</script>

<style lang='scss' scoped>
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
  &:disabled {
    background: #fff;
    color: #999;
  }
}
.save-btn,
.edit-btn {
  margin: 50px auto 10px;
  text-align: center;
  padding: 10px 0;
  width: 120px;
  background: #0088ee;
  color: #fff;
  border-radius: 30px;
}
</style>
