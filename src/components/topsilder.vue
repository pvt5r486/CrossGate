<template>
    <div class="container px-0 mb-3">
      <swiper :options="swiperOption">
        <swiper-slide v-for="(item, index) in sliderImg" :key="index">
          <div class="slide" :style="`background-image: url('${item.imgPath}');`" :title="`${item.info}`"></div>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div> 
</template>


<script>
//引用swiper
import $ from 'jquery';
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
name: 'topSilder',
  data() {
      return {
        swiperOption: {
          loop: true,
          spaceBetween: 30,
          centeredSlides: true,
          grabCursor:true,
          autoplay: {
            delay: 10000,
            disableOnInteraction: false
          },
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
        },
        sliderImg:[
          {
            imgPath:'static/silderImg/Call-of-Duty-Black-Ops-3-Logo.jpg',
            info:'決勝時刻：黑色行動III Call of Duty Black Ops III',
          },
          {
            imgPath:'static/silderImg/mariorabbids-kingdom-battle.jpg',
            info:'瑪利歐+瘋狂兔子 王國之戰 - Mario Rabbids KINDOM BATTLE',
          },
          {
            imgPath:'static/silderImg/Dragon-Quest-VII-3DS.jpg',
            info:'勇者鬥惡龍VII 伊甸的戰士們 - Dragon Quest VII',
          }
        ]
      }
  },
  components: {
    swiper,
    swiperSlide
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
    height: 300px;
    @media (min-width: 768px) {
      height: 400px;
    }   
}
.slide{
    height: 100%;
    background-position: center center;
    background-size: cover;
}
</style>
