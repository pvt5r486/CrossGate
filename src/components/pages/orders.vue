<template>
    <div>
        <loading :active.sync="isLoading">
            <img src="@/assets/img/loading.gif" alt="" width="200">
        </loading>
        <div class="table-responsive">
            <table class="table table-hover mt-4">
                <thead class="table-becare">
                    <tr class="text-nowrap">
                        <th width="100">下單時間</th>
                        <th>購買人資訊</th>
                        <th>購買品項</th>
                        <th>備註</th>
                        <th width="100">總金額</th>
                        <th>是否付款</th>
                        <th width="80">操作</th>
                    </tr>
                </thead>
                <tbody class="bg-white">
                    <tr v-for="item in orders" :key="item.id">
                        <td>{{item.create_at | timeTamps}}</td>
                        <td>
                            <ul>
                                <li>訂購人：{{item.user.name}}</li>
                                <li>信箱：{{item.user.email}}</li>
                                <li>住址：{{item.user.address}}</li>
                                <li>電話：{{item.user.tel}}</li>
                            </ul>
                        </td>
                        <td>
                            <ul>
                                <li v-for="prod in item.products" :key="prod.id">
                                    {{prod.product_id}} * {{prod.qty}}
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
                                <li>{{item.payment_method}}</li>
                                <li>{{item.paid_date | timeTamps}}</li>
                            </ul>
                            <span v-else>未付款</span>
                        </td>
                        <td>
                            <button class="btn btn-outline-main btn-block" @click="openModal(item)">編輯</button>
                            <button class="btn btn-outline-secondary btn-block" v-if="orders.is_paid">刪除</button>
                            <button class="btn btn-outline-secondary btn-block" v-else disabled>刪除</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <pagination :page-data="pagination" class="d-flex justify-content-center"></pagination>
        
        <div class="modal fade" id="editOrderModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content border-0">
                    <div class="modal-header bg-main text-white">
                        <h5 class="modal-title" id="exampleModalLabel">
                            <span>編輯訂單</span>
                        </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true" class="text-white">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <!-- <div class="col-sm-4">
                                <div class="form-group">
                                    <label for="image">輸入圖片網址</label>
                                    <input type="text" class="form-control" id="image" v-model="tempProduct.imageUrl" placeholder="請輸入圖片連結">
                                </div>
                                <div class="form-group">
                                    <label for="customFile" class="upload-filed rounded" @dragenter="fileDragHover" @dragleave="fileDragHover">
                                        <i class="fas fa-cloud-upload-alt mr-1"></i>Click & Upload
                                        <i class="fas fa-spinner fa-spin" v-if="status.fileuploading"></i>
                                        <input type="file" id="customFile" class="form-control upload-contorl" ref="files" @change="uploadFile">
                                    </label>
                                </div>
                                <img class="img-fluid" alt="" :src="tempProduct.imageUrl">
                            </div> -->
                            <div class="col-sm-8">
                                <!-- <div class="form-group">
                                    <label for="title">標題</label>
                                    <input type="text" class="form-control" id="title" v-model="tempProduct.title" placeholder="請輸入標題">
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="category">分類</label>
                                        <input type="text" class="form-control" id="category" v-model="tempProduct.category" placeholder="請輸入分類">
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="price">單位</label>
                                        <input type="unit" class="form-control" id="unit" v-model="tempProduct.unit" placeholder="請輸入單位">
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="origin_price">原價</label>
                                        <input type="number" class="form-control" id="origin_price" v-model="tempProduct.origin_price" placeholder="請輸入原價">
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="price">售價</label>
                                        <input type="number" class="form-control" id="price" v-model="tempProduct.price" placeholder="請輸入售價">
                                    </div>
                                </div>
                                <hr>
                                <div class="form-group">
                                    <label for="description">產品描述</label>
                                    <textarea type="text" class="form-control" id="description" v-model="tempProduct.description" placeholder="請輸入產品描述"></textarea>
                                </div>
                                <div class="form-group">
                                    <label for="content">說明內容</label>
                                    <textarea type="text" class="form-control" id="content" v-model="tempProduct.content" placeholder="請輸入產品說明內容"></textarea>
                                </div>
                                <div class="form-group">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="is_enabled" v-model="tempProduct.is_enabled" :true-value="1" :false-value="0">
                                        <label class="form-check-label" for="is_enabled">
                                            是否啟用
                                        </label>
                                    </div>
                                </div> -->
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-secondary border-0" data-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-becare text-main">確認</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import $ from 'jquery';
export default {
  data() {
    return {
      orders: [
          {
              create_at:1523539834,
              id:'-L9u2EUkQSoEmW7QzGLF',
              is_paid:true,
              message:'這是留言',
              paid_date:1523539924,
              payment_method:'credit_card',
              products:[
                  {
                      id:'L8nBrq8Ym4ARI1Kog4t',
                      product_id:'-LQh15fjcZlw9ygdqJYT',
                      qty:'3',
                  },
                  {
                      id:'L8nBrq8Ym4ARI1Kog4W',
                      product_id:'-LQh15fjcZlw9ygdqJYT',
                      qty:'1',
                  },
              ],
              total:100,
              user:{
                  address:'高雄',
                  email:'test@gmail.com',
                  name:'王大明',
                  tel:'0912346768',
              },
              num:'1',
          }
      ],
      pagination: {
          total_pages:1,
          current_page:1,
          has_pre:false,
          has_next:false,
          category:null,
      },
      isLoading: false,
    }
  },
  methods: {
    openModal(item) {
      $('#editOrderModal').modal('show');
    },
    // getOreders() {
    //   const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/orders`;
    //   const vm = this
    //   vm.isLoading = true
    //   this.$http.get(api).then(response => {
    //     console.log('客戶API狀態', response.data);
    //     if (response.data.success) {
    //       vm.orders = response.data.products;
    //        console.log(response.data);
    //       vm.isLoading = false;
    //       vm.pagination = response.data.pagination
    //     } else {
    //       vm.$bus.$emit('message:push', response.data.message, 'danger');
    //       setTimeout(() => {
    //         vm.$router.push('/login');
    //       }, 5000)
    //     }
    //   })
    // },
  },
  created() {
    //this.getOreders();
  }
}
</script>