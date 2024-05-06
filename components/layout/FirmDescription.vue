<template>
  <div class="firmDescription">
    Organizacja tworząca lige F1, AC oraz zespół esportowy.
    Grupa miłośników motosportu, dobrej zabawy i zdrowej rywalizacji.  </div>
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
