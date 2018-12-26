<template>
	<div>
		<div class="container">
			<h1 class="page_title my-4">我的購物訂單</h1>
			<orders :option="option"></orders>
		</div>    
	</div>
</template>


<script>
import orders from '@/components/pages/orders';
export default {
  components: {
    orders,
  },
  data() {
    return {
			option:{
				delFuntion:false,
				editFunction:false,
				gopayPath:'/orderCheckout/',
			}
    }
  },
}
</script>