<template>
    <div>
        <loading :active.sync="isLoading">
            <img src="@/assets/img/loading.gif" alt="" width="200">
        </loading>
        <div class="mt-3 d-flex">
            <button class="btn btn-outline-success btn-sm d-flex align-items-center ml-auto" @click="openModal(true)">
                <i class="material-icons">add</i>建立優惠券
            </button>
        </div>
        <div class="table-responsive">
            <table class="table table-hover mt-3">
                <thead class="table-becare">
                    <tr class="text-nowrap">
                        <th>名稱</th>
                        <th>代碼</th>
                        <th width="100">折扣 % </th>
                        <th width="200">到期日</th>
                        <th width="100">是否啟用</th>
                        <th width="150">操作</th>
                    </tr>
                </thead>
                <tbody class="bg-white">
                    <tr v-for="item in coupons" :key="item.id">
                        <td>{{item.title}}</td>
                        <td>{{item.code}}</td>
                        <td>{{item.percent}}</td>
                        <td>{{item.due_date | timeTamps}}</td>
                        <td>
                            <span class="text-success font-weight-bold" v-if="item.is_enabled">啟用</span>
                            <span v-else>未啟用</span>
                        </td>
                        <td>
                            <button class="btn btn-outline-main btn-sm mb-2 mb-md-0" @click="openModal(false,item)">編輯</button>
                            <button class="btn btn-outline-secondary btn-sm mb-2 mb-md-0" @click="deleteModal(item)">刪除</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <pagination :page-data="pagination" @changepage="getCoupons" class="d-flex justify-content-center"></pagination>
        <!-- Modal -->
        <div class="modal fade" id="couponModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content border-0">
                    <div class="modal-header bg-main text-white">
                        <h5 class="modal-title" id="exampleModalLabel">
                            <span>新增優惠券</span>
                        </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label for="couponName">優惠券名稱</label>
                                    <input type="text" class="form-control" id="couponName" aria-describedby="emailHelp" placeholder="請輸入優惠券名稱" 
                                        v-model="tempCoupon.title" autofocus required>
                                </div>
                                <div class="form-group">
                                    <label for="couponCode">優惠代碼</label>
                                    <input type="text" class="form-control" id="couponCode" placeholder="請輸入優惠代碼" 
                                        v-model="tempCoupon.code" required>
                                </div>
                                <div class="form-group">
                                    <label for="dueDate">到期日</label>
                                    <input type="date" class="form-control" id="dueDate" 
                                        v-model="tempCoupon.due_date" required>
                                </div>
                                <div class="form-group">
                                    <label for="percent">折扣百分比</label>
                                    <input type="tel" class="form-control" id="percent" placeholder="請輸入折扣百分比"
                                        v-model="tempCoupon.percent" required>
                                </div>
                                <div class="form-check">
                                    <input type="checkbox" class="form-check-input" id="isEnabled"  v-model="tempCoupon.is_enabled" :true-value="1" :false-value="0">
                                    <label class="form-check-label" for="isEnabled">是否啟用</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button"  class="btn btn-outline-secondary border-0" data-dismiss="modal">取消</button>
                        <button type="button"  class="btn btn-becare text-main" @click="updateCoupons">確認</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="delCouponModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content border-0">
                    <div class="modal-header bg-danger text-white">
                        <h5 class="modal-title" id="exampleModalLabel">
                            <span>刪除優惠券</span>
                        </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        是否刪除 <strong class="text-danger">{{ tempCoupon.title }}</strong> 優惠券(刪除後將無法恢復)。
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-outline-secondary border-0" @click="delCoupon">確認刪除</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
//使用JQuery
import $ from 'jquery';
export default {
  data() {
    return {
      coupons: [],
      pagination: {},
      tempCoupon: {},
      isNew: false,
      isLoading: false,
    }
  },
  methods: {
    getCoupons(page = 1) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupons?page=${page}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        if (response.data.success) {
          vm.coupons = response.data.coupons;
          console.log(response.data);
          vm.isLoading = false;
          vm.pagination = response.data.pagination;
        } else {
          vm.$bus.$emit('message:push', response.data.message, 'danger');
          setTimeout(() => {
            vm.$router.push('/login');
          }, 3000);
        }
      })
    },
    openModal(isNew, item) {
      if (isNew) {
        this.tempCoupon = {};
        this.isNew = true;
      } else {
        this.tempCoupon = Object.assign({}, item);
        this.isNew = false;
        const date = new Date(Number(this.tempCoupon.due_date) * 1000);
        let Y = date.getFullYear() + '-';
        let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
        this.tempCoupon.due_date = Y + M + D;
      }
      $('#couponModal').modal('show');
    },
    deleteModal(item) {
      this.tempCoupon = Object.assign({}, item);
      $('#delCouponModal').modal('show');
    },
    updateCoupons() {
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon`;
      const vm = this;
      let httpMethod = 'post'
      if (!vm.isNew) {
        api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`;
        httpMethod = 'put'
      }
      //調整資料格式 使其 被API接受
      const updateCoupon = Object.assign({}, vm.tempCoupon);
      const couponDate = new Date(vm.tempCoupon.due_date);
      updateCoupon.due_date = Math.floor(couponDate / 1000);
      updateCoupon.percent = Number(vm.tempCoupon.percent);
      //console.log(updateCoupon);
      this.$http[httpMethod](api, { data: updateCoupon }).then(response => {
        if (response.data.success) {
          $('#couponModal').modal('hide')
          vm.getCoupons()
          vm.$bus.$emit('message:push', response.data.message, 'success')
        } else {
          $('#couponModal').modal('hide')
          vm.$bus.$emit('message:push', response.data.message, 'danger')
        }
      })
    },
    delCoupon() {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`;
      this.$http.delete(api).then(response => {
        if (response.data.success) {
          $('#delCouponModal').modal('hide');
          vm.$bus.$emit('message:push', response.data.message, 'success');
          vm.getCoupons();
        } else {
          $('#delCouponModal').modal('hide');
          vm.$bus.$emit('message:push', response.data.message, 'danger')
        }
      })
    },
  },
  created() {
    this.getCoupons();
  }
}
</script>