<template>
  <div class="sticky-top  shadow-sm">
    <nav class="navbar navbar-expand-md navbar-light bg-white">
      <div class="container">
        <button class="navbar-toggler py-0" type="button" data-toggle="collapse" data-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <i class="material-icons d-flex align-items-center">menu</i>
        </button>
        <router-link to="/index" class="navbar-brand" @click.native="closeNavbar">
          <h2>CrossGate寶貝商店</h2>
        </router-link>
        <div class="shopcart-icon d-flex align-items-center order-md-1" :class="{'active':showSubMenu}" @click.prevent="showSubMenu = !showSubMenu">
          <i class="material-icons">shopping_cart</i>
          <span class="badge badge-pill  badge-danger shopcart-icon-counter" v-if="shopCart.carts && shopCart.carts.length != 0">
            {{shopCart.carts.length}}
          </span>
          <ul class="subMenu">
            <li>
              <router-link to="/myshoppingCart">我的購物車</router-link>
            </li>
            <li>
              <router-link to="/myOrders">我的訂單</router-link>
            </li>
          </ul>
        </div>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav menu mt-2">
            <router-link class="nav-item" to="/index" tag="li" @click.native="closeNavbar" active-class="active">
              <a href="#" class="nav-link py-2 py-md-0 w-100">首頁</a>
            </router-link>
            <router-link class="nav-item" to="/gamehost" tag="li" @click.native="closeNavbar" active-class="active">
              <a href="#" class="nav-link py-2 py-md-0 w-100">主機介紹</a>
            </router-link>
            <router-link class="nav-item" to="/shopping" tag="li" @click.native="closeNavbar" active-class="active">
              <a href="#" class="nav-link py-2 py-md-0 w-100">CrossGate</a>
            </router-link>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>


<script>
import $ from 'jquery';
export default {
  name: 'navbarFront',
  data() {
    return {
      shopCart:{},
      showSubMenu:false,
    }
  },
  methods: {
    closeNavbar(){
      $('.collapse').collapse('hide');
    },
    getCart(){
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      const vm = this;
      this.$http.get(api).then(response => {
        vm.shopCart = response.data.data;
      });
    },
  },
  created() {
    const vm = this;
    vm.getCart();
    vm.$bus.$on('shopCart:update', () => {
      vm.getCart();
    });
  }
}
</script>