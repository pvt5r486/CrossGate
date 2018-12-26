<template>
  <div>
    <topSilder></topSilder>
    <div class="container py-3">
      <h1 class="page_title mb-3">主機介紹</h1>
      <div class="host-img switch">
        <div class="host-info">
          <h3>Switch</h3>
          <p>
            任天堂Switch（日語：ニンテンドースイッチ，英語：Nintendo Switch）是日本任天堂公司出品的電子遊戲機，於2017年3月3日在日本、北美、歐洲和香港發售，
            同年12月1日在韓國和台灣發售。擁有可拆卸控制器和可分離式主機，遊戲載體使用了專用卡匣。主機處理器使用了NVIDIA客制的Tegra X1系統晶片，
            這是任天堂首次採用NVIDIA的系統晶片。[2]開發期中的主機於2015年3月17日以「NX」代號首次公布，
            在2016年10月20日首次於網路影片上公開正式名稱任天堂Switch和其造型。
          </p>
          <div class="text-right">
            <router-link to="/gamehost/switch">了解更多</router-link>
          </div>
        </div>       
      </div>
      <div class="host-img ps4 my-3">
        <div class="host-info">
          <h3>PlayStation 4</h3>
          <p>
            PlayStation 4（官方縮寫：PS4）是索尼互動娛樂推出的家用電子遊樂器，首發在2013年11月15日於北美開始販售。本機作為PlayStation 3的後續機型，
            於電子遊戲史中為第八世代機種。在新的應用和服務方面，索尼在智慧型手機和平板電腦上推出專屬應用程式「PlayStation App」，
            讓這些裝置成為第二螢幕以加強遊戲體驗。索尼也推出了雲端遊戲的串流服務「PlayStation Now」。
            此外，搭配的控制器上增加了「分享」按鈕，讓使用者易於將遊玩過程作直播或錄製等用途。
          </p>
          <div class="text-right">
            <router-link to="/gamehost/ps4">了解更多</router-link>
          </div>
        </div>  
      </div>
      <div class="host-img n3ds" >
        <div class="host-info">
          <h3>Nintendo 3DS</h3>
          <p>
            任天堂3DS（日語：ニンテンドー3DS，英語：Nintendo 3DS，簡稱「N3DS」或「3DS」），是任天堂於2011年推出的攜帶型遊戲機，
            是任天堂DS的後續機種。最大特點是利用了視差障壁技術，讓使用者不需配戴任何特殊眼鏡即可裸視感受到立體3D圖像效果。該平台向下相容任天堂DS和任天堂DSi的軟體。
          </p>
          <div class="text-right">
            <router-link to="/gamehost/n3ds">了解更多</router-link>
          </div>
        </div>  
      </div>
    </div>    
  </div>
</template>



<script>
import topSilder from '@/components/topsilder';
export default {
  components: {
    topSilder,
  },
}
</script>