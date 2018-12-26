# CrossGate 商店
![default](https://user-images.githubusercontent.com/41603487/50428050-a54c7200-08ee-11e9-8ac1-047a93fe2544.JPG)
# Demo
https://pvt5r486.github.io/CrossGate/dist/#/index
# 聲明
本作品內所有圖片、文字內容，單純為個人前端練習用，不做任何商業用途
# 功能模塊
本作品其主要功能有：
* 前台:商品展示、購物車清單、商品下單、優惠券套用、訂單列表、訂單結帳
* 後台:商品管理、客戶訂單管理、優惠券管理
# 練習技術
* Vue Cli 2.0
* Vue Router
* Vue Component
* 第三方 Vue 套件的運用
  * [vue-loading-overlay](https://github.com/ankurk91/vue-loading-overlay)
  * [vue-awesome-swiper](https://github.com/surmon-china/vue-awesome-swiper)
  * [VeeValidate](https://baianat.github.io/vee-validate/)
  * [vue-axios](https://www.npmjs.com/package/vue-axios)
* Webpack 概念
* API的應用
* Bootstrap 4 + 手刻 SCSS 的混合應用
>> 預計而尚未運用的技術 Vuex、Vue Cli 3.0
# 前台內容介紹
## loading
全站皆使用的 loading 過場<br>
![loading](https://user-images.githubusercontent.com/41603487/50428324-b21e9500-08f1-11e9-896b-29b9d2525ac9.gif)
## 快速商品展示列
結合 vue-awesome-swiper 包裝而成的元件，除原本swiper的功能外，可藉由傳入的 Props 切換不同的產品類別、商品名稱來提升靈活度<br>
![default](https://user-images.githubusercontent.com/41603487/50428800-37577900-08f5-11e9-8067-45cc3ea63dae.JPG)
## 購物專區
重複使用「快速商品展示列」內的部分元件重新排版並實作商品搜尋、類別篩選、商品分頁功能，並於行動裝置時切換至快速商品展示列，避免頁面過長影響瀏覽體驗。
![default](https://user-images.githubusercontent.com/41603487/50428884-d8deca80-08f5-11e9-9de1-525b9c2ec4d4.JPG)
## 商品介紹
商品詳細介紹，選擇數量後即時顯示加總結果，方便使用者評估金額並加入購物車，提升使用體驗
![default](https://user-images.githubusercontent.com/41603487/50429180-c1084600-08f7-11e9-8d75-dee2d090566d.JPG)
## 購物車 & 訂單資料填寫 
主要分為兩個部分，左方為購物車內容，右方為整個購物車商品的加總，並可套用優惠券。<br>
表單部分具有驗證功能，並於畫面上方放置步驟導引，提升操作體驗。
![default](https://user-images.githubusercontent.com/41603487/50429476-ac2cb200-08f9-11e9-9160-6d6b9a2fa343.JPG)
![default](https://user-images.githubusercontent.com/41603487/50429564-3d9c2400-08fa-11e9-85cb-a028b2009caf.JPG)
## 我的購物訂單
用於查看自身有哪些訂單並未結帳，可再次進行結帳。
![default](https://user-images.githubusercontent.com/41603487/50429736-1bef6c80-08fb-11e9-950a-7087a345974e.JPG)
## 付款 & 付款完成頁面
![default](https://user-images.githubusercontent.com/41603487/50429831-8a342f00-08fb-11e9-83d9-80f4eb20b9f8.JPG)
![default](https://user-images.githubusercontent.com/41603487/50429907-d0898e00-08fb-11e9-8e94-0a53f49763e0.JPG)
# 後台內容簡介
主要使用Bootstrap 4 快速搭建後台，管理前台所需資料內容。
![default](https://user-images.githubusercontent.com/41603487/50430077-e055a200-08fc-11e9-94f8-dcbf1b7f156c.JPG)
#感謝
* 六角學院的講師們
* 所有給予我幫助的朋友們

其實還有很多小細節沒有處理得很完善，實際下去做才知道，一個好的電商網站要照顧的細節實在是不勝枚舉，我要走的路還有很長呢(茶)
