<template>
  <div class="article-add">
    <h1 class="title">新增文章</h1>
    <div class="item-box">
      <span>标题:</span>
      <el-input placeholder="请输入标题" v-model="title" class="item-input" clearable></el-input>
    </div>
    <div class="item-box">
      <span>标签:</span>
      <el-select v-model="tags" placeholder="请选择标签" class="item-input" multiple>
        <el-option
          v-for="item in tagList"
          :key="item.p_id"
          :label="item.content"
          :value="item.p_id"
        ></el-option>
      </el-select>
    </div>
    <div class="item-box">
      <span>简介:</span>
      <el-input
        type="textarea"
        placeholder="请输入简介"
        v-model="summary"
        class="item-input"
        clearable
        rows="5"
      ></el-input>
    </div>
    <div class="item-box">
      <span>封面:</span>
      <!-- <el-upload
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>-->
    </div>
    <mavonEditor v-model="content" style="height:80vh;" />
    <el-row type="flex" justify="center" class="submit-box">
      <el-button type="primary" round @click="handleSubmit" :loading="loading">保存</el-button>
    </el-row>
  </div>
</template>

<script>
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import blogApi from "../api/blog";
import blog from "../api/blog";
import { Message } from "element-ui";
export default {
  data() {
    return {
      loading: false,
      pid: null,
      tagList: [],
      title: "",
      tags: [],
      summary: "",
      content: ""
    };
  },
  components: {
    mavonEditor
  },
  async mounted() {
    let res = await blogApi.getAllTags();
    this.tagList = res.data;
    if (this.$route.name == "articleEdit") {
      this.pid = this.$route.params.pid;
      let res = await blogApi.getArticle(this.$route.params.pid);
      if (res.code == 200) {
        this.title = res.data.title;
        this.summary = res.data.summary;
        this.content = res.data.content;
        let articleTags = res.data.tags.split(",");
        this.tagList.forEach(tag => {
          if (articleTags.includes(tag.content)) {
            this.tags.push(tag.p_id);
          }
        });
      }
    }
  },
  methods: {
    handleSubmit() {
      this.loading = true;
      let article = {
        title: this.title,
        tags: this.tags.join(","),
        summary: this.summary,
        content: this.content
      };
      if (this.pid) {
        blogApi
          .updateArticle(this.pid, article)
          .then(res => {
            this.loading = false;
            Message.success("修改成功");
          })
          .catch(err => {
            this.loading = false;
          });
      } else {
        blogApi
          .createArticle(article)
          .then(res => {
            this.loading = false;
            Message.success("创建成功");
            this.$router.push("/blog/article-list");
          })
          .catch(err => {
            this.loading = false;
          });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 20px;
  margin-bottom: 20px;
}
.item-box {
  display: flex;
  // max-width: 800px;
  margin: 0 auto 20px;
  span {
    margin-right: 20px;
    line-height: 40px;
    color: #606266;
  }
  .item-input {
    flex: 1;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
.submit-box {
  margin: 30px;
  color: white;
}
</style>