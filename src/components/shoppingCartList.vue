<template>
    <table class="table table-hover">
        <slot name="tableHead">
            <thead class="table-becare">
                <tr class="text-nowrap">
                    <th width="30" class="p-1"></th>
                    <th>品名</th>
                    <th width="80" class="d-none d-md-table-cell">數量</th>
                    <th width="100">單價</th>
                </tr>
            </thead>
        </slot>
        <slot name="tableBody">
            <tbody>
                <tr v-for="item in tableData.carts" :key="item.id">
                    <td class="align-middle">
                        <button type="button" class="btn btn-outline-danger btn-sm border-0" @click="doit(item.id,item.product.title)" :disabled="loadingItem != ''">
                            <i class="fas fa-spinner fa-spin" v-if="loadingItem === item.id"></i>
                            <i class="far fa-trash-alt" v-else></i>
                        </button>
                    </td>
                    <td class="align-middle">
                        <p class="mb-0">
                            <span class="badge d-none d-md-inline-block" :class="categoryClassName(item.product.category)">{{item.product.category}}</span>
                            <span>{{item.product.title}}</span>
                            <span class="text-right d-md-none">{{item.qty}} {{item.product.unit}}</span> 
                        </p> 
                        <div class="text-success" v-if="item.coupon">     
                            <small>已套用{{item.coupon.title}}</small>          
                        </div>
                    </td>
                    <td class="align-middle text-nowrap d-none d-md-table-cell">{{item.qty}} {{item.product.unit}}</td>
                    <td class="align-middle text-right text-nowrap" v-if="item.total !== item.final_total">
                        <div class="text-dontcare">
                            <em><del>{{item.total | currency}}</del></em>
                        </div>            
                        <div>{{item.final_total | currency}}</div>
                    </td>
                    <td class="align-middle text-right text-nowrap" v-else>{{item.final_total | currency}}</td>
                    </tr>
            </tbody>
        </slot>
        <slot name="tableFooter">
            <tfoot>
                <tr class="text-right" v-if="tableData.final_total == tableData.total">
                    <td></td>
                    <td class="d-none d-md-table-cell"></td>
                    <td class="align-middle">總計</td>
                    <td class="align-middle">{{ tableData.total | currency}}</td>
                </tr>
                <tr class="text-right text-dontcare" v-else>
                    <td></td>
                    <td class="d-none d-md-table-cell"></td>
                    <td class="align-middle"><em>總計</em></td>
                    <td class="align-middle"><em><del>{{ tableData.total | currency}}</del></em></td>
                </tr>
                <tr class="text-right text-danger" v-if="tableData.final_total !== tableData.total ">
                    <td></td>
                    <td class="d-none d-md-table-cell"></td>
                    <td class="align-middle font-weight-bold">折扣價</td>
                    <td class="align-middle font-weight-bold">{{ tableData.final_total | currency}}</td>
                </tr>
            </tfoot>
        </slot>

    </table>
</template>


<script>
export default {
  name: 'shoppingCartList',
  props: {
    tableData: {
        type: Object,
        // 物件或陣列預設值必須從工厂函数获取
        default: function () {
            return {}
        }
    },
    loadingItem:{
        type: String,
        default: '',
    },
  },
  methods: {
        doit(id,tile){
            this.$emit('doit',id,tile);
        },
        categoryClassName(category){
            let className = '';
            switch (category) {
                case 'Switch':
                    return className = 'badge-danger';
                    break;     
                case '3DS':
                    return className = 'badge-main';
                    break;
                case 'PS4':
                    return className = 'badge-dark';
                    break;
            }
        }
    },
}
</script>