<template>
    <div>
        <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
            <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">Company name</a>
            <input class="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search">
            <ul class="navbar-nav px-3">
                <li class="nav-item text-nowrap">
                    <a class="nav-link" href="#" @click.prevent="signout">登出</a>
                </li>
            </ul>
        </nav>
    </div>
</template>


<script>
export default {
  name: 'navbar',
  data() {
    return {
    }
  },
  methods: {
    signout() {
      const api = `${process.env.APIPATH}/logout`;
      const vm = this;
      this.$http.post(api).then(response => {
        if (response.data.success) {
          vm.$router.push('/login');
        }
      });
    }
  },
  created() {
    // console.log('檢查登入狀態 -- nav');
    // const vm = this;
    // const api = `${process.env.APIPATH}/api/user/check`;
    // //現在的執行環境是在router下，並不是在Vue的元件內，所以無法使用this.$http.post
    // this.$http.post(api).then(response => {
    //   console.log(response.data.success);
    //   // response.data.success ? next() : next({ path: '/login' })
    //   if (!response.data.success){
    //     vm.$router.push('/login');
    //   }
    // });
  }
}
</script>