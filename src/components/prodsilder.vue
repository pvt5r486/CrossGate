<template>
    <div class="p-3">
        <swiper :options="swiperOption">
            <swiper-slide v-for="item in productsData" :key="item.id">
                <prodCard :card-data="item" :status="status"></prodCard>
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
  props: {
    productsData:{
      type: Array,
      default:function(){
          return []
      },
    },
    status:{
      type:Object,
      default:function(){
          return {}
      },
    }
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
    }
  },
  mounted(){
    $('.swiper-container').on("mouseenter",function(){
      this.swiper.autoplay.stop();
    });
    $('.swiper-container').on("mouseleave",function(){
      this.swiper.autoplay.start();
    });
  },
}
</script>

<style lang="scss" scoped>
.swiper-container{
    min-height: 370px;
}
</style>
