<template>
  <div class="blog-setting">
    <h1 class="title">Blog设置</h1>
    <div v-loading="loading" class="setting-form">
      <div class="input-item">
        <span>博客名称:</span>
        <el-input
          placeholder="请输入名称"
          v-model="blogName"
          class="input-box"
          clearable
        ></el-input>
      </div>
      <div class="input-item">
        <span>头像:</span>
        <el-input
          placeholder="请输入头像链接"
          v-model="avatar"
          class="input-box"
          clearable
        ></el-input>
      </div>
      <div class="input-item">
        <span>签名:</span>
        <el-input
          placeholder="请输入签名"
          v-model="description"
          class="input-box"
          clearable
        ></el-input>
      </div>
      <div class="input-item">
        <span>文章默认封面:</span>
        <el-input
          placeholder="请输入图片地址"
          v-model="defaultArticleImg"
          class="input-box"
          clearable
        ></el-input>
      </div>
      <div class="input-item">
        <span>关于页封面:</span>
        <el-input
          placeholder="请输入图片地址"
          v-model="aboutMeImg"
          class="input-box"
          clearable
        ></el-input>
      </div>
    </div>
    <el-button type="primary" @click="saveConfig" class="saveBtn"
      >保存</el-button
    >
  </div>
</template>

<script>
import blogApi from "../../api/blog";
export default {
  data() {
    return {
      blogName: "",
      avatar: "",
      description: "",
      defaultArticleImg: "",
      aboutMeImg: "",
      loading: false,
    };
  },
  mounted: function () {
    this.loading = true;
    blogApi
      .getConfig()
      .then((res) => {
        this.blogName = res.data.blog_name;
        this.avatar = res.data.avatar;
        this.description = res.data.description;
        this.defaultArticleImg = res.data.default_article_img;
        this.aboutMeImg = res.data.about_me_img;
        this.loading = false;
      })
      .catch((err) => {
        this.loading = false;
      });
  },
  methods: {
    saveConfig: function () {
      blogApi
        .setConfig({
          blog_name: this.blogName,
          avatar: this.avatar,
          description: this.description,
          default_article_img: this.defaultArticleImg,
          about_me_img: this.aboutMeImg,
        })
        .then((res) => {
          this.$message({
            type: "success",
            message: "修改成功",
          });
        });
    },
  },
};
</script>

<style lang='scss' scoped>
.title {
  font-size: 20px;
  margin-bottom: 20px;
}
.input-item {
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  span {
    display: block;
    width: 200px;
    padding-right: 40px;
    text-align: right;
  }
}
.saveBtn {
  display: block;
  margin: 20px auto;
}
</style>