<template>
  <div class="back-background">
    <loading :active.sync="isLoading">
      <img src="@/assets/img/loading.gif" alt="" width="200">
    </loading>
    <alertMessage></alertMessage>
    <div class="container d-flex flex-column justify-content-start justify-content-md-center">
      <div class="row no-gutters justify-content-center">
        <div class="col-md-4">
          <div class="text-center">
            <img src="@/assets/img/crossgate-logo.png" alt="CrossGate" class="img-fluid">
          </div>
          <div class="login-form-title"> 
            <h1>CrossGate 管理平台</h1>
          </div>
          <form @submit.prevent="signin">
            <div class="login-form-block">
              <div class="login-form mb-3">
                <label for="username" class="material-icons login-form-icon">
                  person
                </label>
                <input type="email" id="username" class="form-input w-100" placeholder="Email" v-model="user.username" required autofocus>
              </div>
              <div class="login-form mb-3">
                <label for="password" class="material-icons login-form-icon">
                  vpn_key
                </label>
                <input type="password" id="password" class="form-input w-100" placeholder="PassWord" v-model="user.password" required>
              </div>
              <div class="remember-block">
                <input type="checkbox" class="remember-checkbox" id="remenberme" v-model="user.isRemember">
                <label class="text-white mb-0" for="remenberme">記住我</label>
              </div>
            </div>
            <button class="login-btn" type="submit">登入</button>
          </form>
          <p class="pt-3 pb-3 text-muted text-center mb-0">&copy; 2018 CrossGate 遊戲商店</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import alertMessage from '@/components/AlertMessage';
import $ from 'jquery';
export default {
  name: 'Login',
  components: {
    alertMessage,
  },
  data() {
    return {
      user: {
        username: '',
        password: '',
        isRemember: false
      },
      isLoading:false,
    }
  },
  methods: {
    signin() {
      const api = `${process.env.APIPATH}/admin/signin`;
      //這個API方法是使用POST
      const vm = this;
      vm.isLoading = true;
      localStorage.setItem('isRemember', vm.user.isRemember);
      vm.user.isRemember ? localStorage.setItem('userAccount', vm.user.username) : localStorage.removeItem('userAccount')   
      //this.$http.post(路徑,傳入參數)
      console.log(vm.user)
      this.$http.post(api, vm.user).then(response => {
        //console.log(response.data);
        if (response.data.success) {
          vm.isLoading = false;
          vm.$router.push('/admin/products');
        } else {
          vm.isLoading = false;
          //alert(`${response.data.message}，請確認您的帳號密碼。`)
          vm.$bus.$emit('message:push', `${response.data.message}，請確認您的帳號密碼。`, 'danger');
        }
      });
    },
    rememberMe(){
      const userAccount = localStorage.getItem('userAccount') || '';
      const rememberMe = localStorage.getItem('isRemember') || false;
      const vm = this;
      //console.log(typeof(rememberMe) ,rememberMe )
      //typeof(rememberMe)
      if (rememberMe === 'true'){
        this.user.username = userAccount;
        this.user.isRemember = true;
      }
    },
    heightInit(){
      let vh = $(window).height();
      document.querySelector('.container').style.minHeight = vh + 'px';
    },
  },
  mounted(){
    const vm = this;
    vm.heightInit();
    vm.rememberMe();
  }
}
</script>


