import Vue from 'vue'
import Router from 'vue-router'

import articleList from '../page/article-list.vue'
import articleAdd from '../page/article-add.vue'
import tagList from '../page/tag-list.vue'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/article-list',
      name: 'articleList',
      component: articleList
    },
    {
      path: '/article-add',
      name: 'articleAdd',
      component: articleAdd
    },
    {
      path: '/article-edit/:pid',
      name: 'articleEdit',
      component: articleAdd
    },
    {
      path: '/tag-list',
      name: 'tagList',
      component: tagList,
    }

  ]
})