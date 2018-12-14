<template>
    <div>
      <alertMessage></alertMessage>
      <navbarFront></navbarFront>
      <router-view></router-view>
      <footerSection></footerSection>
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


