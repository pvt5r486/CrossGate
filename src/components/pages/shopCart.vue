<template>
    <div>
        <loading :active.sync="isLoading">
            <img src="@/assets/img/loading.gif" alt="" width="200">
        </loading>
        <div v-if="shopCart.carts && shopCart.carts.length != 0" class="container mb-3">
            <div class="row">
                <div class="col-md-8">
                  <template v-if="!creatOrder">
                    <h1 class="page_title my-4">購物車內容</h1>
                    <keep-alive>
                      <shopCartList :list-data="shopCart" :loading-item="status.loadingItem" :status="status" @doit="delCartItem"></shopCartList>
                    </keep-alive>    
                  </template>
                  <template v-else>
                    <div class="form-row text-center mt-3">
                      <div class="col-12 col-sm">
                          <div class="alert alert-success alert-rounded shadow-sm" role="alert">
                              1.輸入收件人資訊
                          </div>
                      </div>
                      <div class="col-12 col-sm">
                          <div class="alert alert-secondary alert-rounded shadow-sm" role="alert">
                              2.確認付款
                          </div>
                      </div>
                      <div class="col-12 col-sm">
                          <div class="alert alert-secondary alert-rounded shadow-sm" role="alert">
                              3.完成
                          </div>
                      </div>
                    </div>
                    <h1 class="page_title my-4">收件人資訊</h1>
                    <form class="px-3">
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
                          <textarea name="message" id="usermessage" class="form-control" cols="30" rows="10" v-model="form.message" placeholder="如果貨品有特殊需求，請在此填入"></textarea>
                        </div>
                        <button class="btn btn-outline-main btn-block btn-lg font-weight-bold rounded-0 mb-4" type="submit" @click.prevent="createdOrder">
                          <i class="fas fa-envelope mr-1"></i>送出訂單
                        </button>    
                    </form>
                  </template>
                </div>
                <div class="col-md-4">
                  <div class="mt-4 p-3 bg-becare text-main">
                    <h2 class="text-center  h3 border-bottom border-main mb-0 pb-2 font-weight-bold">訂單摘要</h2>
                    <ul class="mt-3 mb-0" v-if="shopCart.total > shopCart.final_total">
                      <li class="d-flex justify-content-between align-items-center text-main">
                        <span>總計</span>
                        <del>{{shopCart.total | currency}}</del>
                      </li>
                      <li class="d-flex justify-content-between align-items-center h4 font-weight-bold my-1">
                        <span>優惠價</span>
                        <span class="text-danger">{{shopCart.final_total | currency}}</span>
                      </li>
                    </ul>
                    <ul class="mt-3 mb-0" v-else>
                      <li class="d-flex justify-content-between align-items-center h4 font-weight-bold">
                        <span>總計</span>
                        <span class="text-danger">{{shopCart.final_total | currency}}</span>
                      </li>
                    </ul>
                    <div class="input-group my-3" v-if="!creatOrder">
                      <input type="text" class="form-control" id="coupontext" v-model="coupon_code" placeholder="請輸入優惠碼" aria-label="請輸入優惠碼">
                        <div class="input-group-append">
                          <button class="btn btn-main" type="button" @click="addCouponCode" :disabled="status.loadingIcon || status.loadingItem != ''" >
                            <i class="fas fa-spinner fa-spin mr-1" v-if="status.loadingIcon"></i>套用優惠券
                          </button>
                        </div>
                    </div>
                  </div>
                  <button class="btn btn-main btn-lg btn-block rounded-0" 
                    :disabled="status.loadingIcon || status.loadingItem != ''" @click="creatOrder=true" v-if="!creatOrder">送出訂單</button>
                  <button class="btn btn-main btn-lg btn-block rounded-0" 
                    :disabled="status.loadingIcon || status.loadingItem != ''" @click="creatOrder=false" v-else>取消</button>
                </div>
            </div>
        </div>
        <div v-else class="container d-flex flex-column justify-content-center" style="min-height:calc(100vh - 85px - 213.88px - 66px)">
            <div class="alert alert-warning text-center mt-3 mb-5 p-5" role="alert">親 , 購物車內沒有品項哦</div>
            <h1 class="page_title mb-3">繼續逛逛？</h1>
            <div class="d-flex justify-content-center pt-3 pb-5">
                <router-link class="go_crossgate" to="/shopping" >前往 CrossGate <i class="fas fa-caret-right ml-1"></i></router-link>
            </div>
        </div>
    </div>
</template>

<script>
import shopCartList from '@/components/shopCartList';
export default {
  components: {
    shopCartList,
  },
  data() {
    return {
      shopCart:{},
      isLoading: false,
      status:{
        loadingItem:'',
        loadingIcon:false
      },
      coupon_code:'',
      creatOrder:false,
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
    getCart(){
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        vm.shopCart = response.data.data;
        vm.isLoading = false;
        vm.status.loadingItem = '';
      });
    },
    delCartItem(id,prodName){
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;
      const vm = this;
      vm.status.loadingItem = id;
      this.$http.delete(api).then(response => {
        vm.$bus.$emit('message:push', `${response.data.message}【${prodName}】`, 'success');
        vm.$bus.$emit('shopCart:update');
        vm.getCart();
      });
    },
    addCouponCode(){
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/coupon`;
      const vm = this;
      const coupon = {
        code:vm.coupon_code
      }
      vm.status.loadingIcon = true;
      this.$http.post(api,{data:coupon}).then(response => {
        //console.log(response);
        if(response.data.success){
          vm.$bus.$emit('message:push', `${response.data.message}`, 'success');
        }else{
          vm.$bus.$emit('message:push', `${response.data.message}`, 'danger');
        }
        vm.status.loadingIcon = false;
        vm.coupon_code='';
        vm.getCart();
      });
    },
    createdOrder(){
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order`;
      const vm = this;
      const order = vm.form;
      this.$validator.validate().then((result) => {
        if (result) {
          vm.isLoading = true;
          this.$http.post(api,{data:order}).then(response => {
            if(response.data.success){
              vm.$bus.$emit('shopCart:update');
              vm.$bus.$emit('message:push', `${response.data.message}`, 'success');
              vm.$router.push(`/orderCheckout/${response.data.orderId}`);
            }else{
              vm.$bus.$emit('message:push', `${response.data.message}`, 'danger');
            }
            vm.isLoading = false;
            vm.getCart();
          });
        }else{
          vm.$bus.$emit('message:push', `噢！訂單內有欄位空白唷`, 'danger');
        }
      });
    },
  },
  created() {
    const vm = this;
    vm.getCart();
  }
}
</script>


