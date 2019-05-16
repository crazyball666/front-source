<template>
  <div class="topic-tab">
    <div class="header">主题分类</div>
    <div class="topic-list">
      <div class="topic-item" @click="select({id:0,title:'热门推荐'})">热门推荐</div>
      <div
        v-for="topic in topicList"
        :key="topic.id"
        class="topic-item"
        @click="select(topic)"
      >{{topic.title}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "topic-tab",
  props: ["topicList"],
  methods: {
    select(topic) {
      this.$emit("select", topic);
    }
  }
};
</script>

<style lang='scss' scoped>
.topic-tab {
  text-align: center;
  width: 180px;
  background: #eee;
  .header {
    background: #333;
    color: #fff;
    font-size: 16px;
    font-weight: 300;
    padding: 15px 0;
    margin-bottom: 10px;
  }
  .topic-item {
    padding: 10px 0;
    border-left: 10px solid #3565c4;
    background: #fff;
    cursor: pointer;
    &:not(:last-child) {
      margin-bottom: 10px;
    }
  }
}
</style>
