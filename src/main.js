// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
// import customLoading from '@/components/loading';
//使用BS4 Modal
import 'bootstrap';
//自定義
import App from './App';
import router from '@/router';
import './bus';
import currencyFilter from './filters/currency';
import pagination from '@/components/pagination';

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
axios.defaults.withCredentials = true;
//載入元件 - 全域啟用
Vue.component('Loading',Loading);
Vue.component('pagination',pagination);
Vue.filter('currency',currencyFilter);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
})

router.beforeEach((to, from, next) => {
  //console.log(to, from, next);
  //to: Route: 即将要进入的目标 路由对象
  //from: Route: 当前导航正要离开的路由
  //next(): 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed (确认的)。
  console.log('執行beforeEach');
  if (to.meta.requiresAuth) {
    console.log('這個頁面需要驗證');
    const api = `${process.env.APIPATH}/api/user/check`;
    //現在的執行環境是在router下，並不是在Vue的元件內，所以無法使用this.$http.post
    axios.post(api).then(response => {
      console.log('回傳驗證結果',response.data.success);
      response.data.success ? next() : next({ path: '/login' })
    });
  } else {
    next();
  }
});
