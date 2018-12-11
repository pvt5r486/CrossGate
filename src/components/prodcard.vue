<template>
    <div class="prod_card">
        <a href="#" class="prod_img" :style="`background-image: url('${cardData.imageUrl}');`">
            <span class="categoryTag" :class="categoryClassName(cardData.category)">{{categoryClassName(cardData.category)}}</span>
        </a>
        <div class="prod_info">
            <h3>{{cardData.title}}</h3>
            <p>{{cardData.description}}</p>
        </div>
        <div class="prod_price">     
            <span>原價 {{cardData.origin_price | currency}}</span>
            <h4>售價 {{cardData.price | currency}}</h4>
        </div>
        <div class="prod_card_footer">
            <div class="row no-gutters">
                <div class="col-6">
                    <a href="#">詳細介紹</a>
                </div>
                <div class="col-6">
                    <a href="#">加入購物車</a>
                </div>
            </div>    
        </div>   
    </div>
</template>

<script>
export default {
  name: 'prodcard',
  props: {
      cardData:{
        type: Object,
        default:function(){
            return {}
        },
      }
  },
  methods: {
    categoryClassName(category){
        let className = '';
        switch (category) {
            case 'Switch':
                return className = 'SW'
                break;     
            case '3DS':
                return className = 'N3DS'
                break;
            case 'PS4':
                return className = 'PS4'
                break;
        }
    },
  }
}
</script>
