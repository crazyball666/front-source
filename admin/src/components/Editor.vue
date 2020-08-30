<template>
  <div :class="[`editor-warp`,isFullScreen?`fullScreen`:``]" @keydown.esc="isFullScreen=false">
    <div class="mask" @click.self="isFullScreen = false">
      <el-button
        class="full-screen-btn"
        type="primary"
        icon="el-icon-full-screen"
        size="mini"
        @click="fullScreen"
      >全屏编辑</el-button>
      <el-progress
        type="circle"
        :percentage="editorUploadProgress"
        :status="editorUploadProgress >= 100 ? `success` : null"
        class="upload-progress"
        v-show="editorUploadProgress > 0"
      ></el-progress>
      <div
        id="editor"
        v-loading="!setup"
        element-loading-text="拼命加载中"
        @keydown.ctrl.83.prevent.stop="onSave"
        @keydown.meta.83.prevent.stop="onSave"
      ></div>
    </div>
  </div>
</template>

<script>
import Editor from "../vendor/wangEditor/wangEditor";
import "../vendor/wangEditor/wangEditor.scss";
import { Message } from "element-ui";
import fileApi from "../api/file";

export default {
  props: ["value", "setup"],
  data() {
    return {
      isFullScreen: false,
      editor: null,
      editorUploadProgress: 0,
    };
  },
  // 挂载
  mounted() {
    this.createEditor();
    // document
    //   .querySelector(".editor-warp")
    //   .addEventListener("animationend", function () {
    //     alert(111);
    //   });
  },
  watch: {
    value: function (newValue, oldValue) {
      if (!this.setup) {
        this.editor.txt.html(newValue);
      }
    },
  },
  methods: {
    /* 创建编辑器 */
    createEditor() {
      this.editor = new Editor("#editor");
      this.editor.customConfig.zIndex = 100;
      this.editor.customConfig.onchange = (html) => {
        this.$emit("change", html);
      };
      this.editor.customConfig.customUploadImg = (files, insert) => {
        fileApi
          .uploadFiles(files, (progress) => {
            this.editorUploadProgress = parseFloat(progress);
          })
          .then((res) => {
            this.editorUploadProgress = 0;
            if (res.code == 200) {
              Message.success("上传成功");
              res.data.forEach((item) => {
                insert(`//${item}`);
              });
            }
          })
          .catch((err) => {
            this.editorUploadProgress = 0;
            Message.error(err);
          });
      };
      this.editor.create();
    },
    fullScreen() {
      this.isFullScreen = !this.isFullScreen;
    },
    onSave() {
      this.$emit("onSave");
    },
  },
};
</script>

<style lang="scss" socped>
.editor-warp {
  position: relative;
  height: 40vh;
  .full-screen-btn {
    position: absolute;
    top: -36px;
    right: 0;
  }
  .upload-progress {
    width: 126px;
    height: 126px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    z-index: 999;
  }
  #editor {
    height: 100%;
    overflow-y: auto;
    background: #ffffff;
    display: flex;
    flex-direction: column;
  }
  .mask {
    position: relative;
    height: 100%;
    background: rgba($color: #ccc, $alpha: 0.7);
  }
}
.fullScreen {
  position: fixed !important;
  top: 0 !important;
  bottom: 0 !important;
  left: 0 !important;
  right: 0 !important;
  height: 100vh !important;
  width: 100vw !important;
  margin: auto;
  z-index: 999;
  .mask {
    padding: 2vh 2vw;
    box-sizing: border-box;
  }
  #editor {
    box-shadow: 0 0 10px #666;
    .w-e-text-container {
      padding: 20px 10%;
    }
  }
  animation: fullScreen 0.4s ease;
}

@keyframes fullScreen {
  0% {
    opacity: 0;
    transform: scale(1.5, 1.5);
  }
  100% {
    opacity: 1;
    transform: scale(1, 1);
  }
}
</style>