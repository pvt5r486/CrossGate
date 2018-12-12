<template>
    <div>
      <alertMessage></alertMessage>
      <navbarFront :cart-data="shopCart"></navbarFront>
      <footerSection></footerSection>
    </div>
</template>



<script>
import navbarFront from '@/components/navbarFront';
import alertMessage from '@/components/AlertMessage';
import footerSection from '@/components/footer';
export default {
  components: {
    navbarFront,
    alertMessage,
    footerSection,
  },
  data() {
    return {
      shopCart:{},
    }
  },
  methods:{
    getCart(){
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      const vm = this;
      this.$http.get(api).then(response => {
        vm.shopCart = response.data.data;
        //由getCart() 統一關閉 vm.status.loadingItem 這樣比較沒有時間差
        vm.status.loadingItem = '';
      });
    },
  },
  created() {
    const vm = this;
    vm.getCart();
  }
}
</script>


