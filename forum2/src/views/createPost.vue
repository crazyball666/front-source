<template>
  <div class="create-post">
    <div class="title">发布帖子</div>
    <div class="title-warp">
      <span>标题：</span>
      <input type="text" v-model="title" placeholder="输入标题..." class="input">
    </div>
    <div class="topic-warp">
      <span>主题：</span>
      <select class="input" v-model="topic">
        <option v-for="topic in topicList" :value="topic.id" :key="topic.id">{{topic.title}}</option>
      </select>
    </div>
    <div class="editor-warp">
      <div id="editor-tool"></div>
      <div id="editor"></div>
    </div>
    <div class="submit-btn" @click="submit">发布</div>
  </div>
</template>

<script>
import E from "wangeditor";
import api from "../common/api";
export default {
  data() {
    return {
      topicList: [],
      title: "",
      topic: "",
      content: ""
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (!vm.$store.state.userId) {
        // alert("请登录");
        vm.$router.push({ path: "/" });
      }
    });
  },
  async mounted() {
    let editor = new E("#editor-tool", "#editor");
    // 将图片大小限制为 2M
    editor.customConfig.uploadImgMaxSize = 2 * 1024 * 1024;
    // 输入时将数据传出父组件
    editor.customConfig.onchange = content => {
      this.content = content;
    };
    // 自定义上传函数
    editor.customConfig.customUploadImg = function(files, insert) {
      // files 是 input 中选中的文件列表
      // insert 是获取图片 url 后，插入到编辑器的方法
      let formData = new FormData();
      formData.append("file", files[0]);
      api.upload(formData).then(res => {
        // 上传代码返回结果之后，将图片插入到编辑器中
        insert(res.data[0]);
      });
    };
    // 上传错误提示
    editor.customConfig.customAlert = function(info) {
      // info 是需要提示的内容
      alert("上传错误：" + info);
    };
    editor.create();
    // 初始化编辑器内容
    editor.txt.html(this.content);

    api
      .getTopicList()
      .then(res => {
        this.topicList = res.data.rows;
      })
      .catch(err => {
        this.$message({
          message: "获取主题列表失败",
          type: "error",
          center: true
        });
      });
  },
  methods: {
    async submit() {
      api.createPost(this.topic, this.title, this.content).then(res => {
        this.$message({
          message: "获取主题列表失败",
          type: "error",
          center: true
        });
        this.$router.push({ path: "/" });
      });
    }
  }
};
</script>

<style lang='scss'>
.create-post {
  position: relative;
  padding: 30px;
  box-shadow: 0 0 15px 0 #ccc;
  border-radius: 8px;
  .title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
    padding-left: 10px;
    border-left: 10px solid #003399;
  }
  .title-warp,
  .topic-warp {
    display: flex;
    padding: 10px;
    span {
      display: block;
      margin-right: 15px;
      padding: 5px 0;
      font-size: 16px;
    }
    .input {
      width: 500px;
      border: none;
      outline: none;
      border-bottom: 1px solid #003399;
    }
  }
  .topic-warp {
    margin-bottom: 30px;
  }
  #editor {
    // flex: 1;
    height: 480px;
  }
  .submit-btn {
    margin: 30px auto;
    cursor: pointer;
    text-align: center;
    padding: 5px 0;
    width: 80px;
    background: #0088ee;
    color: #fff;
    border-radius: 30px;
  }
}
</style>
