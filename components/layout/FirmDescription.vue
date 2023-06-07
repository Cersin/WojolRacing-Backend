<template>
  <div class="firmDescription">
    Jesteśmy ligą oraz zespołem esportowym. Wojol Racing to nie tylko simracing. Wojol Racing to grupa miłośników motosportu, dobrej zabawy i zdrowej rywalizacji.
  </div>
</template>

<script>
export default {
  name: "FirmDescription"
}
</script>

<style scoped lang="scss">
.firmDescription {
  font-size: 1.5rem;

  @include big-desktop() {
    font-size: 2rem;
  }

  @include mobileAndUp {
    max-width: 100%;
  }

  @include desktop {
    max-width: 75%;
  }
}

p {
  margin-top: 2rem;
  font-weight: bold;
}
</style>
