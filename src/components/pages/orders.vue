<template>
    <div>
        <loading :active.sync="isLoading">
            <img src="@/assets/img/loading.gif" alt="" width="200">
        </loading>
        <div class="table-responsive mt-5">
            <table class="table table-hover mt-4">
                <thead class="table-becare">
                    <tr class="text-nowrap">
                        <th width="100">下單時間</th>
                        <th width="250">訂購人資訊</th>
                        <th>購買品項</th>
                        <th>備註</th>
                        <th width="100">總金額</th>
                        <th width="160">是否付款</th>
                        <th width="80">操作</th>
                    </tr>
                </thead>
                <tbody class="bg-white">
                    <tr v-for="item in orders" :key="item.id" v-if="!item.is_delete">
                        <td>{{item.create_at | timeTamps}}</td>
                        <td>
                            <ul>
                                <li>訂單ID<br>{{item.id}}
                                <li>訂購人：{{item.user.name}}</li>
                                <li>信箱：{{item.user.email}}</li>
                                <li>住址：{{item.user.address}}</li>
                                <li>電話：{{item.user.tel}}</li>
                            </ul>
                        </td>
                        <td>
                            <ul>
                                <li v-for="prod in item.products" :key="prod.id" class="mb-2">
                                    <div class="text-nowrap"> 
                                        {{prod.product.title}}<br>
                                        {{prod.qty}} {{prod.product.unit}} - 
                                        <span class="text-main" v-if="prod.final_total >= prod.total">{{prod.final_total | currency}}</span>
                                        <span class="text-danger" v-if="prod.final_total < prod.total">{{prod.final_total | currency}} ({{prod.coupon.title}})</span>
                                    </div>
                                </li>
                            </ul>
                        </td>
                        <td>
                            {{item.message}}
                        </td>
                        <td class="text-right">{{item.total | currency}}</td>
                        <td>
                            <ul v-if="item.is_paid">
                                <li class="text-success font-weight-bold">已付款</li>
                                <li>{{item.paid_date | timeTamps}}</li>
                            </ul>
                            <span v-else>未付款</span>
                        </td>
                        <td>
                            <button class="btn btn-outline-main btn-block" @click="editModal(item)">編輯</button>
                            <button class="btn btn-outline-secondary btn-block" v-if="!item.is_paid" @click="delModal(item)">刪除</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <pagination :page-data="pagination" @changepage="getOrders" class="d-flex justify-content-center"></pagination>    
        <modal id="editOrderModal">
            <div slot="modalHeader" class="modal-header bg-main text-white">
                <h5 class="modal-title" id="exampleModalLabel">
                    <span>編輯訂單</span>
                </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true" class="text-white">&times;</span>
                </button>
            </div>
            <div slot="modalBody" class="modal-body">
                <nav>
                    <div class="nav nav-tabs" id="nav-tab" role="tablist">
                        <a class="nav-item nav-link font-weight-bold active" id="nav-orderinfo-tab" data-toggle="tab" href="#nav-orderinfo" role="tab" aria-controls="nav-orderinfo" aria-selected="true">訂購人資料</a>
                        <a class="nav-item nav-link font-weight-bold " id="nav-prodlist-tab" data-toggle="tab" href="#nav-prodlist" role="tab" aria-controls="nav-prodlist" aria-selected="false">訂購清單</a>
                    </div>
                </nav>
                <div class="tab-content" id="nav-tabContent">
                    <div class="tab-pane fade show active pt-3" id="nav-orderinfo" role="tabpanel" aria-labelledby="nav-orderinfo-tab">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="orderName">*訂購人</label>
                                        <input type="text" class="form-control" id="orderName" name="Name" v-model="tempOrder.user.name" placeholder="請輸入姓名"
                                            v-validate="'required'" :class="{'is-invalid': errors.has('Name')}">
                                        <span class="text-danger" v-if="errors.has('Name')">請輸入訂購人姓名</span>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="orderEmail">*信箱</label>
                                        <input type="email" class="form-control" :class="{'is-invalid': errors.has('email')}" name="email" id="orderEmail"
                                            v-model="tempOrder.user.email" placeholder="請輸入 Email" v-validate="'required|email'" >
                                        <span class="text-danger" v-if="errors.has('email')">{{errors.first('email')}}</span>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="orderAddress">*住址</label>
                                        <input type="text" class="form-control" id="orderAddress" name="address" :class="{'is-invalid': errors.has('address')}"
                                            v-model="tempOrder.user.address" placeholder="請輸入住址"  v-validate="'required'">
                                        <span class="text-danger" v-if="errors.has('address')">地址欄位不得留空</span>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="orderTel">*電話</label>
                                        <input type="tel" class="form-control" id="orderTel" name="regex" v-model="tempOrder.user.tel" 
                                            v-validate="{ required: true, regex: /^([0-9]+)$/ }" placeholder="請輸入電話" :class="{'is-invalid': errors.has('regex')}">
                                        <span class="text-danger" v-if="errors.has('regex')">僅接受純數字</span>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="textarea">備註</label>
                                    <textarea class="form-control" id="textarea" rows="3" v-model="tempOrder.message" placeholder="請輸入備註"></textarea>
                                </div>
                                <div class="form-group">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="is_paid" v-model="tempOrder.is_paid">
                                        <label class="form-check-label" for="is_paid">是否付款</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade pt-3" id="nav-prodlist" role="tabpanel" aria-labelledby="nav-prodlist-tab">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-row" v-for="(item,key, index) in tempOrder.products" :key="item.id">
                                    <div class="form-group col-md-9">
                                        <div class="input-group">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text bg-main text-white" id="basic-addon1">產品項目 {{index +1}}</span>
                                            </div>
                                            <input type="text" class="form-control"  aria-label="prodName" style="cursor:default;" readonly
                                                v-model="item.product.title">
                                        </div>
                                        <p v-if="item.coupon" class="text-danger font-weight-bold mb-0">
                                            <span>*套用{{item.coupon.title}} 中 - </span>
                                            <span>{{(item.product.price * item.coupon.percent) / 100 | currency}} 1/套</span>
                                        </p>
                                        <p v-else class="text-dontcare mb-0">
                                            <span >未套用酷碰優惠 - </span>
                                            <span>{{item.product.price | currency}} 1/{{item.product.unit}}</span>
                                        </p>
                                    </div>
                                    <div class="form-group col-md-3">
                                        <div class="input-group">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text bg-main text-white" id="basic-addon1">*數量</span>
                                            </div>
                                            <input type="number" class="form-control"  aria-label="num"  v-model="item.qty" :name="`num${index}`"
                                                v-validate="{ required: true, regex: /^([0-9]+)$/ }" placeholder="請輸入數量" :class="{'is-invalid': errors.has('num' + index)}">
                                        </div>
                                        <p class="mb-0  text-dontcare text-right">
                                            <span v-if="item.coupon">小計 {{((item.product.price * item.coupon.percent) / 100) * item.qty | currency}}</span>
                                            <span v-else>小計 {{(item.product.price * item.qty) | currency}}</span>
                                        </p>
                                    </div>
                                </div>
                                <div class="text-right text-danger font-weight-bold">總計 {{calcFinalTotal | currency}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div slot="modalFooter" class="modal-footer">
                <button type="button" class="btn btn-outline-secondary border-0" data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-becare text-main" @click="updateOrder" :disabled="status.loading">
                    <i class="fas fa-spinner fa-spin mr-1" v-if="status.loading"></i>確認
                </button>
            </div>
        </modal>
        <modal id="delOrderModal" :isloading="status.loading" @doit="deleteOrder">
            <div slot="modalHeader" class="modal-header bg-danger text-white">
                <h5 class="modal-title" id="exampleModalLabel">
                    <span>刪除訂單</span>
                </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true" class="text-white">&times;</span>
                </button>
            </div>
            <div slot="modalBody" class="modal-body">
                <div>是否<span class="text-danger">刪除</span>該筆訂單?</div>      
                <ul v-if="tempOrder.user" class="list-group my-3">
                    <li class="list-group-item list-group-item-warning">訂單 ID：{{tempOrder.id}}</li>
                    <li class="list-group-item list-group-item-light">下單時間：{{tempOrder.create_at | timeTamps}}</li>
                    <li class="list-group-item list-group-item-light">訂購人：{{tempOrder.user.name}}</li>
                    <li class="list-group-item list-group-item-light">信箱：{{tempOrder.user.email}}</li>
                    <li class="list-group-item list-group-item-light">住址：{{tempOrder.user.address}}</li>
                    <li class="list-group-item list-group-item-light">電話：{{tempOrder.user.tel}}</li>
                    <li class="list-group-item list-group-item-light">
                        <span class="font-weight-bold text-main">- 品項 -</span>
                        <div v-for="prod in tempOrder.products" :key="prod.id">
                            {{prod.product.title}} * {{prod.qty}}
                        </div>        
                    </li>
                    <li class="list-group-item list-group-item-light text-right text-main font-weight-bold">
                         總金額：{{tempOrder.total | currency}}
                    </li>
                </ul>
            </div>
        </modal>
    </div>
</template>


<script>
import $ from 'jquery';
export default {
  data() {
    return {
      orders: [],
      pagination: {},
      isLoading: false,
      tempOrder:{
          user:{},
          products:{},
      },
      status:{
        loading:false,
      },
    }
  },
  methods: {
    editModal(item) {
      //效力只有一層
      //this.tempOrder = Object.assign({}, item);
      //用JSON.stringify把物件轉成字串,再用JSON.parse把字串轉成新的物件
      this.tempOrder = JSON.parse(JSON.stringify(item));
      this.$validator.reset();
      $('#editOrderModal').modal('show');
    },
    delModal(item){
      this.tempOrder = Object.assign({}, item);
      $('#delOrderModal').modal('show');
    },
    getOrders(page = 1) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/orders?page=${page}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then(response => {
          vm.orders = response.data.orders;
          vm.pagination = response.data.pagination;
          vm.isLoading = false;
      })
    },
    deleteOrder(){
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/order/${vm.tempOrder.id}`;
      vm.status.loading = true;
      vm.tempOrder.is_delete = true;
      this.$http.put(api,{data:vm.tempOrder}).then(response => {
        if (response.data.success) {
            $('#delOrderModal').modal('hide');
            vm.status.loading = false;
            vm.getOrders(vm.pagination.current_page);
            vm.$bus.$emit('message:push', response.data.message, 'success');
        } 
      })
    },
    updateOrder(){
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/order/${vm.tempOrder.id}`;
      this.$validator.validate().then((result) => { 
          if (result) {
            vm.status.loading = true;
            //資料處理
            if(vm.tempOrder.is_paid){
                const nowDate = new Date();
                vm.tempOrder.paid_date = Math.floor(nowDate / 1000);
            } else {
                vm.tempOrder.paid_date = '';
            }
            let allFinalTotal = 0;
            let objectLength = Object.keys(vm.tempOrder.products).length;
            for (let i = 0 ; i<objectLength;i++){
                //console.log(i);
                let prodID = Object.keys(vm.tempOrder.products)[i];
                let prodObj =  vm.tempOrder.products;
                //console.log(vm.tempOrder.products[prodID].product_id);
                if(prodObj[prodID].coupon){
                    //計算使用優惠券後的單項產品總價
                    prodObj[prodID].final_total = ((prodObj[prodID].qty * prodObj[prodID].product.price) * prodObj[prodID].coupon.percent) / 100;
                    //計算未使用優惠券的單項產品總價
                    prodObj[prodID].total = prodObj[prodID].qty * prodObj[prodID].product.price;
                }else{ 
                    prodObj[prodID].total = prodObj[prodID].qty * prodObj[prodID].product.price;
                    prodObj[prodID].final_total = prodObj[prodID].total;
                }
                allFinalTotal = allFinalTotal + prodObj[prodID].final_total;
            }
            vm.tempOrder.total = allFinalTotal;
            //console.log(vm.tempOrder);
            this.$http.put(api,{data:vm.tempOrder}).then(response => {
                if (response.data.success) {
                    $('#editOrderModal').modal('hide');
                    vm.status.loading = false;
                    vm.getOrders(vm.pagination.current_page);
                    vm.$bus.$emit('message:push', response.data.message, 'success');
                } 
            })
          } else {
            vm.$bus.$emit('message:push', `噢！表單內有欄位空白唷`, 'danger');
          }
      });


    }
  },
  created() {
    this.getOrders();
  },
  computed:{
      calcFinalTotal(){
        const vm = this;
        let allFinalTotal = 0;
        let objectLength = Object.keys(vm.tempOrder.products).length;
        for (let i = 0 ; i<objectLength;i++){
            //console.log(i);
            let prodID = Object.keys(vm.tempOrder.products)[i];
            let prodObj =  vm.tempOrder.products;
            //console.log(vm.tempOrder.products[prodID].product_id);
            if(prodObj[prodID].coupon){
                //計算使用優惠券後的單項產品總價
                prodObj[prodID].final_total = ((prodObj[prodID].qty * prodObj[prodID].product.price) * prodObj[prodID].coupon.percent) / 100;
                //計算未使用優惠券的單項產品總價
                prodObj[prodID].total = prodObj[prodID].qty * prodObj[prodID].product.price;
            }else{ 
                prodObj[prodID].total = prodObj[prodID].qty * prodObj[prodID].product.price;
                prodObj[prodID].final_total = prodObj[prodID].total;
            }
            allFinalTotal = allFinalTotal + prodObj[prodID].final_total;
        }
        return allFinalTotal;
        //console.log(vm.tempOrder);
      }
  }
}
</script>