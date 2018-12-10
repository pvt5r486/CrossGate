<template>
    <div class="container px-0">
      <swiper :options="swiperOption">
        <swiper-slide v-for="(item, index) in sliderImg" :key="index">
          <div class="slide" :style="`background-image: url('${item.imgPath}');`" :title="`${item.info}`"></div>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
        <div class="swiper-button-prev" slot="button-prev"><i class="fas fa-arrow-left"></i></div>
        <div class="swiper-button-next" slot="button-next"><i class="fas fa-arrow-right"></i></div>
      </swiper>
    </div>
</template>


<script>
//引用swiper
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
name: 'topSilder',
  data() {
      return {
        swiperOption: {
          loop: true,
          spaceBetween: 30,
          centeredSlides: true,
          autoplay: {
            delay: 10000,
            disableOnInteraction: false
          },
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        },
        sliderImg:[
          {
            imgPath:'https://www.qsf5.com/wp-content/uploads/2016/01/Call-of-Duty-Black-Ops-3-Logo.jpg',
            info:'決勝時刻：黑色行動III Call of Duty Black Ops III',
          },
          {
            imgPath:'https://www.qsf5.com/wp-content/uploads/2018/07/mariorabbids-kingdom-battle.jpg',
            info:'瑪利歐+瘋狂兔子 王國之戰 - Mario Rabbids KINDOM BATTLE',
          },
          {
            imgPath:'https://www.qsf5.com/wp-content/uploads/2017/01/Dragon-Quest-VII-3DS.jpg',
            info:'勇者鬥惡龍VII 伊甸的戰士們 - Dragon Quest VII',
          }
        ]
      }
  },
  components: {
    swiper,
    swiperSlide
  }
}
</script>