<template>
  <div>
    <a href="#" class="btn btn-second" @click.prevent="signout">登出</a>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
    }
  },
  methods: {
    signout() {
      const api = `${process.env.APIPATH}/logout`
      const vm = this
      this.$http.post(api).then(response => {
        if (response.data.success) {
          vm.$router.push('/login');
        }
      });
    }
  }
}
</script>

