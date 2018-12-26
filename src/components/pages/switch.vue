<template>
  <div class="container py-3">
    <div class="row justify-content-center">
      <div class="col-md-10">
        <img src="@/assets/img/switch-2.jpg" alt="" class="img-fluid">
      </div>
    </div>
    <h2 class="page_title mt-4 mb-0">關於 Switch</h2>
    <p class="p-3 px-md-5 text-justify">
      任天堂Switch（日語：ニンテンドースイッチ，英語：Nintendo Switch）是日本任天堂公司出品的電子遊戲機，
      於2017年3月3日在日本、北美、歐洲和香港發售，同年12月1日在韓國和台灣發售。
      擁有可拆卸控制器和可分離式主機，遊戲載體使用了專用卡匣。
      主機處理器使用了NVIDIA客制的Tegra X1系統晶片，這是任天堂首次採用NVIDIA的系統晶片。
      開發期中的主機於2015年3月17日以「NX」代號首次公布，在2016年10月20日首次於網路影片上公開正式名稱任天堂Switch和其造型。
    </p>
    <div class="row justify-content-center">
      <div class="col-md-10">
        <img src="@/assets/img/switch-3.jpg" alt="" class="img-fluid">
      </div>
    </div>
    <h1 class="page_title my-4">買 Switch 的理由</h1>
    <div class="row justify-content-center">
      <div class="col-md-6">
        <ul class="buy-switch-reason">
          <li>
            <img class="img-fluid" src="@/assets/img/Mario.png" alt="" width="50">
            <span>陪伴你童年的瑪莉歐大叔</span>
          </li>
          <li>
            <img class="img-fluid" src="@/assets/img/eve.png" alt="" width="50">
            <span>全世界火紅的精靈寶可夢</span>
          </li>
          <li>
            <img class="img-fluid" src="@/assets/img/link.png" alt="" width="50">
            <span>耐玩性超高的「薩爾達」系列</span>
          </li>
        </ul>
      </div>
    </div>
    <h3 class="page_title my-4">相關遊戲特惠中</h3>
    <prodSilder prod-category="Switch"></prodSilder>
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


