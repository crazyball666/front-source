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
      <el-upload class="img-uploader" action :http-request="uploadImg" :show-file-list="false">
        <div v-if="!picture">
          <div
            class="img-uploader-icon"
          >{{parseInt(loadingStyle.height) > 0 ?loadingStyle.height : "+"}}</div>
          <div class="upload-progress" :style="loadingStyle"></div>
        </div>
        <img v-else :src="picture" alt class="img" />
      </el-upload>
    </div>
    <mavonEditor v-model="content" style="min-height:80vh;" />
    <el-row type="flex" justify="center" class="submit-box">
      <el-button type="primary" round @click="handleSubmit" :loading="loading">保存</el-button>
    </el-row>
  </div>
</template>

<script>
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import blogApi from "../api/blog";
import fileApi from "../api/file";
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
      content: "",
      picture: "",
      loadingStyle: { height: "0" }
    };
  },
  components: {
    mavonEditor
  },
  async mounted() {
    // document
    //   .querySelector(".v-note-edit")
    //   .addEventListener("paste", this.paste);
    let res = await blogApi.getAllTags();
    this.tagList = res.data;
    if (this.$route.name == "articleEdit") {
      this.pid = this.$route.params.pid;
      let res = await blogApi.getArticle(this.$route.params.pid);
      if (res.code == 200) {
        this.title = res.data.title;
        this.summary = res.data.summary;
        this.content = res.data.content;
        this.picture = res.data.picture;
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
        content: this.content,
        picture: this.picture
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
    },
    uploadImg(info) {
      this.picture = "";
      fileApi
        .uploadFiles(info.file, progress => {
          this.loadingStyle.height = progress + "%";
        })
        .then(res => {
          if (res.code == 200) {
            Message.success("上传成功");
            this.picture = "http://" + res.data[0];
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
    // async paste(event) {
    //   if (event.clipboardData || event.originalEvent) {
    //     var clipboardData =
    //       event.clipboardData || event.originalEvent.clipboardData;
    //     var items = clipboardData.items;
    //     for (var i = 0; i < items.length; i++) {
    //       if (items[i].type.indexOf("image") !== -1) {
    //         event.preventDefault();
    //         let blob = items[i].getAsFile();
    //         alert("tupian");
    //       }
    //     }
    //   }
    // }
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
  .img-uploader {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    &:hover {
      border-color: #409eff;
    }
  }
  .upload-progress {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(152, 251, 152, 0.7);
    transition: height 0.3s linear;
    z-index: -1;
  }
  .img-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .img {
    max-width: 80%;
    max-height: 300px;
    margin: 0 auto;
    display: block;
  }
}
.submit-box {
  margin: 30px;
  color: white;
}
</style>