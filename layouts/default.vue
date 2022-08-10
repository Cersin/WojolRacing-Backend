<template>
  <div class="layout">
    <MainHeader/>
    <slot></slot>
  </div>

</template>

<script setup>

import MainHeader from "../components/layout/MainHeader";
</script>

<style scoped lang="scss">
.layout {
  display: grid;
  min-height: 100vh;
  grid-template-areas:
                      "head"
                      "main"
                      "aside";
  grid-template-rows: 100px auto auto;


  @include tabletAndUp {
    grid-template-areas:
                      "head aside"
                      "main aside";
    grid-template-columns: .65fr .35fr;
    grid-template-rows: 100px 1fr;
  }
}

</style>
