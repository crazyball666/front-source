import Vue from 'vue'
import Router from 'vue-router'

import articleList from '../page/article-list.vue'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/article-list',
    name: 'articleList',
    component: articleList
  }, ]
})