import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)


import index from '../page/index.vue';


export default new Router({
  routes: [
    { path: '/', redirect: '/index' },
    { path: '/index', component: index, name: 'index' },
  ]
});