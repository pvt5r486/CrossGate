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
              <div class="h5 text-main ml-auto" v-if="item.price === item.origin_price">售價 {{item.origin_price | currency}} 元</div>
              <del class="h6 text-dontcare " v-if="item.price && item.price != item.origin_price">原價 {{item.origin_price | currency}} 元</del>
              <div class="h5 text-danger font-weight-bold" v-if="item.price && item.price != item.origin_price">破盤價 {{item.price | currency}} 元</div>
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
      <span class="count" v-if="shopCart.carts && shopCart.carts.length != 0">{{shopCart.carts.length}}</span>
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
              <div class="h5 text-main ml-auto" v-if="product.price === product.origin_price">售價 {{product.origin_price | currency}} 元</div>
              <del class="h6 text-dontcare " v-if="product.price && product.price != product.origin_price">原價 {{product.origin_price | currency}} 元</del>
              <div class="h5 text-danger font-weight-bold" v-if="product.price && product.price != product.origin_price">破盤價 {{product.price | currency}} 元</div>
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
              <span v-if="shopCart.carts && shopCart.carts.length != 0">購物車 - 共 {{shopCart.carts.length}} 件商品</span>
              <span v-else>購物車 - 目前是空的哦</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true" class="text-white">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="table-responsive" v-if="shopCart.carts && shopCart.carts.length != 0">
              <table class="table">
                <thead class="table-becare">
                  <tr class="text-nowrap">
                    <th width="60"></th>
                    <th>商品名稱</th>
                    <th width="80">數量</th>
                    <th width="100">單價</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in shopCart.carts" :key="item.id">
                    <td class="align-middle">
                      <button type="button" class="btn btn-outline-danger btn-sm" @click="delCartItem(item.id,item.product.title)">
                        <i class="far fa-trash-alt"></i>
                      </button>
                    </td>
                    <td class="align-middle">
                      <span class="badge" 
                        :class="{'badge-danger': item.product.category ==='Switch',
                        'badge-main': item.product.category ==='3DS',
                        'badge-dark': item.product.category ==='PS4',}">
                        {{item.product.category}}
                      </span>  
                      {{item.product.title}}
                    </td>
                    <td class="align-middle text-nowrap">{{item.qty}} {{item.product.unit}}</td>
                    <td class="align-middle text-right text-nowrap">{{item.final_total | currency}}</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr class="text-right">
                    <td colspan="3" class="align-middle font-weight-bold">總計</td>
                    <td class="align-middle font-weight-bold">{{ shopCart.total | currency}}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div v-else class="alert alert-becare py-5 mt-3 mb-5 text-center font-weight-bold">
              - 噢 , 很遺憾 , 這裡空空如也 - <br>繼續逛逛 , 好嗎 ?
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-main" @click="closeMyshopCart">
              繼續逛逛
            </button>
            <button type="button" class="btn btn-becare text-main font-weight-bold" v-if="shopCart.carts && shopCart.carts.length != 0">
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
          vm.$bus.$emit('message:push', `【${response.data.data.product.title}】
            ${response.data.data.qty} ${response.data.data.product.unit} 
            ${response.data.message}`, 'success');
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
    },
    closeMyshopCart(){
      $('#shopCartModal').modal('hide');
    },
    delCartItem(id,prodName){
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.delete(api).then(response => {
        //console.log(response.data.message);
        vm.$bus.$emit('message:push', `${response.data.message}【${prodName}】`, 'success');
        vm.isLoading = false;
        vm.getCart();
      });
    },
  },
  created() {
    this.getProducts();
    this.getCart();
  }
}
</script>

