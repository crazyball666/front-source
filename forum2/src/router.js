import Vue from 'vue'
import Router from 'vue-router'
import IndexPage from './views/Index.vue'
import RegisterPage from './views/register'
import userCenter from './views/userCenter'
import userInfo from './views/userInfo'
import userFollow from './views/userFollow'
import userFans from './views/userFans'
import userCollection from './views/userCollection'
import createPost from './views/createPost'
import postDetail from './views/postDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'indexPage',
      component: IndexPage
    },
    {
      path: '/register',
      name: 'registerPage',
      component: RegisterPage,
    },
    {
      path: '/user/:id',
      name: 'userCenter',
      component: userCenter,
      props: true,
      children: [
        {
          path: 'info',
          component: userInfo
        },
        {
          path: 'follow',
          component: userFollow
        },
        {
          path: 'fans',
          component: userFans
        },
        {
          path: 'collection',
          component: userCollection
        }
      ]
    },
    {
      path: '/post',
      name: 'createPost',
      component: createPost
    },
    {
      path: '/post/:id',
      name: 'postDetail',
      component: postDetail,
      props: true,
    }
  ]
})
