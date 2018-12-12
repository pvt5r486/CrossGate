<template>
<div>
    <div class="bg-main">
        <div class="container py-3">
            <div class="row justify-content-center">
                <div class="col-md-5 d-flex align-items-center justify-content-center justify-content-md-start mb-3 mb-md-0">
                    <img src="@/assets/img/firemouse.png" width="30" alt="">
                    <span class="subcribe-slogan">訂閱CrossGate</span>
                </div>
                <div class="col-md-5">
                    <div class="subcribe-form h-100">
                        <label for="subscription" class="subcribe-form-icon"><i class="fas fa-envelope"></i></label>
                        <input type="email" class="form-input w-100 h-100 text-main" :class="{'bg-warning': errors.has('email')}" name="email" id="useremail"
                            v-model="tempEmail" placeholder="ex@gmail.com" v-validate="'required|email'" >
                        <button class="btn btn-becare d-flex align-items-center" @click.prevent="subscription"><i class="fas fa-arrow-right"></i></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="bg-second">
        <div class="container py-3">
            <div class="row justify-content-center flex-column-reverse flex-md-row">
                <div class="col-md-6  d-flex align-items-md-end">
                    <div class="d-none d-md-block">
                        <img src="@/assets/img/yeedai.gif" alt="" class="img-fluid" width="150">
                    </div>
                    <div>
                        <ul class="socialLink">
                            <li><a href="https://github.com/pvt5r486/CrossGate"><i class="fab fa-github"></i></a></li>
                            <li><router-link to="/login"><i class="fas fa-chart-pie"></i></router-link></li>
                        </ul>
                        <ul class="authorInfo  shadow-sm">
                            <li>僅個人練習使用．不做商業用途</li>
                            <li>圖片版權屬於任天堂、SONY、大宇資訊所有</li>
                        </ul> 
                    </div>
                </div>
                <div class="col-md-6 text-md-right d-flex flex-column justify-content-between">
                    <div>
                        <img src="@/assets/img/crossgate-logo.png" alt="" height="60">
                    </div>
                    <ul class="companyInfo">
                        <li>07-1234-5678</li>
                        <li><a href="mailto:service@crossgate.com">service@crossgate.com</a></li>
                        <li>520 高雄市魔力區寶貝路173號</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>

</template>


<script>
import $ from 'jquery';
export default {
  name: 'footerSection',
  data() {
    return {
        tempEmail:'',
    }
  },
  methods: {
    subscription(){
        const vm = this;
        this.$validator.validate().then((result) => {
            if (result) {
                vm.$bus.$emit('message:push', `感謝 ${vm.tempEmail} 的訂閱 :D`, 'success');
                vm.tempEmail = '';
            }else{
                vm.$bus.$emit('message:push', `噢！Email欄位怪怪的哦`, 'danger');
                $('#useremail').focus();
            }
        });
    }
  },
}
</script>