<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import navbarFront from '@/components/navbarFront';
import alertMessage from '@/components/AlertMessage';
import footerSection from '@/components/footer';

export default {
  components: {
    navbarFront,
    alertMessage,
    footerSection,
  },
}
</script>


