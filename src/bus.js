import Vue from 'vue';
Vue.prototype.$bus = new Vue();

//Message
//vm.$bus.$emit('message:push',message,status);
//message(String):訊息內容
//status(String): Alert 的樣式

//prodcard 推送 產品ID 給 Index
//vm.$bus.$emit('prodID:push', prodID);