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
              <table class="table table-hover table-sm">
                <thead class="table-becare">
                  <tr class="text-nowrap">
                    <th width="30" class="p-1"></th>
                    <th>選購商品</th>
                    <th width="80" class="d-none d-md-table-cell">數量</th>
                    <th width="100">單價</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in shopCart.carts" :key="item.id">
                    <td class="align-middle">
                      <button type="button" class="btn btn-outline-danger btn-sm border-0" @click="delCartItem(item.id,item.product.title)">
                        <i class="far fa-trash-alt"></i>
                      </button>
                    </td>
                    <td class="align-middle">
                      <span class="badge d-none d-md-inline-block" 
                        :class="{'badge-danger': item.product.category ==='Switch',
                        'badge-main': item.product.category ==='3DS',
                        'badge-dark': item.product.category ==='PS4',}">
                        {{item.product.category}}
                      </span>
                        <p class="mb-0">{{item.product.title}}<br>
                          <span class="text-right d-md-none">{{item.qty}} {{item.product.unit}}</span> 
                        </p> 
                      <div class="text-success" v-if="item.coupon">     
                        <small>已套用{{item.coupon.title}}</small>          
                      </div>
                    </td>
                    <td class="align-middle text-nowrap d-none d-md-table-cell">{{item.qty}} {{item.product.unit}}</td>
                    <td class="align-middle text-right text-nowrap" v-if="item.total !== item.final_total">
                      <div class="text-dontcare">
                        <em><del>{{item.total | currency}}</del></em>
                      </div>            
                      <div>     
                        {{item.final_total | currency}}      
                      </div>
                    </td>
                    <td class="align-middle text-right text-nowrap" v-else>            
                        {{item.final_total | currency}}      
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr class="text-right" v-if="shopCart.final_total == shopCart.total ">
                    <td></td>
                    <td class="d-none d-md-table-cell"></td>
                    <td class="align-middle">總計</td>
                    <td class="align-middle">{{ shopCart.total | currency}}</td>
                  </tr>
                  <tr class="text-right text-dontcare" v-else>
                    <td></td>
                    <td class="d-none d-md-table-cell"></td>
                    <td class="align-middle"><em>總計</em></td>
                    <td class="align-middle"><em><del>{{ shopCart.total | currency}}</del></em></td>
                  </tr>
                  <tr class="text-right text-danger" v-if="shopCart.final_total !== shopCart.total ">
                    <td></td>
                    <td class="d-none d-md-table-cell"></td>
                    <td class="align-middle font-weight-bold">折扣價</td>
                    <td class="align-middle font-weight-bold">{{ shopCart.final_total | currency}}</td>
                  </tr>
                </tfoot>
              </table>
              <div class="input-group mb-3 px-1">
                <input type="text" class="form-control" id="coupontext" v-model="coupon_code" placeholder="請輸入優惠碼" aria-label="請輸入優惠碼">
                <div class="input-group-append">
                  <button class="btn btn-outline-secondary" type="button" @click="addCouponCode" :disabled="!coupon_code">套用優惠券</button>
                </div>
              </div>
            </div>
            <div v-else class="alert alert-becare py-5 text-center font-weight-bold mb-0">
              - 噢 , 很遺憾 , 這裡空空如也 - <br>繼續逛逛 , 好嗎 ?
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-main" @click="closeMyshopCart">
              繼續逛逛
            </button>
            <button type="button" class="btn btn-becare text-main font-weight-bold" v-if="shopCart.carts && shopCart.carts.length != 0" @click="orderModal">
              去結帳
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="OrderModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-main text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>建立訂單</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true" class="text-white">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row justify-content-center">
              <form class="col-md-12">
                <div class="form-group">
                  <label for="useremail">*Email</label>
                  <input type="email" class="form-control" :class="{'is-invalid': errors.has('email')}" name="email" id="useremail"
                    v-model="form.user.email" placeholder="請輸入 Email" v-validate="'required|email'" autofocus>
                  <span class="text-danger" v-if="errors.has('email')">{{errors.first('email')}}</span>
                </div>
              
                <div class="form-group">
                  <label for="username">*收件人姓名</label>
                  <input type="text" class="form-control" :class="{'is-invalid': errors.has('name')}" name="name" id="username"
                    v-model="form.user.name" v-validate="'required'" placeholder="輸入姓名">
                  <span class="text-danger" v-if="errors.has('name')">請輸入姓名</span>
                </div>
              
                <div class="form-group">
                  <label for="usertel">*收件人電話</label>
                  <input type="tel" class="form-control" id="usertel" name="regex" v-model="form.user.tel" 
                    v-validate="{ required: true, regex: /^([0-9]+)$/ }" placeholder="請輸入電話" :class="{'is-invalid': errors.has('regex')}">
                  <span class="text-danger" v-if="errors.has('regex')">僅接受純數字</span>
                </div>
              
                <div class="form-group">
                  <label for="useraddress">*收件人地址</label>
                  <input type="address" class="form-control"  :class="{'is-invalid': errors.has('address')}" name="address" id="useraddress" 
                    v-model="form.user.address" placeholder="請輸入地址" v-validate="'required'">
                  <span class="text-danger" v-if="errors.has('address')">地址欄位不得留空</span>
                </div>
              
                <div class="form-group">
                  <label for="usermessage">特殊需求</label>
                  <textarea name="message" id="usermessage" class="form-control" cols="30" rows="10" v-model="form.message"
                    placeholder="如果貨品有特殊需求，請在此填入"></textarea>
                </div>
                <div class="text-right">
                  <button class="btn btn-becare" type="submit" @click.prevent="createdOrder">送出訂單</button>
                </div>
              </form>
            </div>
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
      coupon_code:'',
      form:{
        user:{
          name:'',
          email:'',
          tel:'',
          address:'',
        },
        message:'',
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
    addCouponCode(){
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/coupon`;
      const vm = this;
      const coupon = {
        code:vm.coupon_code
      }
      vm.isLoading = true;
      this.$http.post(api,{data:coupon}).then(response => {
        //console.log(response);
        if(response.data.success){
          vm.$bus.$emit('message:push', `${response.data.message}`, 'success');
        }else{
          vm.$bus.$emit('message:push', `${response.data.message}`, 'danger');
        }
        vm.isLoading = false;
        vm.coupon_code='';
        vm.getCart();
      });
    },
    orderModal(){
      const vm = this;
      vm.isLoading = true;
      $('#shopCartModal').modal('hide');
      setTimeout(() => {
        vm.isLoading = false;
        $('#OrderModal').modal('show');  
      }, 1000)   
    },
    createdOrder(){
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order`;
      const vm = this;
      const order = vm.form;
      this.$validator.validate().then((result) => {
        if (result) {
          vm.isLoading = true;
          this.$http.post(api,{data:order}).then(response => {
            //console.log('訂單已建立',response);
            if(response.data.success){
              vm.$bus.$emit('message:push', `${response.data.message}`, 'success');
            }else{
              vm.$bus.$emit('message:push', `${response.data.message}`, 'danger');
            }
            vm.isLoading = false;
            //後續處理
            $('#OrderModal').modal('hide');
            vm.getCart();
          });
        }else{
          vm.$bus.$emit('message:push', `噢！訂單內有欄位空白唷`, 'danger');
        }
      });
    }
  },
  created() {
    this.getProducts();
    this.getCart();
  }
}
</script>

