<template>
  <div id="aside" class="aside">
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
    //grid-area: aside;
    //color: black;
    //background-color: $color-primary;
  }
</style>
