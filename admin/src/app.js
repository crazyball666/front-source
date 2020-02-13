import './scss/app.scss';
import Vue from 'vue';
import App from './components/App.vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from "./common/router"

Vue.use(ElementUI);
document.addEventListener(
  'DOMContentLoaded',
  () => {
    new Vue({
      router,
      render: h => h(App),
    }).$mount('#app');
  },
  false
);