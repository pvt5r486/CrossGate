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
    //HelloWorld
  },
}
</script>

<style lang="scss">
//引用all.scss
@import './assets/all';
</style>
