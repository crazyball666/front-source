import Vue from 'vue'
import Router from 'vue-router'

// Bolg
import articleList from '../page/article-list.vue'
import articleAdd from '../page/article-add.vue'
import tagList from '../page/tag-list.vue'

// User
import userList from '../page/user-module/user-list.vue'
import roleList from '../page/user-module/role-list.vue'
import powerList from '../page/user-module/power-list.vue'

// Service
import depolyManager from '../page/service/depoly-manager.vue'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/blog/article-list',
      name: 'articleList',
      component: articleList
    },
    {
      path: '/blog/article-add',
      name: 'articleAdd',
      component: articleAdd
    },
    {
      path: '/blog/article-edit/:pid',
      name: 'articleEdit',
      component: articleAdd
    },
    {
      path: '/blog/tag-list',
      name: 'tagList',
      component: tagList,
    },
    {
      path: '/user/user-list',
      name: 'userList',
      component: userList,
    },
    {
      path: '/user/role-list',
      name: 'roleList',
      component: roleList,
    },
    {
      path: '/user/power-list',
      name: 'powerList',
      component: powerList,
    },
    {
      path: '/service/depoly-manager',
      name: 'depolyManager',
      component: depolyManager,
    }
  ]
})