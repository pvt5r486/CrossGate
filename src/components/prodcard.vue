<template>
    <div class="prod_card">
        <router-link to="#" class="prod_img" :style="`background-image: url('${cardData.imageUrl}');`">
             <span class="categoryTag" :class="categoryClassName(cardData.category)">{{categoryClassName(cardData.category)}}</span>
        </router-link>
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
    categoryClassName(category){
        let className = '';
        switch (category) {
            case 'Switch':
                return className = 'SW'
                break;     
            case '3DS':
                return className = 'N3DS'
                break;
            case 'PS4':
                return className = 'PS4'
                break;
        }
    },
    returnProdID(){
      const vm = this;
      vm.$emit('returnProdID', vm.cardData.id);
    },
    prodInfo(){
      const vm = this;
      //console.log('還沒做好'+vm.cardData.id);
      vm.$router.push(`productDetail/${vm.cardData.id}`);
    }
  }
}
</script>
