<template>
	<div>
		<loading :active.sync="isLoading">
				<img src="@/assets/img/loading.gif" alt="" width="200">
		</loading>
		<topSilder></topSilder>
		<div class="container py-3"  id="position">
			<ul class="daily_message">
					<li>2018.12.24</li>
					<li><span class="tag tag-danger">今日限定</span></li>
					<li >「coupon50」這…難道是什麼的密碼嗎？</li>
			</ul>
		</div>
		<div class="container py-3">
			<h1 class="page_title mb-3">購物專區</h1>
			<div class="row justify-content-end">
				<div class="col-md-8 col-lg-4">
					<div class="input-group mb-3">
						<input type="text" class="form-control border border-main text-main" placeholder="Search something..."
							v-model.trim="searchFilter" @input="searchProducts">
						<div class="input-group-append">
							<button class="btn btn-becare text-main border border-main border-left-0" type="button" @click="searchProducts">
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
							<a href="#" @click.prevent="changeTab('Switch')" :class="{'active':prodCategory==='Switch'}">
								<img class="img-fluid" src="@/assets/img/Nintendo_Switch_icon.png" alt="" width="50">
								<span>Switch 遊戲</span>
							</a>
						</li>
						<li>
							<a href="#" @click.prevent="changeTab('PS4')" :class="{'active':prodCategory==='PS4'}">
								<img class="img-fluid" src="@/assets/img/ps4_icon.png" alt="" width="50">
								<span>PS4 遊戲</span>
							</a>
						</li>
						<li>
							<a href="#" @click.prevent="changeTab('3DS')" :class="{'active':prodCategory==='3DS'}" >
								<img class="img-fluid" src="@/assets/img/n3ds_icon.png" alt="" width="50">
								<span>N3DS 遊戲</span>
							</a>
						</li>
					</ul>
				</div>
				<div class="col-md-8 col-lg-10 d-none d-sm-block">
					<div v-if="(searchFilter || searchResult.length) && searchResult.length == 0" class="alert alert-warning h-100 d-flex justify-content-center align-items-center">
						Sorry,依您的關鍵字「{{searchFilter}}」搜尋不到產品呢...
					</div>
					<template v-else>
						<div class="row">
							<div class="col-sm-6 col-md-6 col-lg-4 mb-3" v-for="item in filterPager" :key="item.id">
								<prodCard :card-data="item" :status="status" @returnProdID="addtoCart"></prodCard>
							</div>
						</div>
						<pagination :page-data="pagination" @changepage="getPage" class="d-flex justify-content-center" v-if="pagination.total_pages"></pagination>
					</template>
				</div>
				<div class="col d-sm-none">
					<div v-if="(searchFilter || searchResult.length) && searchResult.length == 0" class="alert alert-warning">
						Sorry,依您的關鍵字「{{searchFilter}}」搜尋不到產品呢...
					</div>
					<prodSilder :prod-category="prodCategory" :search-result="searchResult" :search-filter="searchFilter" v-else></prodSilder>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import $ from 'jquery';
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
      searchFilter:'',
      searchResult:[],
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
    getPage(page=1){
			const vm = this;
			$('html, body').scrollTop($('#position').offset().top);
			vm.pagination.current_page = page;      
    },
    searchProducts(){
			const vm = this;
			// 重製&清除狀態
			vm.pagination.current_page = 1;
			vm.prodCategory='';
			if (vm.searchFilter){
				vm.searchResult = vm.products.filter((item) =>{ return item.title.match(vm.searchFilter)})
			}else{
				// 清除搜尋結果
				vm.searchResult = [];
			}
    },
    changeTab(prodCategory){
			const vm = this;
			vm.prodCategory = prodCategory;
			vm.pagination.current_page=1;
			vm.searchFilter = '';
			vm.searchResult = [];
    }
  },
  created(){
    const vm = this;
    vm.getProducts();
  },
  computed: {
    filterData(){
      const vm = this;
      if (vm.searchFilter || vm.searchResult.length){
        return vm.searchResult
      }else{
        return vm.products.filter((item) =>{
          return vm.prodCategory === '' ? item : item.category === vm.prodCategory 
        })
      }
    },
    filterPager(){
			const vm = this;
			let dataSize = vm.filterData.length;
			const pageSize = vm.pagination.page_Size;
			vm.pagination.total_pages = Math.ceil(dataSize / pageSize);
			let nowPage = vm.pagination.current_page;
			// 上一頁與下一頁邏輯
			nowPage > 1 ? vm.pagination.has_pre = true :  vm.pagination.has_pre = false;
			nowPage < vm.pagination.total_pages && (vm.pagination.has_next = true);
			(nowPage + 1) > vm.pagination.total_pages && (vm.pagination.has_next = false);
			return vm.filterData.filter((item,index) =>{
				// 資料區間
				return index < (nowPage * pageSize) && index >= (nowPage - 1) * pageSize
			});
    }
  },
}

</script>


