<template>
    <div class="p-3">
      <loading :active.sync="isLoading">
        <img src="@/assets/img/loading.gif" alt="" width="200">
      </loading>
        <swiper :options="swiperOption">
            <swiper-slide v-for="item in products" :key="item.id">
                <prodCard :card-data="item" :status="status" @returnProdID="addtoCart"></prodCard>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
    </div>
</template>


<script>
import $ from 'jquery';
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import prodCard from './prodcard';
export default {
name: 'prodSilder',
  components: {
    swiper,
    swiperSlide,
    prodCard
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 4,
        spaceBetween: 10,
        speed: 600,
        grabCursor:true, 
        autoplay:{
          delay: 5000,
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        breakpoints: {
          480: {
            slidesPerView: 1,
            spaceBetween: 20
          },
          767: {
            slidesPerView: 2,
            spaceBetween: 30
          },
          992: {
            slidesPerView: 3,
            spaceBetween: 30
          }
        }
      },
      products: [],
      status:{
        loadingItem:'',
        loadingIcon:false
      },
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
          vm.products = response.data.products;
          vm.isLoading = false;
        }
      })
    },
    addtoCart(id,qty = 1){
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      const vm = this;
      vm.status.loadingItem = id;
      const cart = {
        product_id:id,
        qty,
      }
      this.$http.post(api,{data: cart}).then(response => {
        if (response.data.success) {
          vm.$bus.$emit('shopCart:update');
          vm.status.loadingItem='';
          vm.$bus.$emit('message:push', `【${response.data.data.product.title}】
            ${response.data.data.qty} ${response.data.data.product.unit} 
            ${response.data.message}`, 'success');
        }
      })
    },
  },
  mounted(){
    $('.swiper-container').on("mouseenter",function(){
      this.swiper.autoplay.stop();
    });
    $('.swiper-container').on("mouseleave",function(){
      this.swiper.autoplay.start();
    });
  },
  created(){
    const vm = this;
    vm.getProducts();
  }
}
</script>

<style lang="scss" scoped>
.swiper-container{
    min-height: 370px;
}
</style>
