import "./scss/app.scss";
import Vue from "vue";
import App from "./components/App.vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import router from "./common/router";
import store from "./store/index";
import types from "./store/mutation-type";

document.addEventListener(
  "DOMContentLoaded",
  () => {
    let accessToken = localStorage.getItem("access_token");
    // let user = JSON.parse(localStorage.getItem("userInfo"));
    // if (!accessToken) {
    //   location.href = `http://localhost:8001/login?redirectURL=${location.protocol}//${location.host}/verify?orginURL=${location.protocol}//${location.host}/`;
    //   return;
    // }
    // store.commit(types.UPDATE_USER, user);
    Vue.use(ElementUI);
    new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount("#app");
  },
  false
);
