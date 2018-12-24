<template>
    <div class="prod_card">
        <a class="prod_img" href="#" :style="`background-image: url('${cardData.imageUrl}');`" @click.prevent="prodInfo">
             <span class="categoryTag" :class="cardData.category | category">{{cardData.category}}</span>
        </a>
        <div class="prod_info">
            <h3>{{cardData.title}}</h3>
            <p>{{cardData.description}}</p>
        </div>
        <div class="prod_price">     
            <span>原價 {{cardData.origin_price | currency}}</span>
            <h4>售價 {{cardData.price | currency}}</h4>
        </div>
        <div class="prod_card_footer">
            <div class="row no-gutters">
                <div class="col-6">
                    <button  class="btn btn-block" @click.prevent="prodInfo" :disabled="status.loadingItem != '' ">
                        <i class="fas fa-spinner fa-spin mr-1" v-if="status.loadingItem === cardData.id"></i>
                        <i class="fas fa-search mr-1" v-else></i>詳細介紹
                    </button>
                </div>
                <div class="col-6">
                    <button  class="btn btn-block" @click.prevent="returnProdID" :disabled="status.loadingItem != '' ">
                        <i class="fas fa-spinner fa-spin mr-1" v-if="status.loadingItem === cardData.id"></i>
                        <i class="fas fa-cart-plus mr-1" v-else></i>加到購物車
                    </button>
                </div>
            </div>    
        </div>   
    </div>
</template>

<script>
export default {
  name: 'prodcard',
  props: {
      cardData:{
        type: Object,
        default:function(){
            return {}
        },
      },
      status:{
        type:Object,
        default:function(){
            return {}
        },
    }
  },
  methods: {
    returnProdID(){
      const vm = this;
      vm.$emit('returnProdID', vm.cardData.id);
    },
    prodInfo(){
      const vm = this;
      vm.$router.push(`/productDetail/${vm.cardData.id}`);
    }
  },
}
</script>
