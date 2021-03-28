import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/blog/article-list",
      name: "articleList",
      component: () => import("../page/blog/article-list.vue"),
    },
    {
      path: "/blog/article-add",
      name: "articleAdd",
      component: () => import("../page/blog/article-add.vue"),
    },
    {
      path: "/blog/article-edit/:pid",
      name: "articleEdit",
      component: () => import("../page/blog/article-add.vue"),
    },
    {
      path: "/blog/tag-list",
      name: "tagList",
      component: () => import("../page/blog/tag-list.vue"),
    },
    {
      path: "/blog/comment-list",
      name: "commentList",
      component: () => import("../page/blog/comment-list.vue"),
    },
    {
      path: "/blog/setting",
      name: "blogSetting",
      component: () => import("../page/blog/setting.vue"),
    },
    {
      path: "/user/user-list",
      name: "userList",
      component: () => import("../page/user-module/user-list.vue"),
    },
    {
      path: "/user/role-list",
      name: "roleList",
      component: () => import("../page/user-module/role-list.vue"),
    },
    {
      path: "/user/power-list",
      name: "powerList",
      component: () => import("../page/user-module/power-list.vue"),
    },
    {
      path: "/user/verify-list",
      name: "verifyList",
      component: () => import("../page/user-module/verify-list.vue"),
    },
    {
      path: "/service/depoly-manager",
      name: "depolyManager",
      component: () => import("../page/service/depoly-manager.vue"),
    },
    {
      path: "/service-go/cbapp",
      name: "cbapp",
      component: () => import("../page/service-go/cbapp/index.vue"),
      children: [
        {
          path: "",
          redirect: "user",
        },
        {
          path: "user",
          component: () => import("../page/service-go/cbapp/user.vue"),
        },
        {
          path: "logs",
          component: () => import("../page/service-go/cbapp/logs.vue"),
        },
        {
          path: "menu",
          component: () => import("../page/service-go/cbapp/menu.vue"),
        },
      ],
    },
    {
      path: "/service-go/config",
      name: "动态配置系统",
      component: () => import("../page/service-go/config/index.vue"),
      children: [
        {
          path: "",
          redirect: "moduleList",
        },
        {
          path: "moduleList",
          name: "模块列表",
          component: () => import("../page/service-go/config/module-list.vue"),
        },
        {
          path: "module/:id",
          name: "模块详情",
          component: () =>
            import("../page/service-go/config/module-detail.vue"),
        },
        {
          path: "module/:id/*",
          name: "模块详情",
          component: () =>
            import("../page/service-go/config/module-detail.vue"),
        },
        {
          path: "test",
          name: "配置测试",
          component: () => import("../page/service-go/config/test_page.vue"),
        },
      ],
    },
  ],
});
