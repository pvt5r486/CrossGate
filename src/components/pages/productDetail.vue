<template>
    <div>
        123
    </div>
</template>

<script>
import topSilder from '@/components/topsilder';
import prodSilder from '@/components/prodsilder';
export default {
  components: {
    topSilder,
    prodSilder,
  },
  data() {
    return {
        productID:'',

    }
  },
  methods: {

  },
  created(){
      this.productID = this.$route.params.prodId;
  }
}
</script>


