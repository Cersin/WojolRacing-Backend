<template>
  <div class="firmTitle">
    <span>Wojol</span> Racing
  </div>
</template>

<script>
export default {
  name: "FirmTItle"
}
</script>

<style scoped lang="scss">
.firmTitle {
  font-weight: bold;
  font-size: 4rem;
  letter-spacing: 1px;
  text-transform: uppercase;

  @include big-desktop() {
    font-size: 7rem;
  }

  span {
    color: $color-primary;
  }
}

</style>