<template>
    <div>
        <loading :active.sync="isLoading">
            <img src="@/assets/img/loading.gif" alt="" width="200">
        </loading>
        <div class="mt-3 d-flex">
            <button class="btn btn-outline-success btn-sm d-flex align-items-center ml-auto" @click="openModal(true)">
                <i class="material-icons">add</i>建立新的產品
            </button>
        </div>
        <div class="table-responsive">
            <table class="table table-hover mt-3">
                <thead class="table-becare">
                    <tr class="text-nowrap">
                        <th width="100">分類</th>
                        <th>產品名稱</th>
                        <th width="80">原價</th>
                        <th width="80">售價</th>
                        <th width="100">是否啟用</th>
                        <th width="150">操作</th>
                    </tr>
                </thead>
                <tbody class="bg-white">
                    <tr v-for="item in products" :key="item.id">
                        <td>
                            <span class="badge" 
                                :class="{'badge-danger': item.category ==='Switch',
                                'badge-main': item.category ==='3DS',
                                'badge-dark': item.category ==='PS4',}">{{item.category}}
                            </span>                
                        </td>
                        <td>{{item.title}}</td>
                        <td class="text-right" v-if="item.origin_price">{{item.origin_price | currency}}</td>
                        <td class="text-right" v-else>未設定</td>
                        <td class="text-right" v-if="item.price">{{item.price | currency}}</td>
                        <td class="text-right" v-else>未設定</td>
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
        <pagination :page-data="pagination" @changepage="getProducts" class="d-flex justify-content-center"></pagination>
        <!-- Modal -->
        <div class="modal fade" id="productModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content border-0">
                    <div class="modal-header bg-main text-white">
                        <h5 class="modal-title" id="exampleModalLabel">
                            <span>新增產品</span>
                        </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true" class="text-white">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-sm-4">
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
                            </div>
                            <div class="col-sm-8">
                                <div class="form-group">
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
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-secondary border-0" data-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-becare text-main" @click="updateProduct">確認</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="delProductModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content border-0">
                    <div class="modal-header bg-danger text-white">
                        <h5 class="modal-title" id="exampleModalLabel">
                            <span>刪除產品</span>
                        </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true" class="text-white">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        是否刪除 <strong class="text-danger">{{ tempProduct.title }}</strong> 商品(刪除後將無法恢復)。
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-outline-secondary border-0" @click="delProduct">確認刪除</button>
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
      products: [],
      pagination: {},
      tempProduct: {},
      isNew: false,
      isLoading: false,
      status: {
        fileuploading: false
      }
    }
  },
  methods: {
    //es6 技巧 參數預設值, 這樣就不需要在每個有用getProducts()的地方都放參數
    getProducts(page = 1) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/products?page=${page}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        console.log('產品清單API狀態', response.data.success);
        if (response.data.success) {
          vm.products = response.data.products;
          console.log(response.data);
          vm.isLoading = false;
          vm.pagination = response.data.pagination;
        } else {
          vm.$bus.$emit('message:push', response.data.message, 'danger');
          setTimeout(() => {
            $('#productModal').modal('hide');
            $('#delProductModal').modal('hide');
            vm.$router.push('/login');
          }, 5000)
        }
      })
    },
    openModal(isNew, item) {
      if (isNew) {
        this.tempProduct = {};
        this.isNew = true;
      } else {
        //特別注意 因為物件是傳參考如果直接這樣寫會有問題
        //在此要使用展開
        //   this.tempProduct = {
        //       ...item
        //   };
        //或者使用 將item的值寫入空物件內 - ES6語法 用來避免有參考特性
        this.tempProduct = Object.assign({}, item);
        this.isNew = false;
      }
      $('#productModal').modal('show');
      $('#customFile').val('');
    },
    deleteModal(item) {
      //把值 放入 tempProduct
      // this.tempProduct = {
      //     ...item
      // };
      this.tempProduct = Object.assign({}, item);
      $('#delProductModal').modal('show');
    },
    updateProduct() {
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product`;
      const vm = this;
      let httpMethod = 'post';
      if (!vm.isNew) {
        api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
        httpMethod = 'put';
      }
      //調整資料格式 使其 被API接受
      //console.log({data: vm.tempProduct});
      this.$http[httpMethod](api, { data: vm.tempProduct }).then(response => {
        //vm.products = response.data.products;
        console.log('新增產品API狀態', response.data.success)
        if (response.data.success) {
          $('#productModal').modal('hide');
          vm.getProducts(vm.pagination.current_page);
          vm.$bus.$emit('message:push', response.data.message, 'success');
        } else {
          $('#productModal').modal('hide');
          vm.$bus.$emit('message:push', response.data.message, 'danger');
        }
      })
    },
    delProduct() {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
      this.$http.delete(api).then(response => {
        console.log('刪除產品API狀態', response.data.success);
        if (response.data.success) {
          $('#delProductModal').modal('hide');
          vm.$bus.$emit('message:push', response.data.message, 'success');
          //console.log('刪除成功');
          vm.getProducts();
        } else {
          $('#delProductModal').modal('hide')
          vm.$bus.$emit('message:push', response.data.message, 'danger');
        }
      })
    },
    uploadFile() {
      //console.log(this)
      if (this.$refs.files.files.length == '0') {return}
      const uploadedFile = this.$refs.files.files[0];
      const uploadfield = document.querySelector('.upload-filed');
      const vm = this;
      //使用FormData 方法
      const formData = new FormData();
      formData.append('file-to-upload', uploadedFile);
      vm.status.fileuploading = true;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/upload`;
      this.$http.post(url, formData, {
          headers: {
            //修改headers資訊
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(response => {
          //console.log('上傳API狀態', response.data.success)
          vm.status.fileuploading = false
          if (response.data.success) {
            //這樣寫的話，此時的圖片路徑並沒有雙向綁定 - 可觀察有無Getter . Setter
            // vm.tempProduct.imageUrl = response.data.imageUrl;
            // console.log(vm.tempProduct);
            //正確
            vm.$set(vm.tempProduct, 'imageUrl', response.data.imageUrl);
            uploadfield.className = "upload-filed";
          } else {
            uploadfield.className = "upload-filed";
            $('#productModal').modal('hide');
            vm.$bus.$emit('message:push', response.data.message, 'danger');
          }
        })
    },
    fileDragHover(e){
        const uploadfield = document.querySelector('.upload-filed');
        e.type == "dragenter" ? uploadfield.className = "upload-filed dragin" : uploadfield.className = "upload-filed";
    }
  },
  created() {
    this.getProducts();
  }
}
</script>