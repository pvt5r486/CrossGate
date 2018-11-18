<template>
    <!-- 
        1.版型拆解，將重複性高的東西拆出去當元件
        2.載入那些元件
     -->
    <div class="back-background">
        <navbar class="sticky-top"></navbar>
        <alertMessage></alertMessage>
        <div class="container-fluid">
            <div class="row">
                <main role="main" class="col-md-9 col-lg-10 px-4 mx-auto fixheight">
                    <router-view></router-view>
                </main>      
            </div>
        </div>
    </div>
</template>



<script>
import navbar from './navbar';
import alertMessage from './AlertMessage';
export default {
  components: {
    navbar,
    alertMessage,
  }
}
</script>


