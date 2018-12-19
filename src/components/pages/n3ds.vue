<template>
    <div class="container p-3">
      <div class="row justify-content-center">
        <div class="col-md-10">
          <img src="@/assets/img/N3DS-2.jpg" alt="" class="img-fluid">
        </div>
      </div>
      <h2 class="page_title mt-4 mb-0">關於 N3DS</h2>
      <p class="p-3 px-md-5 text-justify">
        任天堂3DS（日語：ニンテンドー3DS，英語：Nintendo 3DS，簡稱「N3DS」或「3DS」），是任天堂於2011年推出的攜帶型遊戲機，是任天堂DS的後續機種。
        最大特點是利用了視差障壁技術，讓使用者不需配戴任何特殊眼鏡即可裸視感受到立體3D圖像效果。該平台向下相容任天堂DS和任天堂DSi的軟體。
        目前任天堂3DS有五個衍生機型，分別是2012年7月發售的大屏幕版本任天堂3DS LL/XL；2013年10月在歐美發售的廉價型號任天堂2DS；
        2014年10月起在日本發售的新任天堂3DS與新任天堂3DS LL/XL；以及於2017年7月起發售的新任天堂2DS XL。
        2012年9月28日台灣以及香港地區同步發行繁體中文版的「Nintendo 3DS」以及「Nintendo 3DS XL」。
        2012年11月1日中國大陸地區由神遊科技發行的簡體中文版「iQue 3DS XL」主機正式公布，12月1日起陸續供貨發售。
      </p>
      <div class="row justify-content-center">
        <div class="col-md-10">
          <img src="@/assets/img/N3DS-3.png" alt="" class="img-fluid">
        </div>
      </div>
      <h1 class="page_title my-4">買 N3DS 的理由</h1>
      <div class="row justify-content-center">
        <div class="col-md-6">
          <ul class="buy-ps4-reason">
            <li>
              <img class="img-fluid" src="@/assets/img/fireballmouse.png" alt="" width="50">
              <span>成為寶可夢大師</span>
            </li>
            <li>
              <img class="img-fluid" src="@/assets/img/Spinda.png" alt="" width="50">
              <span>裸視 3D 讓你視力歸0</span>
            </li>
            <li>
              <img class="img-fluid" src="@/assets/img/watermouse.gif" alt="" width="50">
              <span><del>沒..沒事我就買個回憶(誤)</del></span>
            </li>
          </ul>
        </div>
      </div>
      <h3 class="page_title my-4">
        相關遊戲特惠中
      </h3>
      <prodSilder prod-category="3DS"></prodSilder>
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


