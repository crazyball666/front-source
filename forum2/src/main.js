import Vue from 'vue'
import App from './components/App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './scss/app.scss'
Vue.use(ElementUI)
Vue.config.productionTip = false

let userId = window.localStorage.getItem("user_id");
let userName = window.localStorage.getItem("user_name");
if (userId && userName) {
  store.commit("login", {
    id: userId,
    name: userName
  });
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
