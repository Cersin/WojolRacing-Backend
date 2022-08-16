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
    color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $color-primary;
  }
</style>