<template>
    <div>
        <loading :active.sync="isLoading">
            <img src="@/assets/img/loading.gif" alt="" width="200">
        </loading>
        <topSilder></topSilder>
        <div class="container py-3 px-0">
            <ul class="daily_message">
            <li>2018.12.24</li>
            <li><span class="tag tag-danger">今日限定</span></li>
            <li>「coupon50」這…難道是什麼的密碼嗎？</li>
            </ul>
        </div>
        <div class="container py-3">
            <h1 class="page_title mb-3">購物專區</h1>
            <div class="row justify-content-end">
                <div class="col-md-8 col-lg-4">
                    <div class="input-group mb-3">
                        <input type="text" class="form-control border border-main text-main" placeholder="Search something...">
                        <div class="input-group-append">
                            <button class="btn btn-becare text-main border border-main border-left-0" type="button">
                                <i class="fas fa-search"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-4 col-lg-2">
                    <ul class="category_Menu">
                        <li>
                            <a href="#" @click.prevent="prodCategory='Switch'" :class="{'active':prodCategory==='Switch'}">
                                <img class="img-fluid" src="@/assets/img/Nintendo_Switch_icon.png" alt="" width="50">
                                <span>Switch 專區</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" @click.prevent="prodCategory='PS4'" :class="{'active':prodCategory==='PS4'}">
                                <img class="img-fluid" src="@/assets/img/ps4_icon.png" alt="" width="50">
                                <span>PS4 專區</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" @click.prevent="prodCategory='3DS'" :class="{'active':prodCategory==='3DS'}" >
                                <img class="img-fluid" src="@/assets/img/n3ds_icon.png" alt="" width="50">
                                <span>N3DS 專區</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="col-md-8 col-lg-10 d-none d-sm-block">
                    <div class="row">
                        <div class="col-sm-6 col-md-6 col-lg-4 mb-3" v-for="item in filterData" :key="item.id">
                            <prodCard :card-data="item" :status="status" @returnProdID="addtoCart"></prodCard>
                        </div>
                    </div>
                    <pagination :page-data="pagination" @changepage="getProducts" class="d-flex justify-content-center" v-if="pagination.total_pages"></pagination>
                </div>
                <div class="col d-sm-none">
                    <prodSilder :prod-category="prodCategory"></prodSilder>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import topSilder from '@/components/topsilder';
import prodCard from '@/components/prodcard';
import prodSilder from '@/components/prodsilder';
export default {
  components: {
    topSilder,
    prodCard,
    prodSilder
  },
  data() {
    return {
      products: [],
      pagination: {
        page_Size:6,
        total_pages: 1,
        current_page: 1,
        has_pre: false,
        has_next: false, 
      },
      status:{
        loadingItem:'',
        loadingIcon:false
      },
      isLoading: false,
      prodCategory:'',
    }
  },
  methods:{
    getProducts() {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        if (response.data.success) {
          vm.products = response.data.products;
          vm.isLoading = false;
        }
      })
    },
    addtoCart(id,qty = 1){
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      const vm = this;
      vm.status.loadingItem = id;
      const sw = document.querySelector('.swiper-container');
      sw.swiper.autoplay.stop();
      const cart = {
        product_id:id,
        qty,
      }
      this.$http.post(api,{data: cart}).then(response => {
        if (response.data.success) {
          vm.$bus.$emit('shopCart:update');
          vm.status.loadingItem='';
          sw.swiper.autoplay.start();
          vm.$bus.$emit('message:push', `【${response.data.data.product.title}】
            ${response.data.data.qty} ${response.data.data.product.unit} 
            ${response.data.message}`, 'success');
        }
      })
    },
  },

  created(){
    const vm = this;
    vm.getProducts();
  },
  computed: {
    filterData(){
      const vm = this;
      let filterItem;
      filterItem = vm.products.filter((item) =>{
        if (vm.prodCategory === ''){
          return item
        }else{
          return item.category === vm.prodCategory
        }
      })
      //console.log(filterItem.length);
      let itemLength = filterItem.length;
      


      return filterItem;
    }
  },
}

</script>


