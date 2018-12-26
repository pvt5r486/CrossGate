// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
// 引用 AJAX 套件
import axios from 'axios';
import VueAxios from 'vue-axios';
// 引用 Loading 套件
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

// 引用 BS4
import 'bootstrap';
// 引用驗證套件 + 在地化語系
import VeeValidate from 'vee-validate';
import zhTWValidate from 'vee-validate/dist/locale/zh_TW';
// 引用 jquery
import $ from 'jquery';

// 引用自定義
import App from './App';
import router from '@/router';
import './bus';
import currencyFilter from './filters/currency';
import timeTampsFilter from './filters/timetamps';
import categoryClassNameFilter from './filters/categoryClassName';
import pagination from '@/components/pagination';
import modal from '@/components/modal';

Vue.config.productionTip = false;
// 啟用
Vue.use(VueAxios, axios);
axios.defaults.withCredentials = true;
Vue.use(VeeValidate, { events: 'change' });
VeeValidate.Validator.localize('zh_TW',zhTWValidate);

// 全域啟用元件 
Vue.component('Loading',Loading);
Vue.component('pagination',pagination);
Vue.component('modal',modal);
Vue.filter('currency',currencyFilter);
Vue.filter('timeTamps',timeTampsFilter);
Vue.filter('category',categoryClassNameFilter);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
})

router.beforeEach((to, from, next) => {
  // 避免再 modal 打開時使用者按上一頁導致卡死
  $('.modal').modal('hide');
  if (to.meta.requiresAuth) {
    const api = `${process.env.APIPATH}/api/user/check`;
    // 現在的執行環境是在 router 下，並不是在 Vue 的元件內，所以無法使用 this.$http.post
    axios.post(api).then(response => {
      response.data.success ? next() : next({ path: '/login' })
    });
  } else {
    next();
  }
});
