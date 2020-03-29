import Vue from 'vue';
import store from './vuex/store'; // 引入store
import App from './App.vue';
import router from './router';
import './plugins/element.js';
import axios from 'axios';
import './assets/css/global.css';
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import echarts from 'echarts';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
Vue.prototype.$echarts = echarts;

Vue.prototype.$http = axios;
// 配置请求的跟路径
axios.defaults.baseURL = 'http://127.0.0.1:8081';
// 请求在到达服务器之前，先会调用use中的这个回调函数来添加请求头信息
// request请求拦截器   通过use函数挂在一个回调函数   接口一个config，config就是请求对象，包含多个属性
axios.interceptors.request.use(config => {
  NProgress.start();
  console.log(config);
// 为请求头对象，添加token验证的Authorization字段
  config.headers.token = window.sessionStorage.getItem('token');
  // 最后必须添加下面这一行
  return config;
});
axios.interceptors.response.use(config => {
  NProgress.done();
  return config;
});
Vue.prototype.$http = axios;

Vue.config.productionTip = false;

// 过滤器
Vue.filter('dateFormat', function (originVal) {
  const dt = new Date(originVal);

  const y = dt.getFullYear();
  const m = (dt.getMonth() + 1 + '').padStart(2, '0');
  const d = (dt.getDate() + '').padStart(2, '0');

  const hh = (dt.getHours() + '').padStart(2, '0');
  const mm = (dt.getMinutes() + '').padStart(2, '0');
  const ss = (dt.getSeconds() + '').padStart(2, '0');

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
});

new Vue({
  router,
  ViewUI,
  store,
  render: h => h(App)
}).$mount('#app');
