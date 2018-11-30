<template>
    <div>
        <navbarBack></navbarBack>
        <alertMessage></alertMessage>
        <div class="container-fluid back-background">
            <div class="row">
                <main role="main" class="col-md-9 col-lg-10 px-4 mx-auto fixheight">
                    <router-view></router-view>
                </main>      
            </div>
        </div>
    </div>
</template>



<script>
import navbarBack from './navbarBack';
import alertMessage from './AlertMessage';
export default {
  components: {
    navbarBack,
    alertMessage,
  }
}
</script>


