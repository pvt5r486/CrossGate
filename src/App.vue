<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
//ES6匯出模組的方式
export default {
  name: 'App',
  components: {

  },
}
</script>

<style lang="scss">
//引用all.scss
@import './assets/all';
</style>
