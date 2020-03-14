import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Page from '../components/Page.vue';
import HelloWorld from '../components/HelloWorld.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: Home },
  {
    path: '/',
    name: 'HelloWorld',
    component: HelloWorld
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/page',
    name: 'Page',
    component: Page
  }
];

const router = new VueRouter({ routes });

export default router;
