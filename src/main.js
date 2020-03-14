import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './plugins/element.js';
import axios from 'axios';

Vue.prototype.$http = axios;
// 配置请求的跟路径
axios.defaults.baseURL = 'http://127.0.0.1:8081';
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
  render: h => h(App)
}).$mount('#app');
