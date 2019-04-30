import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: resolve => require(['../views/header.vue'], resolve),
      children: [
        {
          path: '',
          component: resolve => require(['../components/home.vue'], resolve),
          children: [
            {
              path: '',
              name: 'index',
              component: resolve => require(['../components/index.vue'], resolve)
            },
            {
              path: 'new',
              name: 'new',
              component: resolve => require(['../components/new.vue'], resolve),
              props: true
            }
          ]
        },
        {
          path: '/content',
          name: 'content',
          component: resolve => require(['../components/content.vue'], resolve)
        },
        {
          path: '/propagate',
          component: resolve => require(['../components/propagate.vue'], resolve),
          children: [
            {
              path: '',
              name: 'propagate_title',
              component: resolve => require(['../components/propagate_title.vue'], resolve)
            },
            {
              path: '/propagate_detail',
              name: 'propagate_detail',
              component: resolve => require(['../components/propagate_detail.vue'], resolve)
            }
          ]
        }
      ]
    },
    {
      path: '/admin',
      name: 'admin',
      redirect: '/admin/user',
      component: resolve => require(['../admin/index.vue'], resolve),
      children: [
        {
          path: 'user',
          name: 'user',
          component: resolve => require(['../components/user.vue'], resolve)
        },
        {
          path: 'method',
          name: 'method',
          component: resolve => require(['../components/method.vue'], resolve)
        },
        {
          path: 'method_add',
          name: 'method_add',
          component: resolve => require(['../components/add_method.vue'], resolve)

        },
        {
          path: 'method_edit',
          name: 'method_edit',
          component: resolve => require(['../components/method_edit.vue'], resolve)
        },
        {
          path: 'news',
          name: 'news',
          component: resolve => require(['../components/news.vue'], resolve)
        },
        {
          path: 'news_add',
          name: 'news_add',
          component: resolve => require(['../components/news_add.vue'], resolve)
        },
        {
          path: 'news_edit',
          name: 'news_edit',
          component: resolve => require(['../components/news_edit.vue'], resolve)
        },
        {
          path: 'commet',
          name: 'commet',
          component: resolve => require(['../components/commet.vue'], resolve)
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['../components/login.vue'], resolve)
    }
  ]
})
