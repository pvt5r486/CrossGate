<template>
    <div>
        <!-- 登入事件除了可以寫在按鈕上 也可以寫在form -->
        <form class="form-signin" @submit.prevent="signin">
            <!-- <form class="form-signin"> -->
            <h1 class="h3 mb-3 font-weight-normal">請先登入</h1>
            <label for="inputEmail" class="sr-only">Email address</label>
            <input type="email" id="inputEmail" class="form-control" v-model="user.username" placeholder="Email address" required autofocus>
            <label for="inputPassword" class="sr-only">Password</label>
            <input type="password" id="inputPassword" class="form-control" v-model="user.password" placeholder="Password" required>
            <div class="checkbox mb-3">
                <label>
                    <input type="checkbox" value="remember-me"> 記得我
                </label>
            </div>
            <!-- <button class="btn btn-lg btn-primary btn-block" type="submit" @click.prevent="signin">登入</button> -->
            <button class="btn btn-lg btn-primary btn-block" type="submit">登入</button>
            <p class="mt-5 mb-3 text-muted">&copy; 2018 CrossGate 寶貝商店</p>
        </form>
    </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    signin() {
      const api = `${process.env.APIPATH}/admin/signin`
      //這個API方法是使用POST
      const vm = this
      //this.$http.post(路徑,傳入參數)
      //console.log(vm.user)
      this.$http.post(api, vm.user).then(response => {
        //console.log(response.data);
        response.data.success ? vm.$router.push('/admin/products') : alert(`${response.data.message}，請確認您的帳號密碼。`)
      });
    }
  }
}
</script>

<style scoped>
html,
body {
  height: 100%;
}

body {
  display: -ms-flexbox;
  display: -webkit-box;
  display: flex;
  -ms-flex-align: center;
  -ms-flex-pack: center;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: 0 auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type='email'] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type='password'] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
