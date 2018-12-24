<template>
    <ul class="cartProdList">
        <li v-for="item in listData.carts"  :key="item.id">
            <img class="cartProdList-img" :src="item.product.imageUrl" alt="">
                <div class="cartProdList-prod">
                    <span class="badge mx-2" :class="item.product.category | category">{{item.product.category}}</span>
                    <h3>
                        <router-link :to="`/productDetail/${item.product.id}`">
                            {{item.product.title}}
                        </router-link>
                    </h3>
                </div>
            <span class="cartProdList-num">{{item.qty}} {{item.product.unit}}</span>
            <span class="cartProdList-price">{{item.product.price | currency}}</span>
            <button type="button" class="ml-3 btn btn-outline-danger btn-sm" @click="doit(item.id,item.product.title)" :disabled="status.loadingItem != '' || status.loadingIcon">
                    <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
                    <i class="far fa-trash-alt" v-else></i>
            </button>
        </li>
    </ul>
</template>


<script>
export default {
  name: 'shopCartList',
  props: {
    listData: {
        type: Object,
        default: function () {
            return {}
        }
    },
    status:{
        type: Object,
        default: function () {
            return {}
        }
    }
  },
  methods: {
        doit(id,tile){
            this.$emit('doit',id,tile);
            console.log(id,tile);
        },
    },
}
</script>