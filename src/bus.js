import Vue from 'vue';
Vue.prototype.$bus = new Vue();

// Message
// vm.$bus.$emit('message:push',message,status);
// message(String):訊息內容
// status(String): Alert 的樣式

// 更新 Navbar 上的購物車數量顯示 - 不必帶任何參數
// vm.$bus.$emit('shopCart:update');