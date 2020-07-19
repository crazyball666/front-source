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
      <el-button
        type="danger"
        icon="el-icon-delete"
        circle
        class="delete-btn"
        size="mini"
        @click="picture=null"
      ></el-button>
    </div>

    <div class="editor-warp">
      <el-button
        class="full-screen-btn"
        type="primary"
        icon="el-icon-full-screen"
        circle
        @click="fullScreenEditor"
        size="mini"
      ></el-button>
      <el-progress
        :text-inside="true"
        :stroke-width="20"
        :percentage="editorUploadProgress"
        class="upload-progress"
        v-show="editorUploadProgress > 0"
      ></el-progress>
      <div id="editor"></div>
    </div>
    <el-row type="flex" justify="center" class="submit-box">
      <el-button type="primary" round @click="handleSubmit" :loading="loading">保存</el-button>
    </el-row>
  </div>
</template>

<script>
import Editor from "wangeditor";
// import { mavonEditor } from "mavon-editor";
// import "mavon-editor/dist/css/index.css";
import blogApi from "../api/blog";
import fileApi from "../api/file";
import { Message } from "element-ui";
import file from "../api/file";
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
      loadingStyle: { height: "0" },
      editor: null,
      editorUploadProgress: 0
    };
  },
  async mounted() {
    this.createEditor();

    let res = await blogApi.getAllTags();
    this.tagList = res.data;
    if (this.$route.name == "articleEdit") {
      this.pid = this.$route.params.pid;
      let res = await blogApi.getArticle(this.$route.params.pid);
      if (res.code == 200) {
        this.title = res.data.title;
        this.summary = res.data.summary;
        this.content = res.data.content;
        this.editor.txt.html(this.content);
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
            this.picture = "//" + res.data[0];
          }
        })
        .catch(err => {
          Message.error(err);
        });
    },
    createEditor() {
      this.editor = new Editor("#editor");
      this.editor.customConfig.zIndex = 100;
      this.editor.customConfig.onchange = html => {
        this.content = html;
      };
      this.editor.customConfig.customUploadImg = (files, insert) => {
        fileApi
          .uploadFiles(files, progress => {
            this.editorUploadProgress = progress;
          })
          .then(res => {
            this.editorUploadProgress = 0;
            if (res.code == 200) {
              Message.success("上传成功");
              res.data.forEach(item => {
                insert(`//${item}`);
              });
            }
          })
          .catch(err => {
            this.editorUploadProgress = 0;
            Message.error(err);
          });
      };
      this.editor.create();
      let container = document.querySelector(".w-e-text-container");
      container.style.setProperty("flex", "1");
      container.style.setProperty("overflow", "scroll");
      container.style.setProperty("background", "white");
      container.style.removeProperty("height");

      // container.addEventListener("click", function(e) {
      //   let target = e.target;
      //   if (target.tagName == "IMG") {
      //     target.setAttribute("style", "width:100px");
      //   }
      // });
    },
    fullScreenEditor() {
      let element = document.querySelector(".editor-warp");
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
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
  .delete-btn {
    margin-left: 10px;
    flex: none;
    align-self: center;
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
.editor-warp {
  position: relative;
  height: 80vh;
  .full-screen-btn {
    position: absolute;
    top: 1px;
    right: 10px;
  }
  .upload-progress {
    position: absolute;
    top: 40px;
    width: 80%;
    left: 10%;
    z-index: 999;
  }
  #editor {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
}
</style>