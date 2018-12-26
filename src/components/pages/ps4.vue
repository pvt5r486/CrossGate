<template>
  <div class="container py-3">
    <div class="row justify-content-center">
      <div class="col-md-10">
        <img src="@/assets/img/ps4-2.jpg" alt="" class="img-fluid">
      </div>
    </div>
    <h2 class="page_title mt-4 mb-0">關於 PS4</h2>
    <p class="p-3 px-md-5 text-justify">
      PlayStation 4（官方縮寫：PS4）是索尼互動娛樂推出的家用電子遊樂器，首發在2013年11月15日於北美開始販售。
      本機作為PlayStation 3的後續機型，於電子遊戲史中為第八世代機種。在新的應用和服務方面，
      索尼在智慧型手機和平板電腦上推出專屬應用程式「PlayStation App」，讓這些裝置成為第二螢幕以加強遊戲體驗。
      索尼也推出了雲端遊戲的串流服務「PlayStation Now」。此外，搭配的控制器上增加了「分享」按鈕，讓使用者易於將遊玩過程作直播或錄製等用途。
    </p>
    <div class="row justify-content-center">
      <div class="col-md-10">
        <img src="@/assets/img/ps4-3.jpg" alt="" class="img-fluid">
      </div>
    </div>
    <h1 class="page_title my-4">買 PS4 的理由</h1>
    <div class="row justify-content-center">
      <div class="col-md-6">
        <ul class="buy-ps4-reason">
          <li>
            <img class="img-fluid" src="@/assets/img/mhw-legiana.png" alt="" width="50">
            <span>成為高清獵人的一份子</span>
          </li>
          <li>
            <img class="img-fluid" src="@/assets/img/darksouls.png" alt="" width="50">
            <span>眾多大廠支持不怕沒遊戲</span>
          </li>
          <li>
            <img class="img-fluid" src="@/assets/img/ys8.png" alt="" width="50">
            <span><del>我索廚我驕傲(誤)</del></span>
          </li>
        </ul>
      </div>
    </div>
    <h3 class="page_title my-4">相關遊戲特惠中</h3>
    <prodSilder prod-category="PS4"></prodSilder>
    <h3 class="page_title my-4">想看更多？</h3>
    <div class="d-flex justify-content-center py-3">
      <router-link class="go_crossgate" to="/shopping" >前往 CrossGate <i class="fas fa-caret-right ml-1"></i></router-link>
    </div>
  </div>
</template>

<script>
import prodSilder from '@/components/prodsilder';
export default {
  components: {
    prodSilder,
  },
}
</script>


