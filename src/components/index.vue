<template>
    <div>
      <alertMessage></alertMessage>
      <navbarFront></navbarFront>
      <topSilder class="mb-3"></topSilder>

      <footerSection></footerSection>
    </div>
</template>



<script>
import navbarFront from './navbarFront';
import alertMessage from './AlertMessage';
import footerSection from './footer';
import topSilder from './topsilder';
export default {
  components: {
    navbarFront,
    alertMessage,
    footerSection,
    topSilder,
  }
}
</script>


