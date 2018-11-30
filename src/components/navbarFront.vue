<template>
  <div class="sticky-top">
    <nav class="navbar navbar-expand-md navbar-light bg-white">
      <div class="container">
        <button class="navbar-toggler py-0" type="button" data-toggle="collapse" data-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <i class="material-icons d-flex align-items-center">menu</i>
        </button>
        <router-link to="/index" class="navbar-brand" @click.native="closeNavbar">
          <img src="@/assets/img/crossgate-logo.png" alt="回首頁" class="img-fluid" width="150">
        </router-link>
        <router-link to="/index" class="text-main shopcart-icon d-flex align-items-center order-md-1">
          <i class="material-icons">shopping_cart</i>
        </router-link>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav menu mt-2">
            <router-link class="nav-item" to="/index" tag="li" @click.native="closeNavbar" active-class="active">
              <a href="#" class="nav-link py-2 py-md-0">首頁</a>
            </router-link>
            <router-link class="nav-item" to="/gamehost" tag="li" @click.native="closeNavbar" active-class="active">
              <a href="#" class="nav-link py-2 py-md-0">主機介紹</a>
            </router-link>
            <router-link class="nav-item" to="/shopping" tag="li" @click.native="closeNavbar" active-class="active">
              <a href="#" class="nav-link py-2 py-md-0">CrossGate</a>
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
    }
  },
  methods: {
    closeNavbar(){
      $('.collapse').collapse('hide');
    }
  },
}
</script>