import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/blog/article-list',
      name: 'articleList',
      component: () => import('../page/blog/article-list.vue')
    },
    {
      path: '/blog/article-add',
      name: 'articleAdd',
      component: () => import('../page/blog/article-add.vue')
    },
    {
      path: '/blog/article-edit/:pid',
      name: 'articleEdit',
      component: () => import('../page/blog/article-add.vue')
    },
    {
      path: '/blog/tag-list',
      name: 'tagList',
      component: () => import('../page/blog/tag-list.vue'),
    },
    {
      path: '/blog/comment-list',
      name: 'commentList',
      component: () => import('../page/blog/comment-list.vue'),
    },
    {
      path: '/blog/setting',
      name: 'blogSetting',
      component: () => import('../page/blog/setting.vue'),
    },
    {
      path: '/user/user-list',
      name: 'userList',
      component: () => import('../page/user-module/user-list.vue'),
    },
    {
      path: '/user/role-list',
      name: 'roleList',
      component: () => import('../page/user-module/role-list.vue'),
    },
    {
      path: '/user/power-list',
      name: 'powerList',
      component: () => import('../page/user-module/power-list.vue'),
    },
    {
      path: '/service/depoly-manager',
      name: 'depolyManager',
      component: () => import('../page/service/depoly-manager.vue'),
    },
  ]
})