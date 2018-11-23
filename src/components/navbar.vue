<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-main">
      <router-link to="/admin/products" class="navbar-brand">
        <img src="@/assets/img/crossgate-logo.png" alt="回首頁" class="img-fluid" width="120">
      </router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link to="/admin/products" class="nav-link" activeClass="active">
              <i class="fas fa-box-open mr-1"></i>產品列表
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/admin/orders" class="nav-link" activeClass="active">
              <i class="fas fa-clipboard-list mr-1"></i>訂單列表
            </router-link>
          </li>
           <li class="nav-item">
            <router-link to="/admin/coupon" class="nav-link" activeClass="active">
              <i class="fas fa-ticket-alt mr-1"></i>優惠券
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/admin/shopping-demo" class="nav-link" activeClass="active">
              <i class="fas fa-shopping-cart mr-1"></i>模擬購物
            </router-link>
          </li>
        </ul>
        <button class="btn btn-outline-secondary btn-sm border-0 bg-transparent" @click="signout">
          登出<i class="fas fa-sign-out-alt ml-1"></i>
        </button>
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
      const api = `${process.env.APIPATH}/logout`;
      const vm = this;
      this.$http.post(api).then(response => {
        if (response.data.success) {
          vm.$router.push('/login');
        }
      })
    },
  },
}
</script>