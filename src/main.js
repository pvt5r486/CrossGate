// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue';
//引用AJAX套件
import axios from 'axios';
import VueAxios from 'vue-axios';
//引用Loading套件
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

//引用BS4
import 'bootstrap';
//引用驗證套件 + 在地化語系
import VeeValidate from 'vee-validate';
import zhTWValidate from 'vee-validate/dist/locale/zh_TW';
//引用jquery
import $ from 'jquery';

//引用自定義
import App from './App';
import router from '@/router';
import './bus';
import currencyFilter from './filters/currency';
import timeTampsFilter from './filters/timetamps';
import pagination from '@/components/pagination';

Vue.config.productionTip = false;
//啟用
Vue.use(VueAxios, axios);
axios.defaults.withCredentials = true;
Vue.use(VeeValidate, { events: 'change' });
VeeValidate.Validator.localize('zh_TW',zhTWValidate);

//全域啟用元件 
Vue.component('Loading',Loading);
Vue.component('pagination',pagination);
Vue.filter('currency',currencyFilter);
Vue.filter('timeTamps',timeTampsFilter);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
})

router.beforeEach((to, from, next) => {
  //console.log('執行beforeEach');
  //避免再modal打開時使用者按上一頁導致卡死
  $('.modal').modal('hide');
  if (to.meta.requiresAuth) {
    //console.log('這個頁面需要驗證');
    const api = `${process.env.APIPATH}/api/user/check`;
    //現在的執行環境是在router下，並不是在Vue的元件內，所以無法使用this.$http.post
    axios.post(api).then(response => {
      //console.log('回傳驗證結果',response.data.success);
      response.data.success ? next() : next({ path: '/login' })
    });
  } else {
    next();
  }
});
