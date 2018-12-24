<template>
    <div>
        <loading :active.sync="isLoading">
            <img src="@/assets/img/loading.gif" alt="" width="200">
        </loading>
        <div class="my-5 row justify-content-center">
            <form class="col-md-8" @submit.prevent="payOrder">
                <h3 class="text-center text-main">
                    <i class="fas fa-shopping-cart mr-2"></i>購買商品清單
                </h3>
                <div class="table-responsive">
                    <shopCartTable>
                        <thead slot="tableHead" class="table-becare">
                            <tr class="text-nowrap">
                                <th>品名</th>
                                <th width="80">數量</th>
                                <th width="80">單價</th>
                            </tr>
                        </thead>
                        <tbody slot="tableBody" class="bg-white">
                            <tr v-for="item in order.products" :key="item.id">
                                <td class="align-middle">
                                    <p class="mb-0">
                                        <span class="badge d-none d-md-inline-block" :class="item.product.category | category">
                                            {{item.product.category}}
                                        </span>
                                        {{item.product.title}}
                                        <span class="text-right d-md-none">{{item.qty}} {{item.product.unit}}</span> 
                                    </p> 
                                    <div class="text-success" v-if="item.coupon">     
                                        <small>已套用{{item.coupon.title}}</small> 
                                    </div>
                                </td>
                                <td class="align-middle">{{ item.qty }}/{{ item.product.unit}}</td>
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
                        <tfoot slot="tableFooter" class="bg-white">
                            <tr>
                                <td colspan="2" class="text-right">總計</td>
                                <td class="text-right text-danger font-weight-bold">{{ order.total | currency}}</td>
                            </tr>
                        </tfoot>
                    </shopCartTable>
                </div>
                <h3 class="text-center text-main mt-4"><i class="fas fa-user-circle mr-2"></i>購買人資料</h3>
                <div class="table-responsive">
                    <table class="table">
                        <tbody class="bg-white">
                            <tr>
                                <th width="100" class="table-success align-middle">Email</th>
                                <td>{{ order.user.email }}</td>
                            </tr>
                            <tr>
                                <th class="table-success  align-middle">姓名</th>
                                <td>{{ order.user.name }}</td>
                            </tr>
                            <tr>
                                <th class="table-success  align-middle">電話</th>
                                <td>{{ order.user.tel }}</td>
                            </tr>
                            <tr>
                                <th class="table-success  align-middle">地址</th>
                                <td>{{ order.user.address }}</td>
                            </tr>
                            <tr>
                                <th class="table-success  align-middle">付款狀態</th>
                            <td>
                                <span v-if="!order.is_paid">尚未付款</span>
                                <span v-else class="text-success font-weight-bold">付款完成</span>
                            </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <button class="btn btn-becare btn-block btn-lg font-weight-bold text-main" v-if="order.is_paid === false" :disabled="status.loadIcon">
                    <i class="fas fa-spinner fa-spin mr-1" v-if="status.loadIcon"></i>
                    <i class="fas fa-clipboard-check mr-1" v-else></i>確認付款
                </button>
                <router-link to="/admin/shopping-demo" class="btn btn-main btn-block btn-lg font-weight-bold" v-else>
                    <i class="fas fa-reply mr-1"></i>繼續逛逛？</router-link>
            </form>
        </div>
    </div>
</template>


<script>
import shopCartTable from '@/components/shopCartTable';
export default {
  components: {
    shopCartTable,
  },
  data() {
    return {
        orderId:'',
        isLoading: false,
        order:{
            user:{},
        },
        status:{
            loadIcon:false,
        }
    }
  },
  methods: {
      getOrder(){
        const vm = this;
        const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order/${vm.orderId}`;  
        vm.isLoading = true;
        this.$http.get(api).then(response => {
            if (response.data.success && response.data.order) {
                vm.order = response.data.order;
                vm.isLoading = false;
            } else{
                vm.isLoading = false;
                vm.$bus.$emit('message:push', '糟糕...沒有這筆訂單喔！', 'danger');
                vm.$router.push(`/admin/shopping-demo`);
            }
        })
      },
      payOrder(){
        const vm = this;
        const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/pay/${vm.orderId}`;  
        vm.status.loadIcon = true;
        this.$http.post(api).then(response => {
            if (response.data.success) {
                if (response.data.success){
                    vm.$bus.$emit('message:push', response.data.message, 'success');
                    vm.getOrder();
                } else {
                    vm.$bus.$emit('message:push', '付款失敗 :( ', 'danger');
                }
                vm.status.loadIcon = true;
            } 
        })
      },
  },
  created(){
      // path: 'orderCheckout/:orderID',
      this.orderId = this.$route.params.orderID;
      this.getOrder();
  }
}
</script>