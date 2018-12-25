<template>
    <div class="container">
        <orderCheckout :option="option"></orderCheckout>
    </div>
</template>

<script>
import topSilder from '@/components/topsilder';
import prodSilder from '@/components/prodsilder';
import orderCheckout from '@/components/pages/orderCheckout';
export default {
  components: {
    topSilder,
    prodSilder,
    orderCheckout,
  },
  data() {
    return {
      option:{
        redirePath:'/shopping',
      }
    }
  },
}
</script>


