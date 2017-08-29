import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
// 路由分组懒加载
// const Hello = r => require.ensure([], () => r(require('@/components/Hello')), 'Hello')
// const Demo = r => require.ensure([], () => r(require('@/components/Demo')), 'Demo')
// 路由懒加载
const Hello = resolve => require(['@/components/Hello'], resolve)
const Demo = resolve => require(['@/components/Demo'], resolve)

export default new Router({
  routes: [{
      path: '/hello',
      component: Hello,
    },
    {
      path: '/demo',
      component: Demo,
      children: [{
        path: 'hello',
        component: Hello,
      }]
    },
    {
      path: '*',
      redirect: 'demo'
    }
  ],
});

// 动态路径 /user/:userId

// 命名的路由
// router.push({ name: 'user', params: { userId: 123 }})

// 传递参数 /register?plan=private

// 带查询参数
// router.push({ path: 'register', query: { plan: 'private' }})
