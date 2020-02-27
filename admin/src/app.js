import './scss/app.scss';
import Vue from 'vue';
import App from './components/App.vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from "./common/router"
import store from "./store/index"
import types from "./store/mutation-type"

document.addEventListener(
  'DOMContentLoaded',
  () => {
    let accessToken = localStorage.getItem("accessToken")
    let user = JSON.parse(localStorage.getItem("userInfo"))
    if (!user || !accessToken) {
      location.href = "//localhost:8001/login?redirectURL=http://localhost:9001/verify?orginURL=http://localhost:9001/"
      return
    }
    store.commit(types.UPDATE_USER, user)
    Vue.use(ElementUI);
    new Vue({
      router,
      store,
      render: h => h(App),
    }).$mount('#app');
  },
  false
);