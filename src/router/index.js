import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/Home.vue';
import Page from '../components/Page.vue';
import Welcome from '../components/Welcome.vue';
import Analysis from '../components/Analysis.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Useage from '../components/Useage.vue';
import Perssion from '../components/Perssion.vue';
import Info from '../components/Info.vue';
// import HelloWorld from '../components/HelloWorld.vue';
Vue.use(Router);

const routes = [
    { path: '/', redirect: '/login' },
    { path: '/register', component: Register },
    { path: '/login', component: Login },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
      { path: '/page', component: Page },
      { path: '/welcome', component: Welcome },
      { path: '/analysis', component: Analysis },
      { path: '/useage', component: Useage },
      { path: '/perssion', component: Perssion },
      { path: '/info', component: Info }
    ]
  }
];

const router = new Router({
  mode: 'history',
  routes
});
// 挂在路由导航，to标识要访问的路径，from从哪里来 next下一个操作

router.beforeEach((to, from, next) => {
  if (to.path === '/login' || to.path === '/register') {
    return next();
  }

  // 获取token
  const tokenStr = window.sessionStorage.getItem('token');
  if (!tokenStr) {
    return next('/login');
  }
  next();
});
export default router;
