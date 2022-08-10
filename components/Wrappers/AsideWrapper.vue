<template>
  <div class="aside">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "AsideWrapper"
}
</script>

<style scoped lang="scss">
  .aside {
    grid-area: aside;
    background-color: $color-primary;
  }
</style>