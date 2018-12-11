<template>
    <div>
      <loading :active.sync="isLoading">
        <img src="@/assets/img/loading.gif" alt="" width="200">
      </loading>
      <alertMessage></alertMessage>
      <navbarFront></navbarFront>
      <topSilder class="mb-3"></topSilder>
      <div class="container py-3 px-0">
        <ul class="daily_message">
          <li>2018.12.24</li>
          <li><span class="tag tag-danger">今日限定</span></li>
          <li>露比嚷嚷著「coupon50」這…難道是什麼密碼嗎？</li>
        </ul>
      </div>
      <div class="container py-3">
        <h1 class="page_title">關於CrossGate</h1>
        <div class="py-3 px-3 px-md-5">
          <p class="text-justify">
            這是一個練習 Vue 的作品，至於為什麼要叫做 CrossGate 呢？答案是因為作者很喜歡魔力寶貝，本來是想做個這一系列的主題商城，但註冊完 API 才發現，
            尷尬了...可以用的素材圖怎麼這麼少！後來弄著弄著就變成販售 Switch、PS4、3DS 的商城了，希望各位喜歡。
            <em class="blockquote-footer">不過還是私心的置入一些魔力寶貝的圖片(笑)</em>
          </p>
        </div>
        <h2 class="page_title">本期熱銷商品</h2>
        <prodSilder :products-data="tempProduct"></prodSilder>
      </div>
      <footerSection></footerSection>
    </div>
</template>



<script>
import navbarFront from './navbarFront';
import alertMessage from './AlertMessage';
import footerSection from './footer';
import topSilder from './topsilder';
import prodSilder from './prodsilder';
export default {
  components: {
    navbarFront,
    alertMessage,
    footerSection,
    topSilder,
    prodSilder,
  },
  data() {
    return {
      tempProduct: [],
      isLoading: false,
    }
  },
  methods:{
    getProducts() {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        if (response.data.success) {
          vm.tempProduct = response.data.products;
          vm.isLoading = false;
        }
      })
    },
  },
  created() {
    this.getProducts();
  }
}
</script>


