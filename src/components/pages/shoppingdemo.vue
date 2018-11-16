<template>
  <div>
    <loading :active.sync="isLoading">
      <img src="@/assets/img/loading.gif" alt="" width="200">
    </loading>
    <div class="row mt-4">
      <div class="col-lg-4 col-sm-6 mb-4" v-for="item in products" :key="item.id">
        <div class="card border-0 shadow-sm h-100">
          <div style="height: 200px; background-size: cover; background-position: center top" :style="{backgroundImage:`url(${item.imageUrl})`}">
          </div>
          <div class="card-body">
            <span class="badge float-right ml-2" :class="{'badge-danger': item.category ==='Switch',
            'badge-main': item.category ==='3DS',
            'badge-dark': item.category ==='PS4',}">{{item.category}}
            </span>
            <h5 class="card-title text-truncate">
              <a href="#" class="text-dark">{{item.title}}</a>
            </h5>
            <p class="card-text multiple-line-truncate">{{item.description}}</p>
            <div class="d-flex justify-content-between align-items-baseline flex-wrap">
              <div class="h5 text-main ml-auto" v-if="!item.price">售價 {{item.origin_price | currency}} 元</div>
              <del class="h6 text-dontcare " v-if="item.price">原價 {{item.origin_price | currency}} 元</del>
              <div class="h5 text-danger font-weight-bold" v-if="item.price">破盤價 {{item.price | currency}} 元</div>
            </div>
          </div>
          <div class="card-footer">
            <button type="button" class="btn btn-outline-main btn-block" @click="getProduct(item.id)">
              <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
              查看更多
            </button>
            <button type="button" class="btn btn-becare text-main btn-block font-weight-bold"
              @click="addtoCart(item.id)" :disabled="status.loadingItem != '' ">
              <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id" ></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
    <pagination :page-data="pagination" @changepage="getProducts" class="d-flex justify-content-center"></pagination>
    <a href="#" class="btn btn-main btn-lg rounded-circle shopcartIcon" @click.prevent="myshopCart">
      <i class="fas fa-shopping-cart"></i>
      <span class="count" v-if="shopCart.carts">{{shopCart.carts.length}}</span>
    </a>
    <!-- Modal -->
    <div class="modal fade" id="productInfoModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-main text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>{{product.title}}</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true" class="text-white">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img :src="product.imageUrl" class="img-fluid" alt="">
            <blockquote class="blockquote mt-4">
              <p class="mb-0">{{ product.description }}</p>
              <footer class="blockquote-footer text-right mt-3">{{ product.content }}</footer>
            </blockquote>
            <div class="d-flex justify-content-between align-items-baseline flex-wrap">
              <div class="h4 text-main ml-auto" v-if="!product.price">售價 {{product.origin_price | currency}} 元</div>
              <del class="h6 text-dontcare" v-if="product.price">原價 {{product.origin_price | currency}} 元</del>
              <div class="h4 text-danger font-weight-bold" v-if="product.price">破盤價 {{product.price | currency}} 元</div>
            </div>
            <select name="" class="form-control mt-3" v-model="product.buyNum">
              <option :value="num" v-for="num in 10" :key="num" >
                選購 {{num}} {{product.unit}}
              </option>
            </select>
          </div>
          <div class="modal-footer">
            <div class="text-muted text-nowrap mr-3">
              小計 <strong v-if="product.price">{{product.buyNum * product.price | currency}}</strong>
              <strong v-else>{{product.buyNum * product.origin_price | currency}}</strong>
               元
            </div>
            <button type="button" class="btn btn-becare text-main" @click="addtoCart(product.id,product.buyNum)" :disabled="status.loadingItem != '' ">
              <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === product.id"></i>加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="shopCartModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-main text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>我的購物車</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true" class="text-white">&times;</span>
            </button>
          </div>
          <div class="modal-body">

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-main">
              繼續逛逛
            </button>
            <button type="button" class="btn btn-becare text-main">
              去結帳
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import alertMessage from '@/components/AlertMessage';
export default {
  name: 'shoppingDemo',
  components: {
    alertMessage
  },
  data() {
    return {
      products: [],
      product: {},
      shopCart:{},
      pagination: {},
      isLoading: false,
      status:{
        //判斷目前在loading的是哪個產品的id
        loadingItem:'',
      },
    }
  },
  methods: {
    getProducts(page = 1) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products?page=${page}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        //console.log('產品清單API狀態', response.data.success);
        vm.products = response.data.products;
        //console.log(response.data);
        vm.isLoading = false;
        vm.pagination = response.data.pagination;
      })
    },
    getProduct(id) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${id}`;
      const vm = this;
      vm.status.loadingItem = id;
      this.$http.get(api).then(response => {
        vm.product = response.data.product;
        vm.$set(vm.product, 'buyNum', 1);
        //console.log(response.data.product);
        $('#productInfoModal').modal('show');
        vm.status.loadingItem = '';    
      })
    },
    addtoCart(id,qty = 1){
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      const vm = this;
      vm.status.loadingItem = id;
      const cart = {
        product_id:id,
        qty,
      }
      this.$http.post(api,{data: cart}).then(response => {
        console.log(response.data);
        if (response.data.success) {
          vm.status.loadingItem = '';
          vm.getCart();
          $('#productInfoModal').modal('hide');
          vm.$bus.$emit('message:push', `${response.data.data.product.title} 
            ${response.data.data.qty} ${response.data.data.product.unit} 
            ${response.data.message}`, 'success');
        } else {
          $('#productInfoModal').modal('hide');
          vm.$bus.$emit('message:push', response.data.message, 'danger');
        }
      })
    },
    getCart(){
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        console.log(response.data.data);
        vm.shopCart = response.data.data;
        vm.isLoading = false;
      });
    },
    myshopCart(){
      $('#shopCartModal').modal('show');
    }
  },
  created() {
    this.getProducts();
    this.getCart();
  }
}
</script>

<style lang="scss" scoped>
.shopcartIcon{
  position: fixed;
  right:20px;
  bottom:20px;
  .count{
    display: block;
    position: absolute;
    width: 25px;
    height: 25px;
    line-height: 25px;
    right: -8px;
    top: -8px;
    background-color: red;
    font-size: 12px;
    border-radius: 50%;
    text-align: center;
  }
}
</style>


