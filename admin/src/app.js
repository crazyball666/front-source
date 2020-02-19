import './scss/app.scss';
import Vue from 'vue';
import App from './components/App.vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from "./common/router"

document.addEventListener(
  'DOMContentLoaded',
  () => {
    let user = localStorage.getItem("cb_user")
    if (!user) {
      location.href = "//106.15.73.155:8001/login?redirectURL=http://localhost:9001/verify"
    }
    Vue.use(ElementUI);
    new Vue({
      router,
      render: h => h(App),
    }).$mount('#app');
  },
  false
);