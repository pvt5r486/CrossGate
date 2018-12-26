<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
// ES6 匯出模組的方式
export default {
  name: 'App',
}
</script>

<style lang="scss">
// 引用 all.scss
@import './assets/all';
</style>
