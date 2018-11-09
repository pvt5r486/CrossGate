<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld';

//ES6匯出模組的方式
export default {
  name: 'App',
  components: {
    HelloWorld
  },
  created() {
    //API伺服器路徑 + 申請的API PATH
    //console.log(process.env.APIPATH, process.env.CUSTOMPATH)
    // const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products`
    // this.$http.get(api).then(response => {
    //   console.log(response.data);
    // })
  }
}
</script>

<style lang="scss">
//引用自定Bootstrap4
@import './assets/all';
</style>
