import "../scss/app.scss";
import Vue from "vue";
import router from "./router/index";
import App from "./component/App.vue";
//
// alert(111);
// Vue.use(router);
new Vue({
  // router,
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
  // template: "<App/>",
});
