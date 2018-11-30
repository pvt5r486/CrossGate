<template>
    <div class="modal fade" id="Modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content border-0">
                <slot name="modalHeader">
                    <div class="modal-header bg-danger text-white">
                        <h5 class="modal-title" id="exampleModalLabel">
                            <i class="fas fa-exclamation-triangle mr-1"></i>
                            <span>刪除警示</span>
                        </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true" class="text-white">&times;</span>
                        </button>
                    </div>
                </slot>
                <slot name="modalBody">
                    <div class="modal-body">
                        是否刪除 <strong class="text-danger">{{ modalData.title }}</strong> (刪除後將無法恢復)。
                    </div>
                </slot>
                <slot name="modalFooter">
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger border-0" data-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-outline-secondary border-0" @click="doit" :disabled="isloading">
                            <i class="fas fa-spinner fa-spin mr-1" v-if="isloading"></i>確認刪除
                        </button>
                    </div>
                </slot>
            </div>
        </div>
    </div>
</template>


<script>
export default {
  name: 'modal',
  props: {
    modalData: {
        type: Object,
        default:function(){
            return {}
        },
    },
    isloading:{
        type:Boolean,
        default:false
    },
  },
  methods: {
        doit(){
            this.$emit('doit');
        },
    },
}
</script>