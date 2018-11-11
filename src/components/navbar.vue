<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href="#">Navbar</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link to="/admin/products" class="nav-link" activeClass="active">產品列表</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/admin/orders" class="nav-link" activeClass="active">訂單列表</router-link>
          </li>
           <li class="nav-item">
            <router-link to="/admin/cupon" class="nav-link" activeClass="active">優惠券</router-link>
          </li>
        </ul>
        <button class="btn btn-outline-secondary btn-sm" @click="signout">登出</button>
      </div>
    </nav>
  </div>
</template>


<script>
export default {
  name: 'navbar',
  data() {
    return {
      isActive:false,
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
      })
    },
    test(){
      console.log('this');
    }
  },
  created(){
    //console.log(this.route);
  }
}
</script>