<template>
    <div>
      <alertMessage></alertMessage>
      <navbarFront></navbarFront>
      <topSilder></topSilder>
      <div class="container p-3">
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
            <a href="">了解更多</a>
          </div>
          
        </div>
        <div class="host-img ps4 my-3">

        </div>
        <div class="host-img n3ds" >

        </div>
      </div>
      <footerSection></footerSection>
    </div>
</template>

<script>
import navbarFront from '@/components/navbarFront';
import alertMessage from '@/components/AlertMessage';
import topSilder from '@/components/topsilder';
import footerSection from '@/components/footer';
export default {
  components: {
    navbarFront,
    alertMessage,
    topSilder,
    footerSection,
  },
  data() {
    return {

    }
  },
  methods:{

  },
}
</script>


