<template>
  <div
    :class="[`editor-warp`,`fullScreen`,closeAnimation?`closeAnimation`:``]"
    @keydown.esc="onClose"
    v-show="show"
  >
    <div class="mask" @click.self="onClose">
      <el-progress
        type="circle"
        :percentage="editorUploadProgress"
        :status="editorUploadProgress >= 100 ? `success` : null"
        class="upload-progress"
        v-show="editorUploadProgress > 0"
      ></el-progress>
      <div class="editor-box">
        <div id="toolBar" class="toolBar"></div>
        <div
          id="editor"
          class="editor"
          v-loading="!setup"
          element-loading-text="拼命加载中"
          @keydown.ctrl.83.prevent.stop="onSave"
          @keydown.meta.83.prevent.stop="onSave"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import Editor from "../vendor/cbEditor/index";
import "../vendor/wangEditor/wangEditor.scss";
import { Message } from "element-ui";
import fileApi from "../api/file";

export default {
  props: ["value", "setup", "show"],
  data() {
    return {
      closeAnimation: false,
      editor: null,
      editorUploadProgress: 0,
    };
  },
  // 挂载
  mounted() {
    this.createEditor();
    let ele = document.querySelector(".editor-warp");
    ele.addEventListener("animationend", (e) => {
      if (this.closeAnimation) {
        this.closeAnimation = false;
        this.$emit("onClose");
      }
    });
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
      this.editor = new Editor("#toolBar", "#editor");
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
    onSave() {
      this.$emit("onSave");
    },
    onClose() {
      this.closeAnimation = true;
    },
  },
};
</script>

<style lang="scss" socped>
.editor-warp {
  position: relative;
  height: 40vh;
  .mask {
    position: relative;
    height: 100%;
    background: rgba($color: #eee, $alpha: 0.8);
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
  .editor-box {
    height: 600px;
    display: flex;
    flex-direction: column;
    .toolBar {
      background: #555;
      color: #fff !important;
    }
    .editor {
      flex: 1;
      border: 1px solid #ccc;
      overflow-y: auto;
      background: #ffffff;
      padding: 0 10%;
    }
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
  animation: fullScreen 0.4s ease;

  .mask {
    padding: 2vh 2vw;
    box-sizing: border-box;
  }
  .editor-box {
    box-shadow: 0 0 10px #333;
    margin: 0 auto;
    max-width: 960px;
    height: 100%;
  }
}

.closeAnimation {
  animation: closeAnimation 0.4s ease;
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

@keyframes closeAnimation {
  0% {
    opacity: 1;
    transform: scale(1, 1);
  }
  100% {
    opacity: 0;
    transform: scale(1.5, 1.5);
  }
}
</style>